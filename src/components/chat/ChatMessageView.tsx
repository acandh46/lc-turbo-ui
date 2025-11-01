"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ChatMessageView = () => {
   const [showDetail, setShowDetail] = useState(false);
   const handleShowDetail = () => setShowDetail(!showDetail);
   return (
      <div className="flex h-screen flex-1 p-3 flex-col">
         <div className="flex flex-row items-center justify-between">
            <h2 className="text-md font-semibold text-black">Customer</h2>
            <Button variant="ghost" size="icon" onClick={handleShowDetail}>
               {showDetail ? (
                  <ChevronRight className="h-4 w-4" />
               ) : (
                  <ChevronLeft className="h-4 w-4" />
               )}
            </Button>
         </div>
      </div>
   );
};
