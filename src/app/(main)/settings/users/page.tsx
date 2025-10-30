"use client";
import ActionButton from "@/components/CustomUi/ActionButton";
import { DataTable } from "@/components/feature/data-table/DataTable";
import HeaderContent from "@/components/layout/HeaderContent";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { userApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { User } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserPage() {
   const { onOpen } = useModalStore();
   const [isLoading, setIsLoading] = useState(false);
   const [users, setUsers] = useState<User[]>([]);
   const [search, setSearch] = useState("");
   const { user } = useAuth();

   const fetchUsers = useCallback(async () => {
      setIsLoading(true);
      try {
         const response = await userApi.getUsers();
         setUsers(response.data!);
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   }, []);
   const columns: ColumnDef<User>[] = (() => {
      const baseColumns: ColumnDef<User>[] = [
         {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
               <span className="font-semibold text-blue-900 dark:text-blue-200">
                  {row.original.name?.toUpperCase() || "-"}
               </span>
            ),
         },
         {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => (
               <span className="font-semibold text-blue-900 dark:text-blue-200">
                  {row.original.role?.toUpperCase() || "-"}
               </span>
            ),
         },
         {
            accessorKey: "tenant",
            header: "Web",
            cell: ({ row }) => (
               <span className="font-semibold text-blue-900 dark:text-blue-200">
                  {row.original.memberProjectTenant?.nameTenant?.toUpperCase() ||
                     "-"}
               </span>
            ),
         },
      ];

      if (user?.role === "ADMIN") {
         baseColumns.push({
            accessorKey: "project",
            header: "Project",
            cell: ({ row }) => (
               <span className="font-semibold text-blue-900 dark:text-blue-200">
                  {row.original.role === "SUPERVISOR"
                     ? row.original.superVisorProject?.name?.toUpperCase() ||
                       "-"
                     : row.original.role === "AGENT" ||
                       row.original.role === "AUDIT"
                     ? row.original.memberProjectTenant?.project?.name?.toUpperCase() ||
                       "-"
                     : "-"}
               </span>
            ),
         });
      }

      baseColumns.push(
         {
            accessorKey: "createdAt",
            header: "CreatedAt",
            cell: ({ row }) => (
               <span className="text-gray-500 dark:text-gray-400">
                  {formatDate(row.original.createdAt)}
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
                        tooltip="Edit User"
                        positionTooltip="right"
                        buttonClass="cursor-pointer bg-blue-500 text-white dark:bg-blue-800 dark:text-blue-200 hover:bg-blue-600 dark:hover:bg-blue-700 border-blue-400 dark:border-blue-700 transition"
                        icon={<Pencil className="h-4 w-4" />}
                        onClick={() =>
                           onOpen("addMember", {
                              onSuccess: fetchUsers,
                              user: user,
                              member: row.original,
                           })
                        }
                        // onClick={() => handleEdit(id)}
                        // disabled={disable}
                     />
                  </div>
               );
            },
         }
      );
      return baseColumns;
   })();
   // const columns: ColumnDef<User>[] = [

   // ];

   useEffect(() => {
      fetchUsers();
   }, [fetchUsers]);

   return (
      <div className="flex flex-1 flex-col bg-slate-50 rounded-2xl overflow-hidden">
         <HeaderContent title="Users" />
         <div className="flex-col p-5">
            <div className="flex flex-row mb-2 justify-between">
               <Button
                  className="cursor-pointer"
                  onClick={() =>
                     onOpen("addMember", {
                        onSuccess: fetchUsers,
                        user: user,
                     })
                  }
               >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Add Member
               </Button>
            </div>
            {isLoading ? (
               <div className="flex items-center justify-center rounded-lg border border-dashed border-slate-300 p-10 dark:border-slate-700">
                  <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
               </div>
            ) : (
               <DataTable
                  columns={columns}
                  data={users}
                  showPagination={true}
               />
            )}
         </div>
      </div>
   );
}
