"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useSocket } from "@/components/providers/SocketProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
   const { user } = useAuth();
   const { logout } = useAuthStore();
   const { isConnected } = useSocket();
   const router = useRouter();

   const handleLogout = async () => {
      await logout();
      router.push("/auth/login");
   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <div className="relative mt-2 cursor-pointer border-t border-slate-200 p-2 dark:border-slate-700">
               <Avatar className="h-9 w-9">
                  <AvatarImage
                     src={`https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                     alt={user?.username}
                  />
                  <AvatarFallback>
                     {user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               {isConnected && (
                  <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
               )}
            </div>
         </PopoverTrigger>
         <PopoverContent
            side="right"
            align="end"
            className="ml-2 w-72 border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
         >
            <div className="flex items-center gap-4 p-2">
               <Avatar className="h-12 w-12">
                  <AvatarImage
                     src={`https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                     alt={user?.username}
                  />
                  <AvatarFallback>
                     {user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <p className="font-bold">{user?.username}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                     {user?.email}
                  </p>
               </div>
            </div>
            <Separator className="my-2 bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-1 p-1">
               <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
               >
                  Profile Settings
               </Button>
               <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
               >
                  Notifications
               </Button>
            </div>
            <Separator className="my-2 bg-slate-200 dark:bg-slate-700" />
            <Button
               variant="ghost"
               onClick={handleLogout}
               className="w-full justify-between text-left text-red-500 hover:text-red-600"
            >
               <span>Logout</span>
               <LogOut className="h-4 w-4" />
            </Button>
         </PopoverContent>
      </Popover>
   );
};
