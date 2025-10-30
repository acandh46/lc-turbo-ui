"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/store/useModalStore";

import { Modal } from "@/components/CustomUi/Modal";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ButtonLoading from "@/components/CustomUi/ButtonLoading";
import {
   addProjectSchema,
   AddProjectSchemaType,
} from "@/schemas/project.schema";
import { projectApi } from "@/lib/api";
import { toast } from "sonner";

export const AddProjectModal = () => {
   const { isOpen, onClose, type, data } = useModalStore();
   const [isLoading, setIsLoading] = useState(false);

   const isModalOpen = isOpen && type === "addProject";
   const form = useForm<AddProjectSchemaType>({
      resolver: zodResolver(addProjectSchema),
      defaultValues: {
         name: "",
      },
   });

   const onSubmit = async (values: AddProjectSchemaType) => {
      try {
         setIsLoading(true);
         const response = await projectApi.createProject(values);
         if (response.status) {
            toast.success(response.msg, {
               position: "top-right",
            });
            data.onSuccess?.();
            form.reset();
            onClose();
         } else {
            toast.error(response.msg, { position: "top-right" });
         }
      } catch (error) {
         console.error("Failed to create project", error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleClose = () => {
      form.reset();
      onClose();
   };

   return (
      <Modal
         title="Add New Project"
         description="Give your new project a name to get started."
         isOpen={isModalOpen}
         onClose={handleClose}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                           <Input
                              disabled={isLoading}
                              placeholder="e.g., 'Customer Support Widget'"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex justify-end gap-2">
                  <ButtonLoading
                     loading={isLoading}
                     type="submit"
                     className="bg-sky-600 hover:bg-sky-700"
                  >
                     Create Project
                  </ButtonLoading>
               </div>
            </form>
         </Form>
      </Modal>
   );
};
