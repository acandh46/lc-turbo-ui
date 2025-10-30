"use client";

import { WelcomeMessageCard } from "@/types/agent.types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { RenderHtml } from "./RenderHtml";

interface WelcomeMessageCardPreviewProps {
   card: WelcomeMessageCard;
}

export const WelcomeMessageCardPreview = ({
   card,
}: WelcomeMessageCardPreviewProps) => {
   return (
      <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden w-full max-w-[250px] border border-gray-200 dark:border-gray-600">
         {card.imageUrl && (
            <div className="relative w-full h-32">
               <Image
                  src={card.imageUrl}
                  alt="Welcome image"
                  layout="fill"
                  objectFit="cover"
                  unoptimized
               />
            </div>
         )}
         <div className="p-3">
            <RenderHtml
               content={card.text}
               className="text-sm text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm prose-p:my-0 w-full wrapbreak-words"
               style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  maxWidth: "100%",
               }}
            />
         </div>
         {card.buttons && card.buttons.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-600 flex flex-col space-y-2">
               {card.buttons.map((button, index) => (
                  <a
                     key={index}
                     href={button.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-center text-center text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-blue-600 dark:text-blue-400 font-medium py-2 px-3 rounded-md transition-colors w-full"
                  >
                     {button.text}
                     <ExternalLink size={14} className="ml-2" />
                  </a>
               ))}
            </div>
         )}
      </div>
   );
};
