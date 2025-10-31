import { ChevronDown } from "lucide-react";
import { AvatarWidget } from "../AvatarWidget";

interface ChatHeaderProps {
   agentName: string;
   avatarImage: string;
   themeColor: string;
   onClose: () => void;
   theme: string;
}
export function ChatHeader({
   agentName,
   avatarImage,
   themeColor,
   theme,
   onClose,
}: ChatHeaderProps) {
   const headerStyle =
      theme === "dark"
         ? { backgroundColor: "black" }
         : { backgroundColor: themeColor };

   return (
      <div
         style={headerStyle}
         className="flex flex-col p-4 relative text-white"
      >
         <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white"
         >
            <ChevronDown size={20} />
         </button>
         <div className="flex items-center space-x-4">
            <AvatarWidget avatarImage={avatarImage} agentName={agentName} />
            <div>
               <h3 className="font-bold text-lg">{agentName}</h3>
               <p className="text-xs opacity-90">We reply immediately</p>
            </div>
         </div>
      </div>
   );
}
