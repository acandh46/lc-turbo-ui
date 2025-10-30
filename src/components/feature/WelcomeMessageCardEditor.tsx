"use client";

import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "./MarkdownEditor";
import { useAgentConfigStore } from "@/store/useAgentConfigStore";
import { Link, Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ImageUpload from "../CustomUi/ImageUpload";

export const WelcomeMessageCardEditor = () => {
   const { config, updateWelcomeMessageCard } = useAgentConfigStore();

   // The parent component now guarantees that `config` and `welcomeMessageCard` exist.
   const card = config!.agentConfig.welcomeMessageCard!;

   const handleAddButton = () => {
      const newButtons = [
         ...card.buttons,
         { text: "Click me", url: "https://example.com" },
      ];
      updateWelcomeMessageCard({ buttons: newButtons });
   };

   const handleRemoveButton = (index: number) => {
      const newButtons = [...card.buttons];
      newButtons.splice(index, 1);
      updateWelcomeMessageCard({ buttons: newButtons });
   };

   return (
      <div className="space-y-6">
         <div className="space-y-2">
            <Label>Image URL</Label>
            <div className="relative">
               <ImageUpload
                  initialImage={card.imageUrl}
                  onUploadComplete={(url: string) => {
                     updateWelcomeMessageCard({ imageUrl: url });
                  }}
                  shape="box"
               />
            </div>
         </div>
         <div className="space-y-2">
            <Label>Message</Label>
            <MarkdownEditor
               variant="long"
               content={card.text}
               useBullet={false}
               onChange={(newContent) =>
                  updateWelcomeMessageCard({ text: newContent })
               }
            />
         </div>

         <div className="space-y-4">
            <Label>Buttons</Label>
            {card.buttons.map((button, index) => (
               <div key={index} className="flex items-center gap-2">
                  <div className="relative grow">
                     <Input
                        placeholder="Button text"
                        value={button.text}
                        onChange={(e) =>
                           updateWelcomeMessageCard({}, index, {
                              text: e.target.value,
                           })
                        }
                     />
                  </div>
                  <div className="relative grow">
                     <Link
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16}
                     />
                     <Input
                        placeholder="https://example.com"
                        className="pl-10"
                        value={button.url}
                        onChange={(e) =>
                           updateWelcomeMessageCard({}, index, {
                              url: e.target.value,
                           })
                        }
                     />
                  </div>
                  {card.buttons.length > 1 && (
                     <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveButton(index)}
                     >
                        <Trash2 size={16} />
                     </Button>
                  )}
               </div>
            ))}
            <Button variant="outline" onClick={handleAddButton}>
               <Plus size={16} className="mr-2" />
               Add Button
            </Button>
         </div>
      </div>
   );
};
