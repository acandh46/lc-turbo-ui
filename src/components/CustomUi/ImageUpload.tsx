"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { toast } from "sonner";

type ImageUploadProps = {
   onUploadComplete: (url: string) => void;
   endpoint?: string; // API endpoint to handle the upload
   initialImage?: string | null;
   shape?: "circle" | "box";
   className?: string;
   isDisabled?: boolean;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
   onUploadComplete,
   endpoint,
   initialImage = null,
   shape = "box",
   className = "",
   isDisabled = false,
}) => {
   const [preview, setPreview] = useState<string | null>(initialImage);
   const [loading, setLoading] = useState<boolean>(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Set preview immediately for better UX
      const reader = new FileReader();
      reader.onloadend = () => {
         setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Start upload process
      // setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
         const response = await api.post("/media/upload", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         const result = await response.data;
         if (!result.status) {
            toast.error(result.msg, { position: "top-right" });
            setPreview(initialImage);
         } else {
            onUploadComplete(result.image.url);
            toast.success(result.msg, { position: "top-right" });
         }
      } catch (error) {
         toast.error(`Failed to Upload avatar: ${error}`, {
            position: "top-right",
         });
         setPreview(initialImage); // Revert preview on error
      } finally {
         setLoading(false);
      }
   };

   const handleClick = () => {
      if (!loading) {
         fileInputRef.current?.click();
      }
   };

   const containerClasses = cn(
      "relative border-2 border-dashed border-gray-300  flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors duration-200 bg-gray-50 dark:bg-gray-900 overflow-hidden",
      {
         "rounded-full w-30 h-30 md:w-30 md:h-30": shape === "circle",
         "rounded-md w-full h-48": shape === "box",
      },
      className
   );

   const imageClasses = cn("object-contain w-full h-full", {
      "rounded-full": shape === "circle",
      "rounded-md": shape === "box",
      "bg-gray-200": isDisabled, // Jika isDisabled true, ubah background jadi abu2
   });

   return (
      <div className={containerClasses} onClick={handleClick}>
         <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            disabled={loading || isDisabled}
         />

         {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md z-10">
               <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
         )}

         {preview ? (
            <img src={preview} alt="Image Preview" className={imageClasses} />
         ) : (
            <div className="text-center text-gray-500">
               <UploadCloud className="mx-auto h-10 w-10" />
               <p className="mt-2 text-sm">Click to upload</p>
               <p className="text-xs">PNG, JPG, GIF</p>
            </div>
         )}
      </div>
   );
};

export default ImageUpload;
