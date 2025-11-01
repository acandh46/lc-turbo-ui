import { randomColor } from "@/lib/utils";
import { RenderHtml } from "../feature/RenderHtml";

interface CustomerItemProps {
   id: string;
   name: string;
   lastMessage: string;
   unread?: number;
   timeCreated?: string;
   isTyping?: boolean;
   isSelected: boolean;
   isIdle?: boolean;
   onClick: () => void;
}

export const CustomerItem = ({
   name,
   id,
   isSelected,
   lastMessage,
   unread = 10,
   isTyping,
   timeCreated,
   isIdle = false,
   onClick,
}: CustomerItemProps) => {
   return (
      <div
         onClick={onClick}
         className={`flex flex-row items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-200 ${
            isSelected ? "bg-slate-200" : ""
         }`}
      >
         <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
            style={{ backgroundColor: randomColor() }}
         >
            {name.charAt(0).toUpperCase()}
         </div>
         <div className="w-full overflow-hidden">
            <div className="flex items-center justify-between">
               <p className="font-medium">{name}</p>
               <p className="text-xs text-slate-500 dark:text-slate-400">
                  {timeCreated ?? "7s"}
               </p>
            </div>
            <div className="flex items-center justify-between mt-0.5">
               <RenderHtml
                  content={lastMessage}
                  className="truncate text-sm text-slate-500 max-w-[320px] dark:text-slate-400"
               />
               {unread > 0 && (
                  <span className="ml-2 flex items-center justify-center text-[10px] font-bold bg-red-700 text-white rounded-full h-4 w-4  px-1">
                     {unread}
                  </span>
               )}
            </div>
         </div>
      </div>
   );
};
