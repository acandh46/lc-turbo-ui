export type UserRole = "AGENT" | "SUPERVISOR" | "ADMIN" | "AUDIT";
export type User = {
   id: string;
   username: string;
   name: string;
   email: string;
   role: string;
   avatar?: string;
   tenantId?: string;
   memberProjectTenant: {
      id: string;
      nameTenant: string;
      project: {
         name: string;
      } | null;
   } | null;
   superVisorProject: {
      id: string;
      name: string;
   } | null;
   createdAt: string;
};

export interface UserResponse {
   status: boolean;
   msg: string;
   data?: User[];
}

export type NavItemPage = {
   title: string;
   href: string | null;
   prem: string[];
   hasSideComp?: boolean;
   children?: NavItemPage[];
};
