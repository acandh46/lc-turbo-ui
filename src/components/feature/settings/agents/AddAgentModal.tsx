"use client";
import ButtonLoading from "@/components/CustomUi/ButtonLoading";
import ImageUpload from "@/components/CustomUi/ImageUpload";
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
import SelectBox from "@/components/ui/SelectBox";
import { agentApi, projectApi } from "@/lib/api";
import { AddAgentSchema, AddAgentSchemaType } from "@/schemas/project.schema";
import { useModalStore } from "@/store/useModalStore";
import { TenantType } from "@/types/project.typs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddAgentModal = () => {
   const { isOpen, onClose, type, data } = useModalStore();
   const [tenants, setTenants] = useState<TenantType[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const isModalOpen = isOpen && type === "addAgent";

   const form = useForm<AddAgentSchemaType>({
      resolver: zodResolver(AddAgentSchema),
      defaultValues: {
         agentName: "",
         tenantId: "",
         avatar: "",
      },
   });

   const fetchTenant = useCallback(async () => {
      try {
         const response = await projectApi.getAllTenant();
         setTenants(response.data);
      } catch (error) {
         toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right",
         });
      } finally {
      }
   }, []);

   const onSubmit = async (values: AddAgentSchemaType) => {
      try {
         setIsLoading(true);
         const response = await agentApi.createNewAgent(values);
         if (response.status) {
            toast.success(response.msg, { position: "top-right" });
            data.onSuccess?.();
            form.reset();
            onClose();
         } else {
            toast.error(response.msg, { position: "top-right" });
         }
      } catch (error) {
         toast.error(`Failed to create agent: ${error}`, {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (isModalOpen) {
         fetchTenant();
      }
   }, [isModalOpen]);

   const handleClose = () => {
      form.reset();
      onClose();
   };
   return (
      <Modal
         title="Add New Agent"
         description="Give your new agent a name to get started."
         isOpen={isModalOpen}
         onClose={handleClose}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="flex flex-row items-center">
                  <ImageUpload
                     onUploadComplete={(url: string) => {
                        form.setValue("avatar", url);
                     }}
                     shape="circle"
                     className="min-w-30"
                  />
                  <FormField
                     control={form.control}
                     name="agentName"
                     render={({ field }) => (
                        <FormItem className="ml-4 w-full">
                           <FormLabel>Agent Name</FormLabel>
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
               </div>
               <FormField
                  control={form.control}
                  name="tenantId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="flex items-center gap-2  dark:text-zinc-200">
                           Website
                        </FormLabel>
                        <FormControl>
                           <SelectBox
                              options={tenants.map((d) => ({
                                 value: String(d.id),
                                 label: d.name,
                              }))}
                              value={field.value ? field.value.toString() : ""}
                              onChange={(value) => {
                                 field.onChange(value);
                              }}
                              placeholder="Pilih Website"
                              className="focus-visible:ring-blue-200 focus:ring-transparent dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <ButtonLoading
                  loading={isLoading}
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700"
               >
                  {isLoading ? "Creating Agent..." : "Create Agent"}
               </ButtonLoading>
            </form>
         </Form>
      </Modal>
   );
};
