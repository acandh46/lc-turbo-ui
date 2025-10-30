"use client";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigationStore } from "@/store/useNavigationStore";

interface HeaderContentProps {
   title: string;
   showToggleMenu?: boolean;
   subAction?: React.ReactNode;
}
export default function HeaderContent({
   title,
   showToggleMenu = true,
   subAction,
}: HeaderContentProps) {
   const { isSubMenuOpen, setIsSubMenuOpen } = useNavigationStore();
   const handleShowSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
   return (
      <div className="p-3 flex flex-row justify-between">
         <div className="gap-2 flex items-center shadow-xs">
            {showToggleMenu && (
               <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  onClick={handleShowSubMenu}
               >
                  {isSubMenuOpen ? (
                     <PanelLeftClose className="h-5 w-5" />
                  ) : (
                     <PanelLeftOpen className="h-5 w-5" />
                  )}
               </Button>
            )}
            <h2 className="text-lg font-semibold text-black">{title}</h2>
         </div>
         {subAction}
      </div>
   );
}
