"use client";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { useModalStore } from "@/store/useModalStore";
import { PlusCircle, Loader2, Pencil } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { projectApi } from "@/lib/api";
import { ProjectType } from "@/types/project.typs";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../data-table/DataTable";
import ActionButton from "@/components/CustomUi/ActionButton";

export const ProjectSettingsTab = () => {
   const { onOpen } = useModalStore();
   const [projects, setProjects] = useState<ProjectType[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const fetchProjects = useCallback(async () => {
      setIsLoading(true);
      try {
         const response = await projectApi.getProject();
         setProjects(response.data);
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   }, []);

   const columns: ColumnDef<ProjectType>[] = [
      {
         accessorKey: "name",
         header: "Name Projects",
         cell: ({ row }) => (
            <span className="font-semibold text-blue-900 dark:text-blue-200">
               {row.original.name?.toUpperCase() || "-"}
            </span>
         ),
      },
      {
         accessorKey: "web",
         header: "Webs",
         cell: ({ row }) => (
            <span className="font-semibold text-blue-900 dark:text-blue-200">
               {row.original.web}
            </span>
         ),
      },
      {
         accessorKey: "actions",
         header: "Actions",
         cell: ({ row }) => {
            const id = row.original.id;
            return (
               <div className="flex gap-2 justify-start">
                  <ActionButton
                     tooltip="Edit Group"
                     buttonClass="cursor-pointer bg-blue-500 text-white dark:bg-blue-800 dark:text-blue-200 hover:bg-blue-600 dark:hover:bg-blue-700 border-blue-400 dark:border-blue-700 transition"
                     icon={<Pencil className="h-4 w-4" />}
                     // onClick={() => handleEdit(id)}
                     // disabled={disable}
                  />
               </div>
            );
         },
      },
   ];

   useEffect(() => {
      fetchProjects();
   }, [fetchProjects]);
   return (
      <Card>
         <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
               Manage all the projects within your organization.
            </CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col gap-6">
            <div className="flex justify-end">
               <Button
                  onClick={() =>
                     onOpen("addProject", { onSuccess: fetchProjects })
                  }
               >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Project
               </Button>
            </div>
            {isLoading ? (
               <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-300 p-10 dark:border-slate-700">
                  <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
               </div>
            ) : (
               <DataTable
                  columns={columns}
                  data={projects}
                  showPagination={true}
               />
            )}
         </CardContent>
      </Card>
   );
};
