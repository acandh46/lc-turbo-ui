"use client";
import ButtonLoading from "@/components/CustomUi/ButtonLoading";
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
import {
   Select,
   SelectItem,
   SelectContent,
   SelectValue,
   SelectTrigger,
} from "@/components/ui/select";
import SelectBox from "@/components/ui/SelectBox";
import { projectApi, userApi } from "@/lib/api";
import { AddUserSchema, AddUserSchemaType } from "@/schemas/user.schema";
import { useModalStore } from "@/store/useModalStore";
import { ProjectType, TenantType } from "@/types/project.typs";
import { User } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Roles = [
   {
      label: "SUPERVISOR",
      value: "SUPERVISOR",
   },
   {
      label: "AGENT",
      value: "AGENT",
   },
   {
      label: "AUDIT",
      value: "AUDIT",
   },
];

export const AddMemberModal = () => {
   const { isOpen, onClose, type, data } = useModalStore();
   const [isLoading, setIsLoading] = useState(false);
   const [projects, setProjects] = useState<ProjectType[]>([]);
   const [tenants, setTenants] = useState<TenantType[]>([]);
   const user = data.user as User;
   const memberEdit = data.member as User;

   const isModalOpen = isOpen && type === "addMember";
   const isEditMode = !!memberEdit;

   const editSchema = AddUserSchema.extend({
      password: z
         .string()
         .min(6, "Password must be at least 6 characters")
         .optional()
         .or(z.literal("")),
   });

   let schema = isEditMode ? editSchema : AddUserSchema;

   if (user?.role === "SUPERVISOR") {
      schema = schema.refine(
         (data) => {
            if (!data.projectTenantId) {
               return false;
            }
            return true;
         },
         {
            message: "Web is Required for SUPERVISOR",
            path: ["projectTenantId"],
         }
      );
   }

   const form = useForm<AddUserSchemaType>({
      resolver: zodResolver(schema as any),
      defaultValues: {
         projectId: "",
         projectTenantId: "",
         username: "",
         name: "",
         password: "",
         role: "",
         actived: true,
      },
   });

   useEffect(() => {
      if (isEditMode) {
         form.setValue("name", memberEdit.name);
         form.setValue("username", memberEdit.username);
         form.setValue("role", memberEdit.role);
         form.setValue("projectId", memberEdit.superVisorProject?.id);
         form.setValue("projectTenantId", memberEdit.memberProjectTenant?.id);
      }
   }, [isEditMode, memberEdit, form]);
   useEffect(() => {
      const fetchProject = async () => {
         const response = await projectApi.getProject();
         setProjects(response.data);
      };

      const fetchTenant = async () => {
         const response = await projectApi.getAllTenant();
         setTenants(response.data);
      };

      if (isModalOpen) {
         if (user.role === "ADMIN") {
            fetchProject();
         } else {
            fetchTenant();
         }
      }
   }, [isModalOpen, user]);

   const handleClose = () => {
      form.reset();
      onClose();
   };
   const onSubmit = async (value: AddUserSchemaType) => {
      setIsLoading(true);
      try {
         if (isEditMode) {
            const response = await userApi.updateUser(memberEdit.id, value);
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
         } else {
            const response = await userApi.createUser(value);
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
         }
      } catch (error) {
         toast.error(`Failed to create Tenant: ${error}`, {
            position: "top-right",
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <Modal
         title={memberEdit ? "Edit Member" : "Add New Member"}
         description="Give you member detail"
         isOpen={isModalOpen}
         onClose={handleClose}
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <div className="flex flex-row  w-full gap-2">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 autoFocus
                                 disabled={isLoading}
                                 placeholder="e.g., 'Name User'"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="username"
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Usename</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={isLoading || isEditMode}
                                 placeholder="e.g., 'Username'"
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
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                           <Input
                              disabled={isLoading}
                              className="focus:ring-transparent"
                              placeholder="e.g., 'Password User'"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="flex items-center gap-2  dark:text-zinc-200">
                           Role
                        </FormLabel>
                        <FormControl>
                           <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={isLoading}
                           >
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Roles" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="Select Roles" disabled>
                                    Select Roles
                                 </SelectItem>
                                 {Roles.map((role) => (
                                    <SelectItem
                                       key={role.value}
                                       value={role.value}
                                    >
                                       {role.label}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               {isModalOpen && user.role === "ADMIN" && (
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
                                    label: d.name.toUpperCase(),
                                 }))}
                                 value={
                                    field.value ? field.value.toString() : ""
                                 }
                                 onChange={(value) => {
                                    field.onChange(value);
                                 }}
                                 disabled={isLoading}
                                 placeholder="Pilih Project"
                                 className=" focus:ring-transparent dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               )}

               {isModalOpen && user.role === "SUPERVISOR" && (
                  <FormField
                     control={form.control}
                     name="projectTenantId"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="flex items-center gap-2  dark:text-zinc-200">
                              Web
                           </FormLabel>
                           <FormControl>
                              <SelectBox
                                 options={tenants.map((d) => ({
                                    value: String(d.id),
                                    label: d.name.toUpperCase(),
                                 }))}
                                 value={
                                    field.value ? field.value.toString() : ""
                                 }
                                 onChange={(value) => {
                                    field.onChange(value);
                                 }}
                                 disabled={isLoading}
                                 placeholder="Pilih Website"
                                 className=" focus:ring-transparent dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               )}
               <div className="flex justify-end gap-2">
                  <ButtonLoading
                     loading={isLoading}
                     type="submit"
                     className="bg-sky-600 hover:bg-sky-700"
                  >
                     {isLoading
                        ? memberEdit
                           ? "Updating user..."
                           : "Creating user..."
                        : memberEdit
                        ? "Update"
                        : "Create"}
                  </ButtonLoading>
               </div>
            </form>
         </Form>
      </Modal>
   );
};

export default AddMemberModal;
