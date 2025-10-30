"use client";
import { useState } from "react";
import Image from "next/image";
import { Settings } from "lucide-react";
import { SwitchAgent } from "./SwitchAgent";
import { UserMenu } from "./UserMenu";
import ActionButton from "../CustomUi/ActionButton";
import * as Icons from "lucide-react";
import { ThemeToggle } from "../CustomUi/ThemeToggle";
const nav = [
   {
      label: "Chat",
      href: "/chat",
      icon: Icons.MessagesSquare,
   },
   // {
   //    label: "Engage",
   //    href: "/engage",
   //    icon: Icons.MousePointerClickIcon,
   // },
   {
      label: "Automate",
      href: "/automate",
      icon: Icons.ZapIcon,
   },
   {
      label: "Archive",
      href: "/archive",
      icon: Icons.Archive,
   },
   // {
   //    label: "Reports",
   //    href: "/reports",
   //    icon: Icons.BarChart2,
   // },
];

const Sidebar = () => {
   const [chatNotificationCount, setChatNotificationCount] = useState(1);
   return (
      <aside className="flex h-screen w-14 flex-col items-center  bg-slate-900 ">
         <div className="flex h-16 w-full items-center justify-center border-b border-slate-200 dark:border-slate-700">
            <Image
               src="/img/dragon.webp"
               alt="Logo"
               width={32}
               height={32}
               className="h-8 w-8"
            />
         </div>
         <nav className="flex flex-1 flex-col items-center gap-1 py-4">
            <SwitchAgent />
            {nav.map((item) =>
               item.label === "Chat" ? (
                  <div key={item.label} className="relative">
                     <ActionButton
                        href={item.href}
                        icon={<item.icon className="h-5 w-5" />}
                        tooltip={item.label}
                     />
                     {chatNotificationCount > 0 && (
                        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                           {chatNotificationCount}
                        </span>
                     )}
                  </div>
               ) : (
                  <ActionButton
                     key={item.label}
                     href={item.href}
                     icon={<item.icon className="h-5 w-5" />}
                     tooltip={item.label}
                  />
               )
            )}
         </nav>
         <div className="flex flex-col items-center gap-2 py-4">
            <ThemeToggle />
            <ActionButton
               href="/settings/chat-page"
               icon={<Settings className="h-5 w-5" />}
               tooltip="Settings"
            />
            {/* <TooltipProvider delayDuration={0}>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                     >
                        <LifeBuoy className="h-5 w-5" />
                     </a>
                  </TooltipTrigger>
                  <TooltipContent
                     side="right"
                     className="border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                     <p>Support</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider> */}
            <UserMenu />
         </div>
      </aside>
   );
};

export default Sidebar;
