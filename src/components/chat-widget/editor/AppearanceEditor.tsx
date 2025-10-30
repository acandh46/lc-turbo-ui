"use client";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { Check, Circle, Moon, RectangleHorizontal, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/CustomUi/ImageUpload";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RenderSection } from "./RenderSection";

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

export const AppearanceEditor = () => {
   const { config, updateAgentConfig, updateRootConfig } =
      useAgentConfigStore();
   const [focusedInput, setFocusedInput] = useState<string | null>(null);
   const [openSections, setOpenSections] = useState<string[]>([
      "profile",
      "branding",
      "position",
   ]);
   useEffect(() => {
      if (config && !config.agentConfig.widgetType) {
         updateAgentConfig({ widgetType: "BUBBLE" });
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
   const { themeColor, widgetPosition, avatarImage, bannerImage } = agentConfig;

   return (
      <div className="space-y-2">
         <RenderSection
            id="profile"
            title="Agent Profile"
            toogleSection={() => toggleSection("profile")}
            openSection={openSections}
            content={
               <div className="space-y-4 pb-1">
                  <div className="grid grid-cols-2 gap-4 mt-2 pb-2">
                     <div className="flex flex-col items-center gap-3 ">
                        <ImageUpload
                           initialImage={agentConfig.avatarImage}
                           onUploadComplete={(url: string) => {
                              updateAgentConfig({ avatarImage: url });
                           }}
                           shape="circle"
                        />
                        <div
                           className="flex items-center gap-2"
                           onClick={(e) => e.stopPropagation()}
                        >
                           <Checkbox
                              id="avatar-image"
                              checked={
                                 agentConfig.widgetType === "BUBBLE"
                                    ? agentConfig.showAvatarButton
                                    : false
                              }
                              className="h-4 w-4"
                              onCheckedChange={(checked: boolean) => {
                                 if (agentConfig.widgetType === "BUBBLE") {
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
                     <div className="flex flex-col gap-4 pr-2">
                        <div className="space-y-2 w-full">
                           <Label htmlFor="agent-web">Website</Label>
                           <Input
                              id="agent-name"
                              value={projectTenant?.nameTenant.toUpperCase()}
                              disabled
                              className=" border focus:border-0 font-bold focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300"
                           />
                        </div>
                        <div className="space-y-2 w-full">
                           <Label htmlFor="agent-name">Agent Name</Label>
                           <Input
                              id="agent-name"
                              value={agentName}
                              className={`border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 ${
                                 focusedInput === "agent-name"
                                    ? "border-blue-400"
                                    : ""
                              }`}
                              onChange={(e) =>
                                 updateRootConfig({ agentName: e.target.value })
                              }
                              onFocus={() => setFocusedInput("agent-name")}
                              onBlur={() => setFocusedInput(null)}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            }
         />
         <RenderSection
            id="branding"
            title="Branding"
            toogleSection={() => toggleSection("branding")}
            openSection={openSections}
            content={
               <div className="space-y-3">
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
                     <div className="grid grid-cols-2 gap-4 mt-2">
                        <button
                           onClick={() => updateAgentConfig({ theme: "light" })}
                           className={`relative rounded-lg cursor-pointer border p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                              agentConfig.theme === "light"
                                 ? "border-blue-500 ring-2 ring-blue-500/20"
                                 : "hover:border-gray-400"
                           }`}
                        >
                           {agentConfig.theme === "light" && (
                              <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full">
                                 <Check size={16} />
                              </div>
                           )}
                           <Sun className="text-gray-600" size={28} />
                           <p className="text-sm font-medium">Light</p>
                        </button>
                        <button
                           onClick={() => updateAgentConfig({ theme: "dark" })}
                           className={`relative cursor-pointer rounded-lg border p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                              agentConfig.theme === "dark"
                                 ? "border-blue-500 ring-2 ring-blue-500/20"
                                 : "hover:border-gray-400"
                           }`}
                        >
                           {agentConfig.theme === "dark" && (
                              <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full">
                                 <Check size={16} />
                              </div>
                           )}
                           <Moon className="text-gray-600" size={28} />
                           <p className="text-sm font-medium">Dark</p>
                        </button>
                     </div>
                  </div>

                  <div className="pt-4">
                     <Label>Widget Position</Label>
                     <div className="flex flex-row gap-2 mt-2 px-2 justify-around">
                        <div className="flex flex-col items-center gap-1">
                           <span className="text-xs">Align to</span>
                           <select
                              className="border rounded mt-0 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              value={agentConfig.widgetPosition}
                              onChange={(e) =>
                                 updateAgentConfig({
                                    widgetPosition: e.target.value,
                                 })
                              }
                           >
                              <option value="bottom_right">Right</option>
                              <option value="bottom_left">Left</option>
                           </select>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                           <span className="text-xs">Side Spacing</span>
                           <Input
                              id="side-spacing"
                              type="number"
                              min={0}
                              className="w-20  border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300"
                              value={agentConfig.widgetSideSpacing ?? 0}
                              onChange={(e) =>
                                 updateAgentConfig({
                                    widgetSideSpacing: Number(e.target.value),
                                 })
                              }
                           />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                           <span className="text-xs">Bottom Spacing</span>
                           <Input
                              id="side-spacing"
                              type="number"
                              min={0}
                              className="w-20  border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300"
                              value={agentConfig.widgetBottomSpacing ?? 0}
                              onChange={(e) =>
                                 updateAgentConfig({
                                    widgetBottomSpacing: Number(e.target.value),
                                 })
                              }
                           />
                        </div>
                     </div>
                  </div>

                  <div className="border-t pt-4">
                     <Label>Widget Type</Label>
                     <div className="grid grid-cols-2 gap-4 mt-2 pb-2">
                        <button
                           onClick={() =>
                              updateAgentConfig({ widgetType: "BUBBLE" })
                           }
                           className={`relative rounded-lg cursor-pointer border p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                              agentConfig.widgetType === "BUBBLE"
                                 ? "border-blue-500 ring-2 ring-blue-500/20"
                                 : "hover:border-gray-400"
                           }`}
                        >
                           {agentConfig.widgetType === "BUBBLE" && (
                              <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full">
                                 <Check size={16} />
                              </div>
                           )}
                           <Circle className="text-gray-600" size={28} />
                           <p className="text-sm font-medium">Bubble</p>
                        </button>
                        <button
                           onClick={() =>
                              updateAgentConfig({ widgetType: "BUTTON" })
                           }
                           className={`relative cursor-pointer rounded-lg border p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                              agentConfig.widgetType === "BUTTON"
                                 ? "border-blue-500 ring-2 ring-blue-500/20"
                                 : "hover:border-gray-400"
                           }`}
                        >
                           {agentConfig.widgetType === "BUTTON" && (
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

                  {agentConfig.widgetType === "BUTTON" && (
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
            }
         />
      </div>
   );
};
