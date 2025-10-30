import { z } from "zod";

export const userAuthSchema = z.object({
   username: z.string().min(1, "Username is Required"),
   password: z.string().min(1, "Password is Requried"),
});
export type AuthSchemaType = z.infer<typeof userAuthSchema>;

export const AddUserSchema = z.object({
   projectId: z.string().optional(),
   projectTenantId: z.string().optional(),
   name: z.string().min(1, "Name is Required"),
   username: z.string().min(1, "Username is Required"),
   password: z.string().min(6, "Password is Required, min length 6"),
   role: z.string().min(1, "Role is Required"),
   actived: z.boolean().optional(),
});

export type AddUserSchemaType = z.infer<typeof AddUserSchema>;
