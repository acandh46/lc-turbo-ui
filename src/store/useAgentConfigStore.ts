import { create } from "zustand";
import {
   AgentConfigData,
   AgentConfigType,
   AgentPreChatFormFieldType,
   WelcomeMessageCard,
   WelcomeMessageCardButton,
} from "@/types/agent.types";
import { produce } from "immer";

type ConfigTab = "welcome" | "apperance" | "pre-chat";

/**
 * Interface for the state of the agent configuration store.
 */
interface AgentConfigState {
   config: AgentConfigData | null;
   originalConfig: AgentConfigData | null; // Snapshot for dirty checking
   isDirty: boolean; // To track if there are unsaved changes
   activeTab: ConfigTab; // To sync active tab with the preview
}

/**
 * Interface for the actions that can be performed on the agent configuration state.
 */
interface AgentConfigActions {
   setConfig: (config: AgentConfigData) => void;
   updateAgentConfig: (newConfig: Partial<AgentConfigType>) => void;
   updateRootConfig: (
      newConfig: Partial<Omit<AgentConfigData, "agentConfig">>
   ) => void;
   updateSinglePreChatField: (
      fieldId: string,
      newFieldData: Partial<AgentPreChatFormFieldType>
   ) => void;
   updatePreChatFields: (fields: AgentPreChatFormFieldType[]) => void;
   removePreChatField: (fieldId: string) => void;
   // Actions for managing options within a field
   addPreChatFieldOption: (fieldId: string) => void;
   removePreChatFieldOption: (fieldId: string, optionIndex: number) => void;
   updatePreChatFieldOption: (
      fieldId: string,
      optionIndex: number,
      value: string
   ) => void;
   updateWelcomeMessageCard: (
      card: Partial<WelcomeMessageCard>,
      buttonIndex?: number,
      button?: Partial<WelcomeMessageCardButton>
   ) => void;
   setActiveTab: (tab: ConfigTab) => void;
   setAsSaved: () => void;
}

// Define the initial state for the store
const initialState: AgentConfigState = {
   config: null,
   originalConfig: null,
   isDirty: false,
   activeTab: "apperance",
};

// Helper function for deep comparison
const deepCompare = (obj1: any, obj2: any): boolean => {
   return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Zustand store for managing an agent's configuration for the configuration page.
 */
export const useAgentConfigStore = create<
   AgentConfigState & AgentConfigActions
>((set) => ({
   ...initialState,

   setConfig: (config) => {
      // Ensure a default widgetType is set if it's missing
      if (!config.agentConfig.widgetType) {
         config.agentConfig.widgetType = "BUBBLE";
      }
      set({
         config,
         originalConfig: JSON.parse(JSON.stringify(config)), // Deep copy for snapshot
         isDirty: false,
         activeTab: "apperance",
      });
   },

   setAsSaved: () =>
      set(
         produce((state: AgentConfigState) => {
            state.originalConfig = state.config;
            state.isDirty = false;
         })
      ),

   updateRootConfig: (newConfig) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               Object.assign(state.config, newConfig);
               state.isDirty = !deepCompare(state.config, state.originalConfig);
            }
         })
      ),

   updateAgentConfig: (newConfig) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               Object.assign(state.config.agentConfig, newConfig);
               state.isDirty = !deepCompare(state.config, state.originalConfig);
            }
         })
      ),
   updateWelcomeMessageCard: (card, buttonIndex, button) => {
      set(
         produce((state: AgentConfigState) => {
            if (state.config?.agentConfig.welcomeMessageCard) {
               if (buttonIndex !== undefined && button) {
                  Object.assign(
                     state.config.agentConfig.welcomeMessageCard.buttons[
                        buttonIndex
                     ],
                     button
                  );
               } else {
                  Object.assign(
                     state.config.agentConfig.welcomeMessageCard,
                     card
                  );
               }
               state.isDirty = !deepCompare(state.config, state.originalConfig);
            }
         })
      );
   },

   updateSinglePreChatField: (fieldId, newFieldData) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               const field = state.config.agentConfig.preChatFormField.find(
                  (f) => f.id === fieldId
               );
               if (field) {
                  Object.assign(field, newFieldData);
                  state.isDirty = !deepCompare(
                     state.config,
                     state.originalConfig
                  );
               }
            }
         })
      ),

   updatePreChatFields: (fields) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               state.config.agentConfig.preChatFormField = fields;
               state.isDirty = !deepCompare(state.config, state.originalConfig);
            }
         })
      ),

   removePreChatField: (fieldId) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               const newFields =
                  state.config.agentConfig.preChatFormField.filter(
                     (f) => f.id !== fieldId
                  );
               // Re-calculate order after removal
               state.config.agentConfig.preChatFormField = newFields.map(
                  (field, index) => ({
                     ...field,
                     order: index + 1,
                  })
               );
               state.isDirty = !deepCompare(state.config, state.originalConfig);
            }
         })
      ),

   addPreChatFieldOption: (fieldId) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               const field = state.config.agentConfig.preChatFormField.find(
                  (f) => f.id === fieldId
               );
               if (field && Array.isArray(field.options)) {
                  field.options.push("New Option");
                  state.isDirty = !deepCompare(
                     state.config,
                     state.originalConfig
                  );
               }
            }
         })
      ),

   removePreChatFieldOption: (fieldId, optionIndex) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               const field = state.config.agentConfig.preChatFormField.find(
                  (f) => f.id === fieldId
               );
               if (field && field.options?.[optionIndex] !== undefined) {
                  field.options.splice(optionIndex, 1);
                  state.isDirty = !deepCompare(
                     state.config,
                     state.originalConfig
                  );
               }
            }
         })
      ),

   updatePreChatFieldOption: (fieldId, optionIndex, value) =>
      set(
         produce((state: AgentConfigState) => {
            if (state.config) {
               const field = state.config.agentConfig.preChatFormField.find(
                  (f) => f.id === fieldId
               );
               if (field && field.options?.[optionIndex] !== undefined) {
                  field.options[optionIndex] = value;
                  state.isDirty = !deepCompare(
                     state.config,
                     state.originalConfig
                  );
               }
            }
         })
      ),

   setActiveTab: (tab) => set({ activeTab: tab }),
}));
