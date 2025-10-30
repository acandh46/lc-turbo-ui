"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronRight, CreditCard, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WelcomeMessageCardEditor } from "./WelcomeMessageCardEditor";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";

const MessageTypeSwitcher = () => {
   const { config, updateAgentConfig } = useAgentConfigStore();
   const currentType = config?.agentConfig.welcomeMessageType || "text";

   const setType = (type: "text" | "card") => {
      updateAgentConfig({ welcomeMessageType: type });
   };

   return (
      <div>
         <Label className="text-xs">Message Type</Label>
         <div className="grid grid-cols-2 gap-2 mt-2">
            <button
               onClick={() => setType("text")}
               className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all",
                  currentType === "text"
                     ? "border-blue-500 bg-blue-50"
                     : "border-gray-200 bg-white hover:border-gray-300"
               )}
            >
               <MessageSquare
                  className={cn(
                     "mb-2",
                     currentType === "text" ? "text-blue-600" : "text-gray-400"
                  )}
               />
               <span
                  className={cn(
                     "font-medium",
                     currentType === "text" ? "text-blue-700" : "text-gray-600"
                  )}
               >
                  Text
               </span>
            </button>
            <button
               onClick={() => setType("card")}
               className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all",
                  currentType === "card"
                     ? "border-blue-500 bg-blue-50"
                     : "border-gray-200 bg-white hover:border-gray-300"
               )}
            >
               <CreditCard
                  className={cn(
                     "mb-2",
                     currentType === "card" ? "text-blue-600" : "text-gray-400"
                  )}
               />
               <span
                  className={cn(
                     "font-medium",
                     currentType === "card" ? "text-blue-700" : "text-gray-600"
                  )}
               >
                  Card
               </span>
            </button>
         </div>
      </div>
   );
};

