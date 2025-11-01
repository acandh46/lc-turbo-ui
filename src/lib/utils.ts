import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function formatDate(date: string, useTime: boolean = true) {
   const d = new Date(date);
   // Format jam:menit, misal: 14:05
   const jam = d.getHours().toString().padStart(2, "0");
   const menit = d.getMinutes().toString().padStart(2, "0");
   const tanggal = d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
   if (useTime) {
      return `${jam}:${menit} - ${tanggal}`;
   }
   return `${tanggal}`;
}
