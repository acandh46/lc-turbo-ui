"use client";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import { useCallback, useEffect, useState } from "react";
import { TenantType } from "@/types/project.typs";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { DataTable } from "../../data-table/DataTable";
import ActionButton from "@/components/CustomUi/ActionButton";
import { toast } from "sonner";
import { projectApi } from "@/lib/api";

export const WebsiteSettingsTab = () => {
   const { onOpen } = useModalStore();
   const [tenants, setTenants] = useState<TenantType[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const columns: ColumnDef<TenantType>[] = [
      {
         accessorKey: "name",
         header: "Projects",
         cell: ({ row }) => (
            <span className="font-semibold text-blue-900 dark:text-blue-200">
               {row.original.project?.name?.toUpperCase() || "-"}
            </span>
         ),
      },
      {
         accessorKey: "tenant",
         header: "Tenant",
         cell: ({ row }) => (
            <span className="font-semibold text-blue-900 dark:text-blue-200">
               {row.original.name?.toUpperCase() || "-"}
            </span>
         ),
      },
      {
         accessorKey: "member",
         header: "Member",
         cell: ({ row }) => (
            <span className="font-semibold text-blue-900 dark:text-blue-200">
               {row.original.totalMember || 0}
            </span>
         ),
      },
      {
         accessorKey: "agent",
         header: "Agent",
         cell: ({ row }) => (
            <span className="font-semibold text-blue-900 dark:text-blue-200">
               {row.original.totalAgent || 0}
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

   const fetchTenant = useCallback(async () => {
      setIsLoading(true);
      try {
         const response = await projectApi.getAllTenant();
         setTenants(response.data);
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchTenant();
   }, [fetchTenant]);

   return (
      <Card>
         <CardHeader>
            <CardTitle>Website Tenant</CardTitle>
            <CardDescription>
               Manage all the tenant within your project.
            </CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col gap-6">
            <div className="flex justify-end">
               <Button
                  onClick={() =>
                     onOpen("addTenant", { onSuccess: fetchTenant })
                  }
               >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Tenant
               </Button>
            </div>
            {isLoading ? (
               <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-300 p-10 dark:border-slate-700">
                  <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
               </div>
            ) : (
               <DataTable
                  columns={columns}
                  data={tenants}
                  showPagination={true}
               />
            )}
         </CardContent>
      </Card>
   );
};
