"use client";
import PageLayoutWrapper from "@/components/layout/PageLayoutWrapper";
import { NavItemPage } from "@/types/user.type";

// Define the navigation structure for the settings section
export const settingNavItem: NavItemPage[] = [
   {
      title: "Chat Page",
      href: "/settings/chat-page",
      prem: ["*"],
   },
   {
      title: "Customize Widget",
      href: "/settings/customize",
      prem: ["ADMIN", "SUPERVISOR"],
   },

   {
      title: "Canned Response",
      href: "/settings/canned",
      prem: ["*"],
   },

   {
      title: "Project Data",
      href: "/settings/project",
      prem: ["ADMIN"],
   },
   {
      title: "Agent",
      href: "/settings/agents",
      prem: ["ADMIN", "SUPERVISOR"],
   },
   {
      title: "Users",
      href: "/settings/users",
      prem: ["ADMIN", "SUPERVISOR"],
   },
];

export default function SettingsLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <PageLayoutWrapper
         title="Settings"
         // showSubMenu={showSubMenu}
         navItems={settingNavItem}
         // handleShowSubMenu={handleSubMenuShow}
      >
         {children}
      </PageLayoutWrapper>
   );
}
