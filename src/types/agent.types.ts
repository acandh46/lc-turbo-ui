export interface AgentResponse {
   status: boolean;
   msg: string;
   data: AgentItem[];
}

export interface AgentItem {
   id: string;
   agentName: string;
   avatar: string;
   publicKey: string;
   tenant: string;
   actived: boolean;
}

export interface AgentConfigResponse {
   status: boolean;
   msg: string;
   data: AgentConfigData;
}

export interface AgentConfigData {
   actived: boolean;
   agentName: string;
   publicKey: string;
   projectTenant: {
      nameTenant: string;
   } | null;
   agentConfig: AgentConfigType;
}

export interface AgentConfigType {
   id: string;
   avatarImage: string;
   showAvatarButton: boolean;
   bannerImage: string | null;

   welcomeMessage: string;
   welcomeMessageType: "text" | "card";
   welcomeMessageCard: WelcomeMessageCard | null;

   customerInqueueMessage: string;
   defaultCustomerName: string;
   messagePlaceholder: string;
   offlineMessage: string;
   preChatFormEnabled: boolean;
   barButtonText: string | "Chat Sekarang";

   preChatFormField: AgentPreChatFormFieldType[];
   theme: string;
   themeColor: string;

   showBanner: boolean;
   bannerPostionX: number;
   bannerPostionY: number;

   widgetColorPrimary: string | null;
   widgetColorSecondary: string | null;
   widgetPosition: string;
   widgetSideSpacing: number;
   widgetBottomSpacing: number;
   widgetType: string;
}

export interface WelcomeMessageCardButton {
   text: string;
   url: string;
}

export interface WelcomeMessageCard {
   imageUrl: string;
   showImage: boolean;
   text: string;
   buttons: WelcomeMessageCardButton[];
}

export interface AgentPreChatFormFieldType {
   id: string;
   defaultValue: string | null;
   label: string;
   options: string[];
   order: number;
   placeholder: string | null;
   required: boolean;
   type: string;
}

export interface CannedResponseType {
   id: string;
   actived: boolean;
   hashcod: string;
   shortcut: string;
   content: string;
}
