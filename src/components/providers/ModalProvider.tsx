"use client";

import { SelectAgentModal } from "@/components/modal/SelectAgentModal";
import { useEffect, useState } from "react";
import { UnsavedChangesModal } from "../modal/UnsavedChangesModal";
import { AddProjectModal } from "../feature/settings/project/AddProjectModal";
import AddMemberModal from "../feature/settings/users/AddMemberModal";
import AddTenantModal from "../feature/settings/project/AddTenantModal";
import { AddAgentModal } from "../feature/settings/agents/AddAgentModal";
import { ModalCannedResponse } from "../canned-response/ModalCannedResponse";

export const ModalProvider = () => {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }
   return (
      <>
         <AddProjectModal />
         <AddMemberModal />
         <AddTenantModal />
         <AddAgentModal />
         <UnsavedChangesModal />
         <SelectAgentModal />
         <ModalCannedResponse />
      </>
   );
};
