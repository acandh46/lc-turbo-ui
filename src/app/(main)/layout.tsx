import { AuthProvider } from "@/components/providers/AuthProvider";
import Sidebar from "@/components/layout/Sidebar";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { ChatProvider } from "@/components/providers/ChatProvider";

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <AuthProvider>
         <SocketProvider>
            <ChatProvider>
               <div className="flex h-screen w-full overflow-hidden bg-slate-900">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto">{children}</main>
               </div>
            </ChatProvider>
         </SocketProvider>
      </AuthProvider>
   );
}
