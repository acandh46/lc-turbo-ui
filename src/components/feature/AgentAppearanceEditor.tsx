"use client";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, RectangleHorizontal, Check, Circle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import ImageUpload from "../CustomUi/ImageUpload";

const PRESET_COLORS = [
   "#3b82f6",
   "#ef4444",
   "#10b981",
   "#f97316",
   "#8b5cf6",
   "#ec4899",
   "#06b6d4",
   "#f59e0b",
   "#6366f1",
   "#007bff",
   "#84cc16",
];

export const AgentAppearanceEditor = () => {
   const { config, updateAgentConfig, updateRootConfig } =
      useAgentConfigStore();
   const [openSections, setOpenSections] = useState<string[]>([
      "profile",
      "branding",
      "position",
   ]);

   useEffect(() => {
      if (config && !config.agentConfig.widgetType) {
         updateAgentConfig({ widgetType: "bubble" });
      }
   }, [config, updateAgentConfig]);

   const toggleSection = (sectionId: string) => {
      setOpenSections((current) =>
         current.includes(sectionId) ? [] : [sectionId]
      );
   };

   if (!config) {
      return null;
   }

   const { agentName, agentConfig, projectTenant } = config;
   const { theme, themeColor, widgetPostion, avatarImage, bannerImage } =
      agentConfig;

   const renderSection = (
      id: string,
      title: string,
      content: React.ReactNode
   ) => (
      <div className="cursor-pointer hover:border-blue-400 hover:border p-5 border border-gray-200 bg-white shadow-md rounded-md">
         <div
            onClick={() => toggleSection(id)}
            className="flex flex-row items-center justify-between"
         >
            <p className="font-medium text-gray-800">{title}</p>
            <ChevronRight
               className={`transition-transform ${
                  openSections.includes(id) ? "rotate-90" : ""
               }`}
            />
         </div>
         <AnimatePresence>
            {openSections.includes(id) && (
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
                  <div className="pt-4">{content}</div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );

   return (
      <div className="space-y-2 ">
         {renderSection(
            "profile",
            "Agent Profile",
            <div className="space-y-4 pb-1">
               <div className="space-y-2">
                  <div className="flex flex-row items-center justify-between">
                     <Label htmlFor="avatar-url">Avatar Image</Label>
                     <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                     >
                        <Checkbox
                           id="avatar-image"
                           checked={
                              agentConfig.widgetType.toLowerCase() === "bubble"
                                 ? agentConfig.showAvatarButton
                                 : false
                           }
                           className="h-4 w-4"
                           onCheckedChange={(checked: boolean) => {
                              if (
                                 agentConfig.widgetType.toLowerCase() ===
                                 "bubble"
                              ) {
                                 updateAgentConfig({
                                    showAvatarButton: checked,
                                 });
                              }
                           }}
                        />
                        <Label
                           htmlFor="avatar-image"
                           className="text-sm font-medium cursor-pointer"
                        >
                           Show in button
                        </Label>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 px-2">
                     <ImageUpload
                        initialImage={agentConfig.avatarImage}
                        onUploadComplete={(url: string) => {
                           updateAgentConfig({ avatarImage: url });
                        }}
                        shape="circle"
                     />
                  </div>
               </div>
               <div className="flex flex-row gap-2">
                  <div className="space-y-2 w-full px-2">
                     <Label htmlFor="agent-name">Agent Name</Label>
                     <Input
                        id="agent-name"
                        value={agentName}
                        className=" border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300"
                        onChange={(e) =>
                           updateRootConfig({ agentName: e.target.value })
                        }
                     />
                  </div>
                  <div className="space-y-2 w-full">
                     <Label htmlFor="agent-web">Website</Label>
                     <Input
                        id="agent-name"
                        value={projectTenant?.nameTenant.toUpperCase()}
                        disabled
                        className=" border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300"
                     />
                  </div>
               </div>
            </div>
         )}

         {renderSection(
            "branding",
            "Branding",
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex flex-row items-center justify-between">
                     <Label>Banner Image</Label>
                     <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                     >
                        <Checkbox
                           id="show-banner"
                           checked={agentConfig.showBanner}
                           className="h-4 w-4"
                           onCheckedChange={(checked: boolean) => {
                              updateAgentConfig({
                                 showBanner: checked,
                              });
                           }}
                        />
                        <Label
                           htmlFor="show-banner"
                           className="text-sm font-medium cursor-pointer"
                        >
                           Show Banner
                        </Label>
                     </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                     <ImageUpload
                        isDisabled={!agentConfig.showBanner}
                        initialImage={agentConfig.bannerImage}
                        onUploadComplete={(url: string) => {
                           updateAgentConfig({ bannerImage: url });
                        }}
                        shape="box"
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup
                     value={theme}
                     onValueChange={(value) =>
                        updateAgentConfig({ theme: value })
                     }
                     className="flex gap-4"
                  >
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light">Light</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark">Dark</Label>
                     </div>
                  </RadioGroup>
               </div>
               <div className="space-y-2">
                  <Label>Theme Color</Label>
                  <div className="flex flex-wrap items-center gap-3 pl-2 pb-2">
                     {PRESET_COLORS.map((color) => (
                        <button
                           key={color}
                           onClick={() =>
                              updateAgentConfig({ themeColor: color })
                           }
                           style={{ backgroundColor: color }}
                           className={`relative w-8 h-8 rounded-full transition-all ${
                              themeColor === color
                                 ? "ring-2 ring-offset-2 ring-blue-500"
                                 : ""
                           }`}
                           aria-label={`Select color ${color}`}
                        >
                           {themeColor === color && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <Check size={16} className="text-white" />
                              </div>
                           )}
                        </button>
                     ))}
                     <div className="custom-color-picker w-8 h-8 rounded-full overflow-hidden border-2 flex items-center justify-center">
                        <Input
                           type="color"
                           value={themeColor}
                           onChange={(e) =>
                              updateAgentConfig({
                                 themeColor: e.target.value,
                              })
                           }
                           className="w-12 h-12 cursor-pointer"
                        />
                     </div>
                  </div>
               </div>
            </div>
         )}

         {renderSection(
            "position",
            "Position",
            <div className="space-y-4">
               <div>
                  <Label>Position on screen</Label>
                  <RadioGroup
                     value={widgetPostion}
                     onValueChange={(value) =>
                        updateAgentConfig({ widgetPostion: value })
                     }
                     className="mt-2"
                  >
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="pos-right" />
                        <Label htmlFor="pos-right">Right</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="pos-left" />
                        <Label htmlFor="pos-left">Left</Label>
                     </div>
                  </RadioGroup>
               </div>
               <div className="border-t pt-4">
                  <Label>Widget Type</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2 pb-2">
                     <button
                        onClick={() =>
                           updateAgentConfig({ widgetType: "bubble" })
                        }
                        className={`relative rounded-lg border p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                           agentConfig.widgetType.toLowerCase() === "bubble"
                              ? "border-blue-500 ring-2 ring-blue-500/20"
                              : "hover:border-gray-400"
                        }`}
                     >
                        {agentConfig.widgetType.toLowerCase() === "bubble" && (
                           <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full">
                              <Check size={16} />
                           </div>
                        )}
                        <Circle className="text-gray-600" size={28} />
                        <p className="text-sm font-medium">Bubble</p>
                     </button>
                     <button
                        onClick={() => updateAgentConfig({ widgetType: "bar" })}
                        className={`relative rounded-lg border p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                           agentConfig.widgetType.toLowerCase() === "bar"
                              ? "border-blue-500 ring-2 ring-blue-500/20"
                              : "hover:border-gray-400"
                        }`}
                     >
                        {agentConfig.widgetType.toLowerCase() === "bar" && (
                           <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full">
                              <Check size={16} />
                           </div>
                        )}
                        <RectangleHorizontal
                           className="text-gray-600"
                           size={28}
                        />
                        <p className="text-sm font-medium">Bar</p>
                     </button>
                  </div>
               </div>

               {agentConfig.widgetType.toLowerCase() === "bar" && (
                  <div className="space-y-2 px-2 pb-2">
                     <Label htmlFor="button-text">Button Text</Label>
                     <Input
                        id="button-text"
                        value={agentConfig.barButtonText ?? "Chat Sekarang"}
                        className=" border focus:border-0 w-full focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300"
                        onChange={(e) =>
                           updateAgentConfig({
                              barButtonText: e.target.value,
                           })
                        }
                     />
                  </div>
               )}
            </div>
         )}
      </div>
   );
};
