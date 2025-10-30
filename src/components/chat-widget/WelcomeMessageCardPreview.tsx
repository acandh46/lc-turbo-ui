"use client";
import { WelcomeMessageCard } from "@/types/agent.types";
import Image from "next/image";
import { RenderHtml } from "./RenderHtml";

interface WelcomeMessageCardPreviewProps {
   card: WelcomeMessageCard;
   buttonColor?: string;
}

export const WelcomeMessageCardPreview = ({
   card,
   buttonColor = "#000",
}: WelcomeMessageCardPreviewProps) => {
   return (
      <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden w-full max-w-[250px]">
         {card.showImage && card.imageUrl && (
            <div className="relative w-full h-40">
               <Image
                  src={card.imageUrl}
                  alt="Welcome image"
                  layout="fill"
                  objectFit="contain"
                  unoptimized
               />
            </div>
         )}
         <div className="p-3 py-5">
            <RenderHtml
               content={card.text}
               className="text-md text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm prose-p:my-0 w-full wrapbreak-words"
               style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  maxWidth: "100%",
               }}
            />
         </div>
         {card.buttons && card.buttons.length > 0 && (
            <div className="p-2  dark:border-gray-600 flex flex-col space-y-2 mb-2">
               {card.buttons.map((button, index) => (
                  <a
                     key={index}
                     href={button.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     style={
                        buttonColor
                           ? ({
                                backgroundColor: buttonColor,
                                "--theme-color": buttonColor,
                             } as React.CSSProperties)
                           : undefined
                     }
                     className="flex items-center justify-center font-bold  text-center text-md text-white hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500  py-2 px-3 rounded-md transition-colors w-full"
                  >
                     {button.text}
                  </a>
               ))}
            </div>
         )}
      </div>
   );
};
