"use client";
import LoadingComponent from "@/components/CustomUi/LoadingComp";
import { FloatingSaveButton } from "@/components/feature/FloatingSaveButton";
import HeaderContent from "@/components/layout/HeaderContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agentApi } from "@/lib/api";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AppearanceEditor } from "@/components/chat-widget/editor/AppearanceEditor";
import { WelcomeEditor } from "@/components/chat-widget/editor/WelcomeEditor";
import { PreChatEditor } from "@/components/chat-widget/editor/PreChatEditor";
import { AgentChatPreview } from "@/components/chat-widget/AgentChatPreview";

export default function AgentsConfigurationPage() {
   const params = useParams();
   const agentId = params.id as string;

   const {
      config,
      setConfig: setStoreConfig,
      isDirty,
      setAsSaved,
      setActiveTab,
   } = useAgentConfigStore();

   const [isLoading, setIsLoading] = useState(true);
   const [isSaving, setIsSaving] = useState(false);

   // Fetch initial config
   const fetchConfig = useCallback(async () => {
      setIsLoading(true);
      try {
         const response = await agentApi.getConfigAgent(agentId);
         if (!response.status) {
            toast.error(response.msg, { position: "top-right" });
         } else {
            setStoreConfig(response.data);
         }
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   }, [agentId, setStoreConfig]);

   useEffect(() => {
      fetchConfig();
   }, [fetchConfig]);

   // Handle unsaved changes on refresh/close
   useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
         if (isDirty) {
            e.preventDefault();
            e.returnValue = ""; // Required for Chrome
         }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, [isDirty]);

   // Save handler
   const handleSave = async () => {
      if (!config) return;
      setIsSaving(true);
      try {
         const response = await agentApi.saveConfig(agentId, config);
         
         // Assuming you have an update API endpoint
         // const response = await agentApi.updateConfigAgent(agentId, config);
         // For demonstration, we'll simulate a successful save
         // console.log(config);
         // await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

         toast.success("Configuration saved successfully!", {
            position: "top-right",
         });
         setAsSaved(); // Reset the isDirty flag in the store
      } catch (error) {
         toast.error("Failed to save configuration.", {
            position: "top-right",
         });
      } finally {
         setIsSaving(false);
      }
   };

   return (
      <div className="relative flex flex-1 flex-col bg-slate-50 rounded-2xl overflow-hidden">
         <div className="flex-1 h-full grid grid-cols-2 ">
            <div className="flex flex-col flex-1 min-h-0">
               <HeaderContent title="Configuration Widget" />
               <div className="flex flex-1 flex-col min-h-0">
                  {isLoading ? (
                     <div className="flex-1 overflow-auto px-6 pb-2 mt-6">
                        <LoadingComponent />
                     </div>
                  ) : (
                     <Tabs
                        defaultValue="apperance"
                        onValueChange={(value) => setActiveTab(value as any)}
                        className="flex flex-1 flex-col min-h-0"
                     >
                        <div className="px-6 mt-6 border-b">
                           <TabsList className=" inline-flex  w-full  grid-cols-4 gap-2 bg-transparent p-0 border-none">
                              <TabsTrigger value="apperance">
                                 Apperance
                              </TabsTrigger>
                              <TabsTrigger value="welcome">
                                 Welcome Message
                              </TabsTrigger>
                              <TabsTrigger value="pre-chat">
                                 Form Pre-Chat
                              </TabsTrigger>
                           </TabsList>
                        </div>
                        <div className="flex-1 overflow-auto px-6">
                           <TabsContent value="apperance">
                              {/* <AgentAppearanceEditor /> */}
                              <AppearanceEditor />
                           </TabsContent>
                           <TabsContent value="welcome">
                              <WelcomeEditor />
                              {/* <AgentWelcomeEditor /> */}
                           </TabsContent>
                           <TabsContent value="pre-chat">
                              <PreChatEditor />
                              {/* <AgentFormPreChatCard /> */}
                           </TabsContent>
                        </div>
                     </Tabs>
                  )}
               </div>
            </div>
            <div className="flex flex-col flex-1 min-h-0">
               <HeaderContent title="Preview" showToggleMenu={false} />
               <div className="flex flex-col relative items-center min-h-[80%] gap-0">
                  <AgentChatPreview />
                  {/* <AgentPreview /> */}
                  <p>coke</p>
               </div>
            </div>
         </div>
         {isDirty && (
            <FloatingSaveButton onSave={handleSave} isSaving={isSaving} />
         )}
      </div>
   );
}
