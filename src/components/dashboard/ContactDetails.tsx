"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone } from "lucide-react";

export const ContactDetails = () => {
   return (
      <aside className="hidden h-full w-[350px] border-l border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 xl:flex xl:flex-col">
         <Card className="border-slate-200 bg-transparent dark:border-slate-800">
            <CardHeader className="text-center">
               <Avatar className="mx-auto h-20 w-20">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d0" />
                  <AvatarFallback>JD</AvatarFallback>
               </Avatar>
               <CardTitle className="mt-4">Jane Doe</CardTitle>
               <CardDescription className="text-slate-500 dark:text-slate-400">
                  VIP Customer
               </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
               <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                     jane.doe@example.com
                  </span>
               </div>
               <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                     +1 (555) 123-4567
                  </span>
               </div>
               <Separator className="bg-slate-200 dark:bg-slate-800" />
               <div className="space-y-2">
                  <h3 className="font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                     <Badge variant="secondary">VIP</Badge>
                     <Badge variant="secondary">Billing Issue</Badge>
                     <Badge variant="secondary">USA</Badge>
                  </div>
               </div>
            </CardContent>
         </Card>
      </aside>
   );
};
