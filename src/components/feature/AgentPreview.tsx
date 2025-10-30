"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { AnimatePresence, motion } from "framer-motion";
import {
   ChevronDown,
   MessageSquare,
   MessageSquareMore,
   Paperclip,
   Send,
   Smile,
   X,
} from "lucide-react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import DOMPurify from "dompurify";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { AgentPreChatFormFieldType } from "@/types/agent.types";
import { WelcomeMessageCardPreview } from "./WelcomeMessageCardPreview";

// Helper component to safely render HTML ONLY on the client side to prevent hydration mismatch
const RenderHTML = ({
   content,
   className,
   style,
}: {
   content: string;
   className?: string;
   style?: React.CSSProperties;
}) => {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      // This effect runs only on the client, after the initial render
      setIsClient(true);
   }, []);

   // Render nothing on the server and on the initial client render
   if (!isClient) {
      return null;
   }

   // Now, on the client, sanitize and render the HTML
   const sanitizedContent = DOMPurify.sanitize(content);
   return (
      <div
         className={className}
         style={style}
         dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
   );
};

export const AgentPreview = () => {
   const { config, activeTab } = useAgentConfigStore();
   const [isOpen, setIsOpen] = useState(false);
   const [isBannerVisible, setIsBannerVisible] = useState(true);
   const [isPreChatSubmitted, setIsPreChatSubmitted] = useState(false);
   const [isDragging, setIsDragging] = useState(false);
   const [bannerPosition, setBannerPosition] = useState({ x: 22, y: 0 });
   const dragContainerRef = useRef(null);
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const [message, setMessage] = useState("");

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto";
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }, [message]);

   useEffect(() => {
      if (activeTab === "apperance") {
         setIsOpen(false);
      } else {
         setIsOpen(true);
      }
   }, [activeTab]);

   useEffect(() => {
      if (!isOpen) {
         setIsPreChatSubmitted(false);
      }
   }, [isOpen]);

   useEffect(() => {
      setIsBannerVisible(true);
   }, [activeTab]);

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

   const {
      themeColor,
      welcomeMessage,
      barButtonText,
      avatarImage,
      messagePlaceholder,
      widgetPostion,
      preChatFormEnabled,
      preChatFormField,
      showAvatarButton,
   } = agentConfig;

   const positionClass = widgetPostion === "left" ? "left-4" : "right-4";
   const bubbleStyle = { backgroundColor: themeColor };
   const headerStyle = { backgroundColor: themeColor };

   const showMessageInput =
      !preChatFormEnabled ||
      isPreChatSubmitted ||
      activeTab === "welcome" ||
      activeTab === "apperance";

   const Avatar = ({ size = "md" }: { size?: "sm" | "md" }) => {
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

   const PreChatFormBubble = () => {
      const sortedFields = React.useMemo(
         () =>
            Array.isArray(preChatFormField)
               ? [...preChatFormField].sort((a, b) => a.order - b.order)
               : [],
         [preChatFormField]
      );

      const renderField = React.useCallback(
         (field: AgentPreChatFormFieldType) => {
            if (field.type === "HEADER") {
               return (
                  <RenderHTML
                     key={field.id}
                     content={field.label}
                     className="text-sm text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm prose-p:my-0 w-full wrapbreak-words"
                     style={{
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        maxWidth: "100%",
                     }}
                  />
               );
            }

            // Only render Input for supported types
            const isInputType = field.type === "EMAIL" || field.type === "TEXT";
            return (
               <div key={field.id} className="space-y-1 w-full">
                  <Label
                     htmlFor={field.id}
                     className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate gap-2"
                     style={{ maxWidth: "100%" }}
                  >
                     <span className="inline-block max-w-full truncate align-bottom">
                        {field.label} :
                     </span>
                     {field.required && (
                        <span className="text-red-500 ">*</span>
                     )}
                  </Label>
                  {isInputType && (
                     <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder || ""}
                        required={field.required}
                        className="bg-white h-8 text-sm dark:bg-gray-600 w-full"
                        style={{ maxWidth: "100%" }}
                     />
                  )}

                  {field.type == "RADIO" && (
                     <RadioGroup className="mt-3">
                        {field.options.map((item: any, idx: number) => (
                           <div key={idx} className="flex items-center gap-3">
                              <RadioGroupItem
                                 value={item}
                                 id="r1"
                                 className=" border-black border-2"
                              />
                              <Label
                                 htmlFor="r1"
                                 className="text-xs text-gray-800"
                              >
                                 {item}
                              </Label>
                           </div>
                        ))}
                     </RadioGroup>
                  )}

                  {field.type === "SELECT" && (
                     <select
                        id={field.id}
                        required={field.required}
                        className="bg-white h-8 text-sm dark:bg-gray-600 w-full border rounded px-2 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
                        style={{ maxWidth: "100%" }}
                        defaultValue=""
                     >
                        <option value="" disabled>
                           {field.placeholder || "-- Pilih --"}
                        </option>
                        {field.options.map((option: string, idx: number) => (
                           <option key={idx} value={option}>
                              {option}
                           </option>
                        ))}
                     </select>
                  )}
               </div>
            );
         },
         []
      );

      return (
         <div className="relative flex flex-col w-full max-w-xs p-4 bg-gray-100 rounded-t-xl rounded-br-xl space-y-3 dark:bg-gray-700 box-border overflow-hidden">
            <div className="flex flex-col gap-3 w-full">
               {sortedFields.map(renderField)}
            </div>
            <Button
               onClick={() => setIsPreChatSubmitted(true)}
               style={bubbleStyle}
               className="w-full h-9 text-white mt-2"
            >
               Mulai Obrolan
            </Button>
         </div>
      );
   };

   return (
      <div
         ref={dragContainerRef}
         className="relative w-full h-full overflow-hidden bg-slate-200/50 dark:bg-slate-800/50"
      >
         {isOpen && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`flex flex-col w-80 h-160 bg-gray-200/50 rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700/50 ${
                     agentConfig.theme === "dark" ? "dark" : ""
                  }`}
               >
                  <motion.div
                     style={headerStyle}
                     className="flex flex-col p-4 text-white relative"
                  >
                     <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 text-white/70 hover:text-white"
                     >
                        <ChevronDown size={20} />
                     </button>
                     <div className="flex items-center space-x-4">
                        <Avatar />
                        <div>
                           <h3 className="font-bold text-lg">{agentName}</h3>
                           <p className="text-xs opacity-90">
                              We reply immediately
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  <div className="grow p-4 overflow-y-auto space-y-4">
                     {/* Conditional Welcome Message */}
                     {activeTab !== "pre-chat" && (
                        <div className="flex items-end gap-2.5">
                           <div className="shrink-0">
                              <Avatar size="sm" />
                           </div>
                           {agentConfig.welcomeMessageType === "card" &&
                           agentConfig.welcomeMessageCard ? (
                              <WelcomeMessageCardPreview
                                 card={agentConfig.welcomeMessageCard}
                              />
                           ) : (
                              <div className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 bg-white dark:bg-gray-700 rounded-r-xl rounded-t-xl">
                                 <RenderHTML
                                    content={welcomeMessage}
                                    className="text-sm font-normal text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm max-w-full"
                                 />
                              </div>
                           )}
                        </div>
                     )}

                     {/* Static conversation example */}
                     {activeTab !== "pre-chat" && (
                        <>
                           <div className="flex items-end gap-2.5 justify-end">
                              <div
                                 style={{ backgroundColor: themeColor }}
                                 className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 rounded-l-xl rounded-t-xl text-white"
                              >
                                 <p className="text-sm font-normal">
                                    Halo, saya mau tanya tentang produk Anda.
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-end gap-2.5">
                              <div className="shrink-0">
                                 <Avatar size="sm" />
                              </div>
                              <div className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 bg-white dark:bg-gray-700 rounded-r-xl rounded-t-xl">
                                 <p className="text-sm font-normal text-gray-800 dark:text-gray-200">
                                    Tentu, silakan. Apa yang ingin Anda ketahui?
                                 </p>
                              </div>
                           </div>
                        </>
                     )}

                     {activeTab !== "welcome" &&
                        activeTab !== "apperance" &&
                        preChatFormEnabled &&
                        !isPreChatSubmitted && (
                           <div className="flex items-start gap-2">
                              <div className="shrink-0">
                                 <Avatar size="sm" />
                              </div>
                              <PreChatFormBubble />
                           </div>
                        )}
                  </div>

                  <div className=" border-t border-gray-200/80 bg-white p-1 dark:bg-gray-900 dark:border-gray-700/80">
                     {showMessageInput && (
                        <div className="relative flex items-end">
                           <button className="absolute left-3 bottom-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                              <Paperclip size={20} />
                           </button>
                           <textarea
                              ref={textareaRef}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder={messagePlaceholder}
                              className="w-full py-2 pl-10 pr-24 text-sm bg-gray-100 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none max-h-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-gray-800"
                              rows={1}
                           />
                           <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                                 <Smile size={20} />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                                 <Send size={20} />
                              </button>
                           </div>
                        </div>
                     )}
                     <div className="flex flex-col items-center p-1">
                        <a
                           href="#"
                           className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                        >
                           Powered by TurboInc
                        </a>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}

         <AnimatePresence>
            {!isOpen &&
               isBannerVisible &&
               agentConfig.showBanner &&
               agentConfig.bannerImage && (
                  <motion.div
                     drag
                     dragConstraints={dragContainerRef}
                     whileDrag={{ cursor: "grabbing" }}
                     dragMomentum={false}
                     className={`absolute bottom-5 ${positionClass} z-20 w-80 h-80  cursor-grab overflow-hidden`}
                     onDragStart={() => setIsDragging(true)}
                     onDragEnd={(event, info) => {
                        setIsDragging(false);
                        setBannerPosition({
                           x: info.offset.x,
                           y: info.offset.y,
                        });
                     }}
                     onTap={() => {
                        if (!isDragging) {
                           // setIsOpen(true);
                        }
                     }}
                     style={{ x: bannerPosition.x, y: bannerPosition.y }}
                  >
<Image
                        src={agentConfig.bannerImage}
                        alt="banner"
                        layout="fill"
                        objectFit="contain"
                        unoptimized
                     />
//...
                     <button
//...
                     >
                        {showAvatarButton ? (
                           <Image
                              src={avatarImage}
                              alt="avatar"
                              layout="fill"
                              objectFit="cover"
                              unoptimized
                           />
                        ) : (
                           <MessageSquare size={30} />
                        )}
                     </button>
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           setIsBannerVisible(false);
                        }}
                        className="absolute top-2 right-2 text-white bg-black/30 rounded-full p-1 hover:bg-black/50 transition-colors cursor-pointer"
                        aria-label="Close Banner"
                     >
                        <X size={16} />
                     </button>
                  </motion.div>
               )}
         </AnimatePresence>
         <AnimatePresence>
            {!isOpen && (
               <motion.div
                  className={`absolute ${
                     agentConfig.widgetType.toLowerCase() === "bar"
                        ? "bottom-0"
                        : "bottom-5"
                  } ${positionClass} z-10`}
               >
                  {agentConfig.widgetType.toLowerCase() === "bar" ? (
                     <button
                        onClick={() => setIsOpen(true)}
                        style={bubbleStyle}
                        className="flex items-center gap-4 cursor-pointer justify-between text-white rounded-t-md w-60 shadow-xl p-3  transition-transform duration-200 group"
                        aria-label="Open Chat"
                     >
                        <p className="text-md font-bold">
                           {barButtonText ?? "Chat Sekarang"}
                        </p>
                        <span className="block">
                           <MessageSquare
                              size={24}
                              className="block group-hover:hidden"
                           />
                           <MessageSquareMore
                              size={24}
                              className="hidden group-hover:block "
                           />
                        </span>
                     </button>
                  ) : (
                     <button
                        onClick={() => setIsOpen(true)}
                        style={bubbleStyle}
                        className="flex items-center justify-center w-16 h-16 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-200 overflow-hidden"
                        aria-label="Open Chat"
                     >
                        {showAvatarButton ? (
                           <img
                              src={avatarImage}
                              alt="avatar"
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                           />
                        ) : (
                           <MessageSquare size={30} />
                        )}
                     </button>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
