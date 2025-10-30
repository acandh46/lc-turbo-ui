export interface ProjectType {
   id: string;
   name: string;
   web?: number;
}
export interface ProjectRResponse {
   status: boolean;
   msg: string;
   data: ProjectType[];
}

export interface TenantType {
   id: string;
   name: string;
   project?: ProjectType;
   totalAgent: number;
   totalMember: number;
}

export interface TenantResponse {
   status: boolean;
   msg: string;
   data: TenantType[];
}
