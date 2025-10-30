"use client";
import PageLayoutWrapper from "@/components/layout/PageLayoutWrapper";
import { NavItemPage } from "@/types/user.type";

export const automateNavItem: NavItemPage[] = [
   {
      title: "Response List",
      href: "/automate/Canned",
      prem: ["*"],
   },
];

export default function AutomateLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <PageLayoutWrapper
         title="Automate"
         // showSubMenu={showSubMenu}
         navItems={automateNavItem}
         // handleShowSubMenu={handleSubMenuShow}
      >
         {children}
      </PageLayoutWrapper>
   );
}
