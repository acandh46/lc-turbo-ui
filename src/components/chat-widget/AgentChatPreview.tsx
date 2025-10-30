"use client";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { AnimatePresence, motion } from "framer-motion";
import {
   ChevronDown,
   MessageSquare,
   MessageSquareMore,
   Smile,
   Send,
   Paperclip,
   X,
} from "lucide-react";
import Image from "next/image";
import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { AvatarWidget } from "./AvatarWidget";
import { RenderHtml } from "./RenderHtml";
import { WelcomeMessageCardPreview } from "./WelcomeMessageCardPreview";
import { AgentPreChatFormFieldType } from "@/types/agent.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { DndContext, useDraggable } from "@dnd-kit/core";

function Draggable(props: { children: React.ReactNode }) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: "draggable",
   });
   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : {};

   return (
      <div
         ref={setNodeRef}
         style={{ ...style, zIndex: 120 }}
         {...listeners}
         {...attributes}
      >
         {props.children}
      </div>
   );
}

export const AgentChatPreview = () => {
   const { config, activeTab, updateAgentConfig } = useAgentConfigStore();
   const [isOpen, setIsOpen] = useState(false);
   const [isBannerVisible, setIsBannerVisible] = useState(true);
   const [isPreChatSubmitted, setIsPreChatSubmitted] = useState(false);
   const [position, setPosition] = useState({
      x: config?.agentConfig.bannerPostionX || 0,
      y: config?.agentConfig.bannerPostionY || 0,
   });
   const dragContainerRef = useRef(null);
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const [message, setMessage] = useState("");

   const handleDragEnd = ({ delta }: { delta: { x: number; y: number } }) => {
      setPosition((prev) => {
         const newX = prev.x + delta.x;
         const newY = prev.y + delta.y;

         updateAgentConfig({
            bannerPostionX: newX,
            bannerPostionY: newY,
         });
         return { x: newX, y: newY };
      });
   };

   useEffect(() => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto";
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   }, [message]);

   useEffect(() => {
      setIsOpen(true);
   }, [activeTab]);

   useEffect(() => {
      if (config?.agentConfig?.theme) {
         setIsOpen(true);
      }
   }, [config?.agentConfig.theme]);

   useEffect(() => {
      if (config?.agentConfig?.widgetType) {
         setIsOpen(false);
      }
   }, [config?.agentConfig?.widgetType]);

   useEffect(() => {
      if (config?.agentConfig.showBanner) {
         setPosition((prev) => ({
            x: config.agentConfig.bannerPostionX ?? prev.x,
            y: config.agentConfig.bannerPostionY ?? prev.y,
         }));
      }
   }, [config?.agentConfig.showBanner]);

   const sortedFields = useMemo(
      () =>
         Array.isArray(config?.agentConfig?.preChatFormField)
            ? [...config.agentConfig.preChatFormField].sort(
                 (a, b) => a.order - b.order
              )
            : [],
      [config?.agentConfig?.preChatFormField]
   );

   const renderField = useCallback(
      (field: AgentPreChatFormFieldType) => {
         const themeColor = config?.agentConfig?.themeColor || "#000000";

         if (field.type === "HEADER") {
            return (
               <RenderHtml
                  key={field.id}
                  content={field.label}
                  className="text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm prose-p:my-0 w-full wrapbreak-words"
                  style={{
                     wordBreak: "break-word",
                     overflowWrap: "anywhere",
                     maxWidth: "100%",
                  }}
               />
            );
         }
         const isInputType = field.type === "EMAIL" || field.type === "TEXT";
         return (
            <div key={field.id} className="space-y-1 w-full">
               <div key={field.id} className="space-y-1 w-full">
                  <Label
                     htmlFor={field.id}
                     className="text-md  dark:text-white truncate gap-2"
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
                        type={field.type.toLowerCase()}
                        placeholder={field.placeholder || ""}
                        required={field.required}
                        style={{
                           maxWidth: "100%",
                        }}
                        className={`
                           focus-visible:border-0
                           focus-visible:ring-[${themeColor}]
                           transition-colors
                           focus-visible:ring-1
                           focus:ring-[${themeColor}]
                           focus:border-[${themeColor}]
                        `}
                     />
                  )}
                  {field.type == "RADIO" && (
                     <RadioGroup className="mt-3">
                        {field.options.map((item: any, idx: number) => (
                           <div key={idx} className="flex items-center gap-3">
                              <RadioGroupItem
                                 value={item}
                                 id="r1"
                                 className=" border-black border-2 darK:border-white"
                              />
                              <Label
                                 htmlFor="r1"
                                 className="text-sm text-gray-800 dark:text-white"
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
                        className={`
                           bg-white h-8 text-sm dark:bg-gray-600 
                           w-full 
                           border 
                           rounded px-2 
                           focus:outline-none 
                           focus-visible:border-0
                           focus-visible:ring-[${themeColor}]
                           transition-colors
                           focus-visible:ring-1
                           dark:text-white
                           focus:ring-[${themeColor}]
                           focus:border-[${themeColor}]
                           mt-2
                        `}
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
            </div>
         );
      },
      [config?.agentConfig?.themeColor]
   );

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
      widgetPosition,
      preChatFormEnabled,
      showAvatarButton,
   } = agentConfig;
   const bubbleStyle = { backgroundColor: themeColor };
   const headerStyle =
      agentConfig.theme === "dark"
         ? { backgroundColor: "black" }
         : { backgroundColor: themeColor };
   const positionClass =
      widgetPosition === "bottom_left" ? "left-4" : "right-4";
   const showMessageInput = activeTab == "apperance";

   const PreChatFromBubble = () => {
      return (
         <div className="relative flex flex-col w-full max-w-xs p-4 bg-white rounded-md space-y-3 dark:bg-gray-700 box-border overflow-hidden">
            <div className="flex flex-col gap-3 w-full">
               {sortedFields.map(renderField)}
            </div>
            <button
               onClick={() => setIsPreChatSubmitted(true)}
               style={bubbleStyle}
               className="w-full h-10 text-white mt-5 rounded-md font-bold"
            >
               Mulai Obrolan
            </button>
         </div>
      );
   };

   console.log(position);

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
                  className={`flex flex-col w-85 h-160 bg-gray-200/50  rounded-xl shadow-xl overflow-hidden border border-gray-200/50 dark:bg-black dark:border-gray-700/50 ${
                     agentConfig.theme === "dark" ? "dark" : ""
                  }`}
               >
                  {/* header */}
                  <motion.div
                     style={headerStyle}
                     className="flex flex-col p-4 relative text-white"
                  >
                     <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 text-white/70 hover:text-white"
                     >
                        <ChevronDown size={20} />
                     </button>
                     <div className="flex items-center space-x-4">
                        {/* <Avatar /> */}
                        <AvatarWidget
                           avatarImage={avatarImage}
                           agentName={agentName}
                        />
                        <div>
                           <h3 className="font-bold text-lg">{agentName}</h3>
                           <p className="text-xs opacity-90">
                              We reply immediately
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  {/* content */}
                  <div className="grow p-4 overflow-y-auto space-y-4 dark:bg-black ">
                     {activeTab === "welcome" && (
                        <div className="flex items-start gap-2.5">
                           <div className="shrink-0">
                              <AvatarWidget
                                 size="sm"
                                 avatarImage={avatarImage}
                                 agentName={agentName}
                              />
                           </div>
                           {agentConfig.welcomeMessageType === "card" &&
                           agentConfig.welcomeMessageCard ? (
                              <WelcomeMessageCardPreview
                                 buttonColor={themeColor}
                                 card={agentConfig.welcomeMessageCard}
                              />
                           ) : (
                              <div className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 bg-white dark:bg-gray-700 rounded-r-xl rounded-t-xl">
                                 <RenderHtml
                                    content={welcomeMessage}
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
                                 <AvatarWidget
                                    size="sm"
                                    avatarImage={avatarImage}
                                    agentName={agentName}
                                 />
                              </div>
                              <div className="flex flex-col w-fit max-w-[80%] leading-1.5 px-4 py-3 bg-white dark:bg-gray-700 rounded-r-xl rounded-t-xl">
                                 <p className="text-sm font-normal text-gray-800 dark:text-gray-200">
                                    Tentu, silakan. Apa yang ingin Anda ketahui?
                                 </p>
                              </div>
                           </div>
                        </>
                     )}
                     {activeTab === "pre-chat" &&
                        preChatFormEnabled &&
                        !isPreChatSubmitted && (
                           <div className="flex items-start gap-2">
                              <div className="shrink-0">
                                 <AvatarWidget
                                    size="sm"
                                    avatarImage={avatarImage}
                                    agentName={agentName}
                                 />
                              </div>
                              <PreChatFromBubble />
                           </div>
                        )}
                  </div>

                  {/* footer */}
                  <div className="  bg-white p-1 dark:bg-black ">
                     {showMessageInput && (
                        <div className="relative flex items-end dark:text-white">
                           <button className="absolute left-3 bottom-2.5 text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                              <Paperclip size={20} />
                           </button>
                           <textarea
                              ref={textareaRef}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder={messagePlaceholder}
                              style={
                                 themeColor
                                    ? ({
                                         outlineColor: themeColor,
                                         "--theme-color": themeColor,
                                      } as React.CSSProperties)
                                    : undefined
                              }
                              className="w-full py-2 pl-10 pr-24 text-sm bg-gray-100 border-transparent rounded-md focus:outline   resize-none max-h-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-gray-900"
                              rows={1}
                           />
                           <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                              <button className="text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                                 <Smile size={20} />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
                                 <Send size={20} />
                              </button>
                           </div>
                        </div>
                     )}
                     <div className="flex flex-col items-center p-1">
                        <a
                           href="#"
                           className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
                        >
                           Powered by TurboInc
                        </a>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}

         {/* banner image */}
         <AnimatePresence>
            {isBannerVisible &&
               !isOpen &&
               agentConfig.showBanner &&
               agentConfig.bannerImage && (
                  <DndContext onDragEnd={handleDragEnd}>
                     <Draggable>
                        <motion.div
                           className="absolute bottom-0 right-0 z-120 w-80 h-80 cursor-grab "
                           style={{
                              position: "absolute",
                              left: position.x,
                              top: position.y,
                           }}
                        >
                           <button
                              onClick={() => setIsBannerVisible(false)}
                              className="absolute top-2 right-2 bg-gray-800/50 text-white rounded-full p-1 hover:bg-gray-800 z-10"
                              aria-label="Close banner"
                           >
                              <X size={16} />
                           </button>
                           <Image
                              src={agentConfig.bannerImage}
                              alt="banner"
                              layout="fill"
                              objectFit="contain"
                              unoptimized
                              className="pointer-events-none"
                           />
                        </motion.div>
                     </Draggable>
                  </DndContext>
               )}
         </AnimatePresence>

         {/* button bubble */}
         <AnimatePresence>
            {!isOpen && (
               <motion.div
                  className={`absolute ${
                     agentConfig.widgetType === "BUTTON"
                        ? "bottom-0"
                        : "bottom-10"
                  } ${positionClass} z-0`}
               >
                  {agentConfig.widgetType === "BUTTON" ? (
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
                        aria-label="Open Chat"
                        className="flex items-center justify-center w-16 h-16 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-200 overflow-hidden"
                        style={bubbleStyle}
                     >
                        {showAvatarButton ? (
                           <Image
                              alt="avatar"
                              src={avatarImage}
                              width={70}
                              height={70}
                              objectFit="cover"
                              unoptimized
                           />
                        ) : (
                           <MessageSquare size={33} className="font-bold" />
                        )}
                     </button>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
