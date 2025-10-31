"use client";

import { motion } from "framer-motion";

interface AwayMessageBannerProps {
   message: string;
}

export const AwayMessageBanner = ({ message }: AwayMessageBannerProps) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3 }}
         className="absolute top-1 left-4 right-4 z-10 p-3 bg-yellow-100 border border-yellow-300 rounded-lg shadow-md"
      >
         <p className="text-center text-sm text-yellow-800">{message}</p>
      </motion.div>
   );
};
