"use client";
import { CannedResponseType } from "@/types/agent.types";
import { RenderHtml } from "../feature/RenderHtml";
import { Archive, Pencil, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import ActionButton from "../CustomUi/ActionButton";
import { useModalStore } from "@/store/useModalStore";

interface CannedResponseItemProps {
   canned: CannedResponseType;
   agentId: string;
   refetch: () => void;
}
export const CannedResponseItem = ({
   canned,
   agentId,
   refetch,
}: CannedResponseItemProps) => {
   const [showAction, setShowAction] = useState(false);
   const { onOpen } = useModalStore();
   return (
      <div
         className="bg-white w-full p-3 hover:bg-gray-200 cursor-pointer border shadow-xl rounded-xs"
         onMouseEnter={() => setShowAction(true)}
         onMouseLeave={() => setShowAction(false)}
      >
         <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between py-2">
               <div className="bg-white flex p-2 gap-1">
                  <span className="text-blue-600 font-semibold">#</span>
                  <span className="font-semibold">{canned.shortcut}</span>
                  {!canned.actived && (
                     <span className="ml-2 text-xs text-red-500 font-medium bg-red-100 px-2 py-0.5 rounded">
                        Inactive
                     </span>
                  )}
               </div>
               {showAction && (
                  <div className="flex gap-2 items-center">
                     <ActionButton
                        tooltip="Edit Response"
                        positionTooltip="top"
                        buttonClass="text-black text-xs cursor-pointer hover:bg-blue-500 hover:text-white"
                        icon={<Pencil />}
                        variant="ghost"
                        onClick={() => {
                           onOpen("cannedResponse", {
                              onSuccess: refetch,
                              agentId: agentId,
                              canned: canned,
                           });
                        }}
                     />
                     <ActionButton
                        tooltip="Remove Response"
                        positionTooltip="top"
                        buttonClass="text-black text-xs cursor-pointer hover:bg-red-500 hover:text-white"
                        icon={<Trash />}
                        onClick={() => {}}
                     />
                  </div>
               )}
            </div>

            <RenderHtml content={canned.content} />
            <div className="flex gap-1 items-center">
               <span className="font-semibold text-xs">
                  <Archive size={12} />
               </span>
               <p className="text-xs">
                  Added By {canned.createdBy}{" "}
                  {formatDate(canned.createdAt, false)}
               </p>
            </div>
            {/* showAction can be used to conditionally render actions here if needed */}
         </div>
      </div>
   );
};
