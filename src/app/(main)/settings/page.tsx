"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useNavigationStore } from "@/store/useNavigationStore";
import { settingNavItem } from "./layout";

const SettingsPage = () => {
   const router = useRouter();
   const pathName = usePathname();
   const { previousPath, setPreviousPath } = useNavigationStore();
   console.log(previousPath);
   useEffect(() => {
      const filtersPath = pathName.split("/").filter(Boolean);
      if (previousPath) {
         router.replace(previousPath);
      } else if (filtersPath.length === 1) {
         const newRoute = settingNavItem[0]?.href ?? "/settings/chat-page";
         setPreviousPath(newRoute);
         router.replace(newRoute);
      } else {
         router.replace(previousPath);
      }
   }, [pathName, router, previousPath]);

   return (
      <div className="flex   w-full items-center justify-center">
         <p className="text-slate-500">Select a setting to configure.</p>
      </div>
   );
};

export default SettingsPage;
