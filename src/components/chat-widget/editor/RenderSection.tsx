import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface RenderSectionProps {
   id: string;
   title: string;
   openSection: string[];
   content: React.ReactNode;
   toogleSection: () => void;
}
export const RenderSection = ({
   id,
   title,
   openSection = [],
   content,
   toogleSection,
}: RenderSectionProps) => {
   return (
      <div className="cursor-pointer hover:border-blue-400 hover:border p-5 border border-gray-200 bg-white shadow-md rounded-md">
         <div
            onClick={toogleSection}
            className="flex flex-row items-center justify-between"
         >
            <p className="font-medium text-gray-800">{title}</p>
            <ChevronRight
               className={`transition-transform ${
                  openSection.includes(id) ? "rotate-90" : ""
               }`}
            />
         </div>
         <AnimatePresence>
            {openSection.includes(id) && (
               <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                     open: { opacity: 1, height: "auto" },
                     collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{
                     duration: 0.3,
                     ease: "easeInOut",
                  }}
                  style={{ overflow: "hidden" }}
               >
                  <div className="pt-4 px-2 space-y-4">{content}</div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
