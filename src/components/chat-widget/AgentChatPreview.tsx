"use client";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChatButtonBubble } from "./widget/ChatBubble";
import { BannerDraggable } from "./widget/BannerDraggable";
import { ChatWindow } from "./widget/ChatWindow";

export const AgentChatPreview = () => {
   const { config, activeTab, updateAgentConfig } = useAgentConfigStore();
   const [isOpen, setIsOpen] = useState(true);
   const [isBannerVisible, setIsBannerVisible] = useState(true);
   const dragContainerRef = useRef<HTMLDivElement>(null);
   const [position, setPosition] = useState({
      x: config?.agentConfig.bannerPostionX || 0,
      y: config?.agentConfig.bannerPostionY || 0,
   });

   if (!config) {
      return (
         <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-gray-100 rounded-lg dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
               Waiting for configuration...
            </p>
         </div>
      );
   }

   const { agentName, agentConfig } = config;

   const bubbleButtonStyle: React.CSSProperties = {
      position: "absolute",
      ...(agentConfig.widgetPosition === "bottom_left"
         ? { left: "10px", bottom: "10px" }
         : { right: "10px", bottom: "10px" }),
   };

   return (
      <div
         ref={dragContainerRef}
         className="relative h-[720px] w-full justify-end flex ml-auto overflow-hidden p-1 bg-blue-400"
      >
         {isOpen && (
            <AnimatePresence>
               <ChatWindow
                  agentName={agentName}
                  agentConfig={agentConfig}
                  activeTab={activeTab}
                  onClose={() => setIsOpen(false)}
               />
            </AnimatePresence>
         )}

         {isBannerVisible &&
            !isOpen &&
            agentConfig.showBanner &&
            agentConfig.bannerImage && (
               <BannerDraggable
                  containerRef={dragContainerRef}
                  bannerImage={agentConfig.bannerImage}
                  offsetX={position.x}
                  offsetY={position.y}
                  anchor={agentConfig.widgetPosition}
                  updateAgentConfig={(position: any) => {
                     setPosition({
                        x: position.offsetX,
                        y: position.offsetY,
                     });
                     updateAgentConfig({
                        bannerPostionX: position.offsetX,
                        bannerPostionY: position.offsetY,
                     });
                  }}
                  onClose={() => setIsBannerVisible(false)}
               />
            )}
         <div
            className="relative h-full w-full max-w-[320px] flex-1 bg-transparent block"
            style={bubbleButtonStyle}
         >
            <AnimatePresence>
               {!isOpen && (
                  <motion.div style={bubbleButtonStyle}>
                     <ChatButtonBubble
                        type={agentConfig.widgetType}
                        themeColor={agentConfig.themeColor}
                        barButtonText={agentConfig.barButtonText}
                        avatarImage={agentConfig.avatarImage}
                        showAvatarButton={agentConfig.showAvatarButton}
                        onClick={() => setIsOpen(true)}
                     />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
};
