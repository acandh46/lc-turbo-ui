import { create } from "zustand";

export type ModalType =
   | "testModal"
   | "addProject"
   | "addMember"
   | "addTenant"
   | "addAgent"
   | "selectAgent"
   | "profile"
   | "cannedResponse"
   | "unsavedChanges"; // Add other modal types here

interface ModalData {
   onSuccess?: () => void;
   onConfirm?: () => void; // For confirmation dialogs
   [key: string]: unknown;
}

interface ModalStore {
   type: ModalType | null;
   data: ModalData;
   isOpen: boolean;
   onOpen: (type: ModalType, data?: ModalData) => void;
   onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
   type: null,
   data: {},
   isOpen: false,
   onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
   onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
