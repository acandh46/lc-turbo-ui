"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
export type Project = {
   id: string;
   name: string;
   createdAt: string;
   status: "active" | "inactive" | "archived";
};

export const columns: ColumnDef<Project>[] = [
   {
      accessorKey: "name",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Project Name
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
   },
   {
      accessorKey: "status",
      header: "Status",
   },
   {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
         const date = new Date(row.getValue("createdAt"));
         return new Intl.DateTimeFormat("en-US").format(date);
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const project = row.original;
         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Open menu</span>
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                     onClick={() => navigator.clipboard.writeText(project.id)}
                  >
                     Copy project ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                     Delete
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   },
];
