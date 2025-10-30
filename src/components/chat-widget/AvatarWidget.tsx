import Image from "next/image";

interface AvatarWidgetProps {
   size?: "sm" | "md";
   avatarImage: string;
   agentName: string;
}
export const AvatarWidget = ({
   size = "md",
   avatarImage,
   agentName,
}: AvatarWidgetProps) => {
   const sizeClass = size === "md" ? "w-10 h-10" : "w-6 h-6";
   return (
      <div
         className={`${sizeClass} rounded-full bg-white/30 flex items-center justify-center shrink-0 overflow-hidden`}
      >
         {avatarImage ? (
            <Image
               src={avatarImage}
               alt="Avatar"
               width={48}
               height={48}
               className="object-cover"
               unoptimized
            />
         ) : (
            <span className="text-xl font-bold text-white">
               {agentName.charAt(0).toUpperCase()}
            </span>
         )}
      </div>
   );
};
