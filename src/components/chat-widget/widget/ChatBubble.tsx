import { MessageSquare, MessageSquareMore } from "lucide-react";
import Image from "next/image";

interface ChatBubbleProps {
   type: string;
   themeColor: string;
   barButtonText?: string;
   avatarImage?: string;
   showAvatarButton?: boolean;
   onClick: () => void;
}

export const ChatButtonBubble = ({
   type,
   themeColor,
   barButtonText,
   avatarImage,
   showAvatarButton,
   onClick,
}: ChatBubbleProps) => {
   const bubbleStyle = { backgroundColor: themeColor };

   if (type === "BUTTON") {
      return (
         <button
            onClick={onClick}
            style={bubbleStyle}
            className="flex items-center gap-4 justify-between text-white rounded-t-md w-60 shadow-md p-3 transition-transform duration-200 group"
            // className="flex items-center gap-4 cursor-pointer justify-between text-white rounded-t-md w-60 shadow-xl p-3  transition-transform duration-200 group"
            aria-label="Open Chat"
         >
            <p className="text-md font-bold">
               {barButtonText ?? "Chat Sekarang"}
            </p>
            <span>
               <MessageSquare size={24} className="block group-hover:hidden" />
               <MessageSquareMore
                  size={24}
                  className="hidden group-hover:block"
               />
            </span>
         </button>
      );
   }

   return (
      <button
         onClick={onClick}
         style={bubbleStyle}
         className="flex items-center justify-center w-16 h-16 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-200 overflow-hidden"
      >
         {showAvatarButton && avatarImage ? (
            <Image
               alt="avatar"
               src={avatarImage}
               width={70}
               height={70}
               unoptimized
            />
         ) : (
            <MessageSquare size={33} className="font-bold" />
         )}
      </button>
   );
};
