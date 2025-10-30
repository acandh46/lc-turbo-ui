"use client";

import { ProjectSettingsTab } from "@/components/feature/settings/project/ProjectSettingsTab";
import { WebsiteSettingsTab } from "@/components/feature/settings/project/WebsiteSettingsTab";
import HeaderContent from "@/components/layout/HeaderContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectPage = () => {
   return (
      <div className="flex flex-1 flex-col bg-slate-50 rounded-2xl overflow-hidden">
         <HeaderContent title="Project" />
         <div className="flex flex-col overflow-auto p-3">
            <Tabs defaultValue="project">
               <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
                  <TabsTrigger value="project">Project</TabsTrigger>
                  <TabsTrigger value="website">Website</TabsTrigger>
               </TabsList>
               <TabsContent value="project">
                  <ProjectSettingsTab />
               </TabsContent>
               <TabsContent value="website">
                  <WebsiteSettingsTab />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
};

export default ProjectPage;
