import Axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import { ProjectRResponse, TenantResponse } from "@/types/project.typs";
import {
   AddAgentSchemaType,
   AddProjectSchemaType,
   AddTenantSchemaType,
} from "@/schemas/project.schema";
import { UserResponse } from "@/types/user.type";
import { AddUserSchemaType } from "@/schemas/user.schema";
import { AgentConfigResponse, AgentResponse } from "@/types/agent.types";

export const api = Axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: { "Content-Type": "application/json" },
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
   (config) => {
      const { access_token } = useAuthStore.getState();
      if (access_token) {
         config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

api.interceptors.response.use(
   (res) => res,
   (err) => {
      if (err.response?.status === 401) {
         Cookies.remove("token");
         useAuthStore.getState().logout(); // Use logout from store
         window.location.href = "/auth/login";
      }
      return Promise.reject(err);
   }
);

export default api;

export const projectApi = {
   getProject: async (): Promise<ProjectRResponse> => {
      const response = await api.get("/project/list");
      return response.data;
   },
   createProject: async (
      data: AddProjectSchemaType
   ): Promise<ProjectRResponse> => {
      const response = await api.post("/project/create", { name: data.name });
      return response.data;
   },

   createTenant: async (data: AddTenantSchemaType): Promise<TenantResponse> => {
      const response = await api.post("/project/tenant", data);
      return response.data;
   },
   getAllTenant: async (): Promise<TenantResponse> => {
      const response = await api.get("/project/tenants");
      return response.data;
   },
};

export const agentApi = {
   createNewAgent: async (data: AddAgentSchemaType): Promise<AgentResponse> => {
      const response = await api.post("/agent/create", data);
      return response.data;
   },
   getAgents: async (): Promise<AgentResponse> => {
      const repsonse = await api.get("/agent/list_agent");
      return repsonse.data;
   },
   getConfigAgent: async (agentId: string): Promise<AgentConfigResponse> => {
      const response = await api.get(`/agent/config/${agentId}`);
      return response.data;
   },

   saveConfig: async (
      agentId: string,
      data: any
   ): Promise<AgentConfigResponse> => {
      let payload = {
         agentName: data.agentName,
         ...data.agentConfig,
      };
      const response = await api.post(`/agent/config/${agentId}`, payload);
      return response.data;
   },

   getCanned: async (agentId: string) => {
      const response = await api.get(`/agent/canned/${agentId}`);
      return response.data;
   },

   changeCanned: async (data: any): Promise<AgentResponse> => {
      const response = await api.post("/agent/canned", data);
      return response.data;
   },
};

export const userApi = {
   getUsers: async (): Promise<UserResponse> => {
      const response = await api.get("/user/user_list");
      return response.data;
   },

   createUser: async (data: AddUserSchemaType): Promise<UserResponse> => {
      const response = await api.post("/user/create", data);
      return response.data;
   },
   updateUser: async (
      id: string,
      data: AddUserSchemaType
   ): Promise<UserResponse> => {
      const response = await api.put(`/user/update/${id}`, data);
      return response.data;
   },
};

export const chatApi = {};
