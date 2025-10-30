"use client";
import { cn } from "@/lib/utils";
import { NavItemPage, UserRole } from "@/types/user.type";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../providers/AuthProvider";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useNavigationStore } from "@/store/useNavigationStore";

// Helper function to check permissions
const hasPermission = (item: NavItemPage, userRole: UserRole | string) => {
   return item.prem.includes("*") || item.prem.includes(userRole);
};

// Recursive component to render navigation items
const SubmenuItem = ({
   item,
   userRole,
}: {
   item: NavItemPage;
   userRole: UserRole | string;
}) => {
   const router = useRouter();
   const pathname = usePathname();
   const { setPreviousPath } = useNavigationStore();
   const [isOpen, setIsOpen] = useState(false);

   // Filter children based on role before determining if there are any
   const visibleChildren = useMemo(
      () =>
         item.children?.filter((child) => hasPermission(child, userRole)) || [],
      [item.children, userRole]
   );
   const hasChildren = visibleChildren.length > 0;
   const isActive = pathname === item.href;

   const handleClick = () => {
      if (hasChildren) {
         setIsOpen(!isOpen);
      } else if (item.href) {
         router.push(item.href);
         setPreviousPath(item.href);
      }
   };

   return (
      <div className={cn("w-full", hasChildren ? "mb-1" : "")}>
         <Button
            variant={isActive ? "secondary" : "ghost"}
            onClick={handleClick}
            className={cn(
               "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
               "border-none shadow-none",
               isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 hover:text-black dark:hover:bg-slate-800 dark:hover:text-white",
               hasChildren && "group"
            )}
            style={{
               boxShadow: isActive
                  ? "0 2px 8px 0 rgba(20, 194, 224, 0.08)"
                  : undefined,
            }}
         >
            <span className="flex items-center gap-2">
               {/* If you ever want to add icon left of the title, do it here */}
               {item.title}
            </span>
            {hasChildren ? (
               <ChevronRight
                  className={cn(
                     "h-4 w-4 ml-2 transition-transform duration-200",
                     isOpen && "rotate-90",
                     "text-gray-400 dark:text-gray-400 group-hover:text-blue-500"
                  )}
               />
            ) : null}
         </Button>
         {/* Children */}
         {hasChildren && (
            <div
               className={cn(
                  "overflow-hidden transition-all duration-200 ml-4  border-gray-100 dark:border-slate-700",
                  isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
               )}
               style={{
                  transitionProperty: "max-height, opacity, margin-top",
               }}
            >
               <div className="flex flex-col space-y-1 py-1">
                  {visibleChildren.map((child) => (
                     <SubmenuItem
                        key={child.title}
                        item={child}
                        userRole={userRole}
                     />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

interface PageLayoutWrapperProps {
   title: string;
   children: React.ReactNode;
   navItems?: NavItemPage[];
   showSubMenu?: boolean;
   handleShowSubMenu?: () => void;
   isLoading?: boolean;
}

export default function PageLayoutWrapper({
   children,
   navItems,
   title,
}: PageLayoutWrapperProps) {
   const { user } = useAuth();
   const userRole = user?.role || "";
   const { isSubMenuOpen } = useNavigationStore();

   // Memoize the filtered nav items to prevent re-calculation on every render
   const filteredNavItems = useMemo(() => {
      if (!navItems) return [];
      return navItems.filter((item) => hasPermission(item, userRole));
   }, [navItems, userRole]);

   return (
      <div className="flex flex-1 h-screen">
         {filteredNavItems.length > 0 && (
            <div
               className={cn(
                  "flex-shrink-0 flex flex-col  overflow-hidden  dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 ease-in-out overflow-y-auto",
                  isSubMenuOpen ? "w-64 p-4" : "w-0 p-0"
               )}
            >
               <h4 className="text-xl pl-2 font-semibold py-6 text-white">
                  {title}
               </h4>
               <div className="flex flex-col space-y-1">
                  {filteredNavItems.map((item) => (
                     <SubmenuItem
                        key={item.title}
                        item={item}
                        userRole={userRole}
                     />
                  ))}
               </div>
            </div>
         )}
         <div className="flex flex-1 pt-8 pb-1">{children}</div>
         {/* <div className="flex flex-1 overflow-hidden py-2">
            <div className="px-6 w-full bg-slate-50 rounded-2xl overflow-auto">
               {children}
            </div>
         </div> */}
      </div>
      //   <div className="flex h-[calc(100vh-4px)] flex-1 pb-2">
      //      {/* Submenu */}
      //      {filteredNavItems.length > 0 && (
      //         <div
      //            className={cn(
      //               "flex-shrink-0 flex flex-col  dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 ease-in-out overflow-y-auto",
      //               showSubMenu ? "w-64 p-4" : "w-0 p-0"
      //            )}
      //         >
      //            <h4 className="text-xl pl-2 font-semibold py-6 text-white">
      //               {title}
      //            </h4>
      //            <div className="flex flex-col space-y-1">
      //               {filteredNavItems.map((item) => (
      //                  <SubmenuItem
      //                     key={item.title}
      //                     item={item}
      //                     userRole={userRole}
      //                  />
      //               ))}
      //            </div>
      //         </div>
      //      )}

      //      {/* Main Content */}
      //      <div className="flex flex-1 flex-col overflow-hidden ">
      //         <div className="p-6 w-full bg-slate-50 rounded-2xl dark:bg-slate-950 flex-1">
      //            <div className="flex items-center mb-4 gap-2">
      //               {handleShowSubMenu && (
      //                  <Button
      //                     variant="ghost"
      //                     size="icon"
      //                     onClick={handleShowSubMenu}
      //                  >
      //                     {showSubMenu ? (
      //                        <PanelLeftClose className="h-5 w-5" />
      //                     ) : (
      //                        <PanelLeftOpen className="h-5 w-5" />
      //                     )}
      //                  </Button>
      //               )}
      //               <h2 className="text-lg font-semibold">{title}</h2>
      //            </div>
      //            <div className="h-screen p-2  overflow-auto  dark:border-slate-800 dark:bg-slate-900">
      //               {isLoading ? DefaultLoadingComponent : children}
      //            </div>
      //         </div>
      //      </div>
      //   </div>
   );
}
