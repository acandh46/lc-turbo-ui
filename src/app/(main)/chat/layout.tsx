"use client";
import PageLayoutWrapper from "@/components/layout/PageLayoutWrapper";
import { NavItemPage } from "@/types/user.type";

export const automateNavItem: NavItemPage[] = [];

export default function ChatLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <PageLayoutWrapper
         title="Chat"
         // showSubMenu={showSubMenu}
         navItems={automateNavItem}
         showSubMenu={false}
         // handleShowSubMenu={handleSubMenuShow}
      >
         {children}
      </PageLayoutWrapper>
   );
}
