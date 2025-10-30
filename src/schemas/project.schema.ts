import { z } from "zod";

export const addProjectSchema = z.object({
   id: z.string().optional(),
   name: z
      .string()
      .min(3, { message: "Project name must be at least 3 characters long." }),
});

export type AddProjectSchemaType = z.infer<typeof addProjectSchema>;

export const AddTenantSchema = z.object({
   projectId: z.string().min(1, "Project is Required"),
   name_tenant: z.string().min(1, "Name Tenant is Required"),
});

export type AddTenantSchemaType = z.infer<typeof AddTenantSchema>;

export const AddAgentSchema = z.object({
   tenantId: z.string().min(1, "Website is Required"),
   agentName: z.string().min(1, "Agent Name is Required"),
   avatar: z.string().min(1, "Avatar is Required"),
});

export type AddAgentSchemaType = z.infer<typeof AddAgentSchema>;
