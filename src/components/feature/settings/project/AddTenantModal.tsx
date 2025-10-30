"use client";
import ButtonLoading from "@/components/CustomUi/ButtonLoading";
import { Modal } from "@/components/CustomUi/Modal";
import {
   Form,
   FormMessage,
   FormLabel,
   FormItem,
   FormControl,
   FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectBox from "@/components/ui/SelectBox";
import { projectApi } from "@/lib/api";
import { AddTenantSchema, AddTenantSchemaType } from "@/schemas/project.schema";
import { useModalStore } from "@/store/useModalStore";
import { ProjectType } from "@/types/project.typs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddTenantModal = () => {
   const { isOpen, onClose, type, data } = useModalStore();
   const [projects, setProjects] = useState<ProjectType[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const isModalOpen = isOpen && type === "addTenant";

   const form = useForm<AddTenantSchemaType>({
      resolver: zodResolver(AddTenantSchema),
      defaultValues: {
         projectId: "",
         name_tenant: "",
      },
   });

   const onSubmit = async (values: AddTenantSchemaType) => {
      setIsLoading(true);
      try {
         const response = await projectApi.createTenant(values);
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
         toast.error(`Failed to create Tenant: ${error}`, {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   };

   const handleClose = () => {
      form.reset();
      onClose();
   };

   useEffect(() => {
      const fetchProject = async () => {
         const response = await projectApi.getProject();
         setProjects(response.data);
      };
      if (isModalOpen) {
         fetchProject();
      }
   }, [isModalOpen]);

   return (
      <Modal
         title="Add New Tenant"
         description="Give your new tenant a name to get started."
         isOpen={isModalOpen}
         onClose={handleClose}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                  control={form.control}
                  name="name_tenant"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Tenant Name</FormLabel>
                        <FormControl>
                           <Input
                              disabled={isLoading}
                              placeholder="e.g., 'Tenant or website name"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="flex items-center gap-2  dark:text-zinc-200">
                           Project
                        </FormLabel>
                        <FormControl>
                           <SelectBox
                              options={projects.map((d) => ({
                                 value: String(d.id),
                                 label: d.name,
                              }))}
                              value={field.value ? field.value.toString() : ""}
                              onChange={(value) => {
                                 field.onChange(value);
                              }}
                              placeholder="Pilih Project"
                              className="focus-visible:ring-blue-200 focus:ring-transparent dark:bg-slate-900 dark:border-slate-700 dark:text-white"
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
                     {isLoading ? "Creating Teanant..." : "Create Tenant"}
                  </ButtonLoading>
               </div>
            </form>
         </Form>
      </Modal>
   );
};

export default AddTenantModal;