export const AgentWelcomeEditor = () => {
   const { config, updateAgentConfig } = useAgentConfigStore();
   const [openSections, setOpenSections] = useState<string[]>(["welcome_msg"]);
   const [focusedInput, setFocusedInput] = useState<string | null>(null);

   const welcomeMessageType = config?.agentConfig.welcomeMessageType;

   useEffect(() => {
      if (
         welcomeMessageType === "card" &&
         !config?.agentConfig.welcomeMessageCard
      ) {
         updateAgentConfig({
            welcomeMessageCard: {
               imageUrl: "",
               text: "Welcome!",
               buttons: [{ text: "Click me", url: "https://example.com" }],
            },
         });
      }
   }, [
      welcomeMessageType,
      config?.agentConfig.welcomeMessageCard,
      updateAgentConfig,
   ]);

   const toggleSection = (sectionId: string) => {
      setOpenSections((current) =>
         current.includes(sectionId) ? [] : [sectionId]
      );
   };

   if (!config) {
      return null; // Or a loading skeleton
   }

   const { agentConfig } = config;

   return (
      <div className="space-y-2">
         {/* Main Welcome Message Card */}
         <div
            className={`cursor-pointer hover:border-blue-400 hover:border p-4 border border-gray-200 bg-white shadow-md rounded-md `}
         >
            <Collapsible
               open={openSections.includes("welcome_msg")}
               onOpenChange={() => toggleSection("welcome_msg")}
            >
               <CollapsibleTrigger className="w-full">
                  <div className="flex flex-row items-center justify-between">
                     <p className="font-medium text-gray-800">
                        Welcome Message
                     </p>
                     <ChevronRight
                        className={`transition-transform ${
                           openSections.includes("welcome_msg")
                              ? "rotate-90"
                              : ""
                        }`}
                     />
                  </div>
               </CollapsibleTrigger>
               <AnimatePresence>
                  {openSections.includes("welcome_msg") && (
                     <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                           open: { opacity: 1, height: "auto" },
                           collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                           duration: 0.3,
                           ease: "easeInOut",
                        }}
                        style={{ overflow: "hidden" }}
                     >
                        <div className="pt-4 px-2 space-y-4">
                           <MessageTypeSwitcher />

                           {agentConfig.welcomeMessageType === "card" ? (
                              agentConfig.welcomeMessageCard ? (
                                 <WelcomeMessageCardEditor />
                              ) : null
                           ) : (
                              <div className="flex flex-col w-full space-y-2 py-2">
                                 <Label
                                    htmlFor="welcome-message-collapsible"
                                    className="text-xs"
                                 >
                                    Welcome Message
                                 </Label>
                                 <Input
                                    id="welcome-message-collapsible"
                                    value={agentConfig.welcomeMessage}
                                    className={`border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                                       focusedInput ===
                                       "welcome-message-collapsible"
                                          ? "border-blue-400"
                                          : ""
                                    }`}
                                    onFocus={() =>
                                       setFocusedInput(
                                          "welcome-message-collapsible"
                                       )
                                    }
                                    onBlur={() => setFocusedInput(null)}
                                    onChange={(e) =>
                                       updateAgentConfig({
                                          welcomeMessage: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                           )}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </Collapsible>
         </div>
         {/* Other settings like default customer name, etc. can remain here or be moved */}
         <div
            className={`cursor-pointer hover:border-blue-400 hover:border p-4 border border-gray-200 bg-white shadow-md rounded-md `}
         >
            <Collapsible
               open={openSections.includes("other_settings")}
               onOpenChange={() => toggleSection("other_settings")}
            >
               <CollapsibleTrigger className="w-full">
                  <div className="flex flex-row items-center justify-between">
                     <p className="font-medium text-gray-800">Other Settings</p>
                     <ChevronRight
                        className={`transition-transform ${
                           openSections.includes("other_settings")
                              ? "rotate-90"
                              : ""
                        }`}
                     />
                  </div>
               </CollapsibleTrigger>
               <AnimatePresence>
                  {openSections.includes("other_settings") && (
                     <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                           open: { opacity: 1, height: "auto" },
                           collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                           duration: 0.3,
                           ease: "easeInOut",
                        }}
                        style={{ overflow: "hidden" }}
                     >
                        <div className="pt-4 px-2">
                           <div className="flex flex-row gap-2 mt-2">
                              <div className="flex flex-col w-full space-y-2 py-2">
                                 <Label
                                    htmlFor="default-customer-collapsible"
                                    className="text-xs"
                                 >
                                    Default Customer Name
                                 </Label>
                                 <Input
                                    id="default-customer-collapsible"
                                    className={`border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                                       focusedInput ===
                                       "default-customer-collapsible"
                                          ? "border-blue-400"
                                          : ""
                                    }`}
                                    value={agentConfig.defaultCustomerName}
                                    onFocus={() =>
                                       setFocusedInput(
                                          "default-customer-collapsible"
                                       )
                                    }
                                    onBlur={() => setFocusedInput(null)}
                                    onChange={(e) =>
                                       updateAgentConfig({
                                          defaultCustomerName: e.target.value,
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="flex flex-col w-full space-y-2 py-2 ">
                              <Label
                                 htmlFor="message-placeholder-collapsible"
                                 className="text-xs"
                              >
                                 Message placeholder
                              </Label>
                              <Input
                                 id="message-placeholder-collapsible"
                                 className={`border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                                    focusedInput ===
                                    "message-placeholder-collapsible"
                                       ? "border-blue-400"
                                       : ""
                                 }`}
                                 value={agentConfig.messagePlaceholder}
                                 onFocus={() =>
                                    setFocusedInput(
                                       "message-placeholder-collapsible"
                                    )
                                 }
                                 onBlur={() => setFocusedInput(null)}
                                 onChange={(e) =>
                                    updateAgentConfig({
                                       messagePlaceholder: e.target.value,
                                    })
                                 }
                              />
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </Collapsible>
         </div>
         {/* Away/Offline Messages Card */}
         <div
            className={`cursor-pointer hover:border-blue-400 hover:border p-4 border border-gray-200 bg-white shadow-md rounded-md `}
         >
            <Collapsible
               open={openSections.includes("agent_away")}
               onOpenChange={() => toggleSection("agent_away")}
            >
               <CollapsibleTrigger className="w-full">
                  <div className="flex flex-row items-center justify-between">
                     <p className="font-medium text-gray-800">Away Message</p>
                     <ChevronRight
                        className={`transition-transform ${
                           openSections.includes("agent_away")
                              ? "rotate-90"
                              : ""
                        }`}
                     />
                  </div>
               </CollapsibleTrigger>
               <AnimatePresence>
                  {openSections.includes("agent_away") && (
                     <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                           open: { opacity: 1, height: "auto" },
                           collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                           duration: 0.3,
                           ease: "easeInOut",
                        }}
                        style={{ overflow: "hidden" }}
                     >
                        <div className="space-y-6 pt-4 px-2">
                           <div className="space-y-2">
                              <Label htmlFor="offline-message">
                                 Offline Message
                              </Label>
                              <Textarea
                                 id="offline-message"
                                 value={agentConfig.offlineMessage}
                                 className={`border-0 focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                                    focusedInput === "offline-message"
                                       ? "border-blue-400"
                                       : ""
                                 }`}
                                 onFocus={() =>
                                    setFocusedInput("offline-message")
                                 }
                                 onBlur={() => setFocusedInput(null)}
                                 onChange={(e) =>
                                    updateAgentConfig({
                                       offlineMessage: e.target.value,
                                    })
                                 }
                                 rows={3}
                              />
                           </div>
                           <div className="space-y-2 pb-2">
                              <Label htmlFor="inqueue-message">
                                 In-Queue Message
                              </Label>
                              <Textarea
                                 id="inqueue-message"
                                 value={agentConfig.customerInqueueMessage}
                                 className={`border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                                    focusedInput === "inqueue-message"
                                       ? "border-blue-400"
                                       : ""
                                 }`}
                                 onFocus={() =>
                                    setFocusedInput("inqueue-message")
                                 }
                                 onBlur={() => setFocusedInput(null)}
                                 onChange={(e) =>
                                    updateAgentConfig({
                                       customerInqueueMessage: e.target.value,
                                    })
                                 }
                                 rows={3}
                              />
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </Collapsible>
         </div>
      </div>
   );
};
