"use client";

import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { useState } from "react";
import { RenderSection } from "./RenderSection";
import { Label } from "@/components/ui/label";
import { CreditCard, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { WelcomeCardEditor } from "./WelcomCardEditor";
import { Textarea } from "@/components/ui/textarea";

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
                  "flex flex-col cursor-pointer items-center justify-center p-4 rounded-md border-2 transition-all",
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
                  "flex flex-col cursor-pointer items-center justify-center p-4 rounded-md border-2 transition-all",
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

export const WelcomeEditor = () => {
   const { config, updateAgentConfig } = useAgentConfigStore();
   const [openSections, setOpenSections] = useState<string[]>([
      "welcome_msg",
      "other-settings",
      "away_msg",
   ]);
   const [focusedInput, setFocusedInput] = useState<string | null>(null);

   const welcomeMessageType = config?.agentConfig.welcomeMessageType;

   // useEffect(() => {
   //    if (
   //       welcomeMessageType === "card" &&
   //       !config?.agentConfig.welcomeMessageCard
   //    ) {
   //       updateAgentConfig({
   //          welcomeMessageCard: {
   //             imageUrl: "",
   //             text: "Welcome!",

   //             buttons: [{ text: "Click me", url: "https://example.com" }],
   //          },
   //       });
   //    }
   // }, [
   //    welcomeMessageType,
   //    config?.agentConfig.welcomeMessageCard,
   //    updateAgentConfig,
   // ]);

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
         <RenderSection
            id="welcome_msg"
            title="Welcome Message"
            toogleSection={() => toggleSection("welcome_msg")}
            openSection={openSections}
            content={
               <>
                  <MessageTypeSwitcher />
                  {agentConfig.welcomeMessageType === "card" ? (
                     agentConfig.welcomeMessageCard ? (
                        <WelcomeCardEditor />
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
                              focusedInput === "welcome-message-collapsible"
                                 ? "border-blue-400"
                                 : ""
                           }`}
                           onFocus={() =>
                              setFocusedInput("welcome-message-collapsible")
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
               </>
            }
         />

         <RenderSection
            id="other-settings"
            title="Other Settingss"
            toogleSection={() => toggleSection("other-settings")}
            openSection={openSections}
            content={
               <>
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
                              focusedInput === "default-customer-collapsible"
                                 ? "border-blue-400"
                                 : ""
                           }`}
                           value={agentConfig.defaultCustomerName}
                           onFocus={() =>
                              setFocusedInput("default-customer-collapsible")
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
                           focusedInput === "message-placeholder-collapsible"
                              ? "border-blue-400"
                              : ""
                        }`}
                        value={agentConfig.messagePlaceholder}
                        onFocus={() =>
                           setFocusedInput("message-placeholder-collapsible")
                        }
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) =>
                           updateAgentConfig({
                              messagePlaceholder: e.target.value,
                           })
                        }
                     />
                  </div>
               </>
            }
         />

         <RenderSection
            id="away_msg"
            title="Away Message"
            toogleSection={() => toggleSection("away_msg")}
            openSection={openSections}
            content={
               <>
                  <div className="space-y-2">
                     <Label htmlFor="offline-message">Offline Message</Label>
                     <Textarea
                        id="offline-message"
                        value={agentConfig.offlineMessage}
                        className={`border-0 focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                           focusedInput === "offline-message"
                              ? "border-blue-400"
                              : ""
                        }`}
                        onFocus={() => setFocusedInput("offline-message")}
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
                     <Label htmlFor="inqueue-message">In-Queue Message</Label>
                     <Textarea
                        id="inqueue-message"
                        value={agentConfig.customerInqueueMessage}
                        className={`border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                           focusedInput === "inqueue-message"
                              ? "border-blue-400"
                              : ""
                        }`}
                        onFocus={() => setFocusedInput("inqueue-message")}
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) =>
                           updateAgentConfig({
                              customerInqueueMessage: e.target.value,
                           })
                        }
                        rows={3}
                     />
                  </div>
               </>
            }
         />
      </div>
   );
};
