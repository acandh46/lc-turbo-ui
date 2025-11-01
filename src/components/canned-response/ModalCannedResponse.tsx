"use client";

import { useModalStore } from "@/store/useModalStore";
import { AgentCannedResponse } from "@/types/agent.types";
import { Modal } from "../CustomUi/Modal";
import { useForm } from "react-hook-form";
import { AddCannedSchema, AddCannedSchemaType } from "@/schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import ButtonLoading from "../CustomUi/ButtonLoading";
import { Input } from "../ui/input";
import { MarkdownEditor } from "../feature/MarkdownEditor";
import { Switch } from "../ui/switch";
import { Hash } from "lucide-react";
import { toast } from "sonner";
import { agentApi } from "@/lib/api";

export const ModalCannedResponse = () => {
   const { isOpen, onClose, type, data } = useModalStore();
   const [isLoading, setIsLoading] = useState(false);
   const cannedEdit = data.canned as AgentCannedResponse;
   const isModalOpen = isOpen && type === "cannedResponse";
   const agentId = data.agentId as string;

   const form = useForm<AddCannedSchemaType>({
      resolver: zodResolver(AddCannedSchema),
      defaultValues: {
         agentId: "",
         id: "",
         shortcut: "",
         content: "",
         actived: true,
      },
   });

   useEffect(() => {
      if (cannedEdit) {
         form.setValue("id", cannedEdit.id);
         form.setValue("shortcut", cannedEdit.shortcut);
         form.setValue("content", cannedEdit.content);
         form.setValue("actived", cannedEdit.actived);
      }
   }, [cannedEdit]);

   useEffect(() => {
      if (isModalOpen) {
         form.setValue("agentId", agentId);
      }
   }, [isModalOpen]);

   const handleClose = () => {
      form.reset();
      onClose();
   };

   const onSubmit = async (value: AddCannedSchemaType) => {
      setIsLoading(true);
      try {
         let payload = {
            ...value,
            isChange: cannedEdit === undefined ? false : true,
         };
         const response = await agentApi.changeCanned(payload);
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

   return (
      <Modal
         title={cannedEdit ? "Edit Canned Response" : "Create Canned Response"}
         description="Give you Canned Response Detail"
         isOpen={isModalOpen}
         onClose={handleClose}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
                  control={form.control}
                  name="shortcut"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Shortcut</FormLabel>
                        <FormControl>
                           <div className="relative flex items-center">
                              <span className="absolute left-3 text-white pointer-events-none">
                                 {/* Lucide-React Search Icon */}
                                 <Hash className="w-4 h-4" />
                              </span>
                              <Input
                                 autoFocus
                                 disabled={isLoading}
                                 placeholder="e.g., 'hello'"
                                 className={`pl-9 py-1.5 border focus:border-0 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300`}
                                 {...field}
                              />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Response Text</FormLabel>
                        <FormControl>
                           <MarkdownEditor
                              variant="long"
                              content={field.value}
                              onChange={(newContent) => {
                                 field.onChange(newContent);
                              }}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="actived"
                  render={({ field }) => (
                     <FormItem className="w-full flex items-center space-x-2">
                        <Switch
                           checked={field.value}
                           onCheckedChange={(isEnabled) => {
                              field.onChange(isEnabled);
                           }}
                        />
                        <FormLabel>
                           {field.value ? "Actived" : "Disabled"}
                        </FormLabel>
                     </FormItem>
                  )}
               />

               <ButtonLoading
                  loading={isLoading}
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700"
               >
                  {isLoading ? "Saving..." : "Save"}
               </ButtonLoading>
            </form>
         </Form>
      </Modal>
   );
};
