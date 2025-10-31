"use client";

import { DndContext, useDraggable } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { X } from "lucide-react";
import Image from "next/image";

interface BannerDraggableProps {
   bannerImage: string;
   anchor?: string;
   offsetX?: number;
   offsetY?: number;
   updateAgentConfig: (cfg: { offsetX: number; offsetY: number }) => void;
   onClose: () => void;
   containerRef: React.RefObject<HTMLDivElement | null>;
}

const DraggableContent = ({
   bannerImage,
   anchor,
   offsetX,
   offsetY,
   onClose,
}: Omit<BannerDraggableProps, "updateAgentConfig">) => {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: "banner-draggable",
   });
   const style: React.CSSProperties = {
      position: "absolute",
      zIndex: 120,
      cursor: "grab",
      ...(anchor?.includes("bottom") ? { bottom: offsetY } : { top: offsetY }),
      ...(anchor?.includes("right") ? { right: offsetX } : { left: offsetX }),
      ...(transform
         ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
           }
         : {}),
   };
   return (
      <div style={style} {...listeners} {...attributes}>
         <div className="relative w-80 h-80">
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  onClose();
               }}
               className="absolute top-2 right-2 bg-gray-800/50 text-white rounded-full p-1 hover:bg-gray-800 z-10"
               aria-label="Close banner"
            >
               <X size={16} />
            </button>
            <Image
               src={bannerImage}
               alt="banner"
               layout="fill"
               objectFit="contain"
               unoptimized
               className="pointer-events-none cursor-grab"
            />
         </div>
      </div>
   );
};

export const BannerDraggable = ({
   bannerImage,
   anchor = "bottom_right",
   offsetX = 20,
   offsetY = 20,
   updateAgentConfig,
   onClose,
   containerRef,
}: BannerDraggableProps) => {
   const handleDragEnd = (event: any) => {
      const { delta } = event;
      let newOffsetX = offsetX;
      let newOffsetY = offsetY;

      switch (anchor) {
         case "bottom_right":
            newOffsetX -= delta.x;
            newOffsetY -= delta.y;
            break;
         case "bottom_left":
            newOffsetX += delta.x;
            newOffsetY -= delta.y;
            break;
         case "top_right":
            newOffsetX -= delta.x;
            newOffsetY += delta.y;
            break;
         case "top_left":
            newOffsetX += delta.x;
            newOffsetY += delta.y;
            break;
      }

      newOffsetX = Math.max(0, newOffsetX);
      newOffsetY = Math.max(0, newOffsetY);

      updateAgentConfig({
         offsetX: newOffsetX,
         offsetY: newOffsetY,
      });
   };

   return (
      <DndContext
         onDragEnd={handleDragEnd}
         modifiers={[restrictToParentElement]}
      >
         <DraggableContent
            bannerImage={bannerImage}
            anchor={anchor}
            offsetX={offsetX}
            offsetY={offsetY}
            onClose={onClose}
            containerRef={containerRef}
         />
      </DndContext>
   );
};
