"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, Loader2 } from "lucide-react";

interface NavItem {
   title: string;
   href: string;
}

interface PageWrapperProps {
   navItems: NavItem[];
   children: React.ReactNode;
   hideToggle?: boolean;
   hideSubMenu?: boolean;
   isLoading?: boolean;
   loadingComponent?: React.ReactNode;
}

export const PageWrapper = ({
   navItems,
   children,
   hideToggle = false,
   hideSubMenu = false,
   isLoading = false,
   loadingComponent,
}: PageWrapperProps) => {
   const pathname = usePathname();
   const [isSubMenuVisible, setIsSubMenuVisible] = useState(!hideSubMenu);

   const DefaultLoadingComponent = (
      <div className="flex h-full w-full items-center justify-center">
         <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
   );

   return (
      <div className="flex h-screen flex-1">
         {/* Sub Menu Navigation (Collapsible & Animated) */}
         {!hideSubMenu && (
            <aside
               className={cn(
                  "flex-shrink-0 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out overflow-hidden",
                  isSubMenuVisible ? "w-64" : "w-0"
               )}
            >
               <div className="w-64 p-6">
                  <nav className="flex flex-col space-y-1">
                     {navItems.map((item) => (
                        <Link
                           key={item.href}
                           href={item.href}
                           className={cn(
                              "rounded-md px-3 py-2 text-sm font-medium",
                              pathname === item.href
                                 ? "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                                 : "text-slate-600 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50"
                           )}
                        >
                           {item.title}
                        </Link>
                     ))}
                  </nav>
               </div>
            </aside>
         )}

         {/* Main Content */}
         <div className="flex-1 p-6 lg:p-8">
            {!hideToggle && !hideSubMenu && (
               <Button
                  variant="outline"
                  size="icon"
                  className="mb-4"
                  onClick={() => setIsSubMenuVisible(!isSubMenuVisible)}
               >
                  {isSubMenuVisible ? (
                     <PanelLeftClose className="h-4 w-4" />
                  ) : (
                     <PanelLeftOpen className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle Submenu</span>
               </Button>
            )}
            <div className="h-full">
               {isLoading
                  ? loadingComponent || DefaultLoadingComponent
                  : children}
            </div>
         </div>
      </div>
   );
};
