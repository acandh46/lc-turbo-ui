"use client";

import { AgentConfigType } from "@/types/agent.types";
import { AvatarWidget } from "../AvatarWidget";
import { PreChatFormBubble } from "../PreChatFormBubble";
import { useMemo, useState } from "react";
import { WelcomeMessageCardPreview } from "../WelcomeMessageCardPreview";
import { RenderHtml } from "../RenderHtml";
import { AwayMessageBanner } from "./AwayMessageBanner";

interface ChatBodyProps {
   activeTab: string;
   agentConfig: AgentConfigType;
   agentName: string;
   isPreChatSubmitted: boolean;
   setIsPreChatSubmitted: (val: any) => void;
}

export function ChatBody({
   activeTab,
   agentConfig,
   agentName,
   isPreChatSubmitted,
   setIsPreChatSubmitted,
}: ChatBodyProps) {
   const [showNotice, setShowNotice] = useState(false);
   const sortedFields = useMemo(
      () =>
         Array.isArray(agentConfig.preChatFormField)
            ? [...agentConfig.preChatFormField].sort(
                 (a, b) => a.order - b.order
              )
            : [],
      [agentConfig.preChatFormField]
   );

   return (
      <div className="relative grow p-4 overflow-y-auto space-y-4 dark:bg-black">
         {showNotice && (
            <AwayMessageBanner message="We are currently away and will be back soon." />
         )}
         {activeTab === "welcome" && (
            <div className="flex items-start gap-2.5">
               <AvatarWidget
                  size="sm"
                  avatarImage={agentConfig.avatarImage}
                  agentName={agentName}
               />
               {agentConfig.welcomeMessageType === "card" &&
               agentConfig.welcomeMessageCard ? (
                  <WelcomeMessageCardPreview
                     buttonColor={agentConfig.themeColor}
                     card={agentConfig.welcomeMessageCard}
                  />
               ) : (
                  <div className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 bg-white dark:bg-gray-700 rounded-r-xl rounded-t-xl">
                     <RenderHtml
                        content={agentConfig.welcomeMessage}
                        className="text-sm font-normal text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm max-w-full"
                     />
                  </div>
               )}
            </div>
         )}
         {activeTab === "apperance" && (
            <>
               <div className="flex items-end gap-2.5 justify-end">
                  <div
                     style={{ backgroundColor: agentConfig.themeColor }}
                     className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 rounded-l-xl rounded-t-xl text-white"
                  >
                     <p className="text-sm font-normal">
                        Halo, saya mau tanya tentang produk Anda.
                     </p>
                  </div>
               </div>
               <div className="flex items-end gap-2.5">
                  <AvatarWidget
                     size="sm"
                     avatarImage={agentConfig.avatarImage}
                     agentName={agentName}
                  />
                  <div className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 bg-white dark:bg-gray-700 rounded-r-xl rounded-t-xl">
                     <p className="text-sm font-normal text-gray-800 dark:text-gray-200">
                        Tentu, silakan. Apa yang ingin Anda ketahui?
                     </p>
                  </div>
               </div>
            </>
         )}

         {activeTab === "pre-chat" &&
            agentConfig.preChatFormEnabled &&
            !isPreChatSubmitted && (
               <div className="flex items-start gap-2">
                  <AvatarWidget
                     size="sm"
                     avatarImage={agentConfig.avatarImage}
                     agentName={agentName}
                  />
                  <PreChatFormBubble
                     themeColor={agentConfig.themeColor}
                     preChatFormField={sortedFields}
                     bubbleStyle={{ backgroundColor: agentConfig.themeColor }}
                     actionButton={() => setIsPreChatSubmitted(true)}
                  />
               </div>
            )}
      </div>
   );
}
