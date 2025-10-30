"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useNavigationStore } from "@/store/useNavigationStore";

export const NavigationTracker = () => {
   const pathname = usePathname();
   const { setPreviousPath } = useNavigationStore();
   const previousPathnameRef = useRef(pathname);

   useEffect(() => {
      const previousPathname = previousPathnameRef.current;

      // We only update the store if the *previous* path was not a chat path.
      if (!previousPathname.startsWith("/chat")) {
         setPreviousPath(previousPathname);
      }

      // Update the ref to the new pathname for the next render.
      previousPathnameRef.current = pathname;
   }, [pathname, setPreviousPath]);

   return null; // This component does not render anything.
};
