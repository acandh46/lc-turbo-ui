"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const WebsiteSettingsTab = () => {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Website Widget</CardTitle>
            <CardDescription>
               Configure the chat widget for your website.
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="space-y-2">
               <Label htmlFor="website-url">Website URL</Label>
               <Input
                  id="website-url"
                  placeholder="https://example.com"
                  defaultValue="https://turbo-agent.dev"
               />
            </div>
            <div className="space-y-2">
               <Label htmlFor="widget-color">Widget Color</Label>
               <div className="flex items-center gap-2">
                  <Input
                     id="widget-color"
                     type="color"
                     className="h-10 w-14 p-1"
                     defaultValue="#0ea5e9"
                  />
                  <Input
                     className="flex-1"
                     defaultValue="#0ea5e9"
                     placeholder="Hex color"
                  />
               </div>
               <p className="text-xs text-slate-500">
                  Choose a color that matches your brand.
               </p>
            </div>
         </CardContent>
         <CardFooter>
            <Button>Save Changes</Button>
         </CardFooter>
      </Card>
   );
};
