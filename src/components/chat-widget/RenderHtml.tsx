"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface RenderHTMLProps {
   content: string;
   className?: string;
   style?: React.CSSProperties;
}

export const RenderHtml = ({ content, className, style }: RenderHTMLProps) => {
   const [isClient, setIsClient] = useState(false);
   useEffect(() => {
      // This effect runs only on the client, after the initial render
      setIsClient(true);
   }, []);
   if (!isClient) {
      return null;
   }

   const sanitizedContent = DOMPurify.sanitize(content);
   return (
      <div
         className={className}
         style={style}
         dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
   );
};
