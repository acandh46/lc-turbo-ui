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

export function randomColor() {
   // Generate smoother pastel colors using HSL
   const hue = Math.floor(Math.random() * 360); // 0-359
   const saturation = 60 + Math.random() * 20; // 60-80%
   const lightness = 70 + Math.random() * 10; // 70-80%
   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function timeAgo(date: string) {
   const d = new Date(date);
   const now = new Date();
   const diff = Math.floor((now.getTime() - d.getTime()) / 1000); // detik

   if (diff < 60) return `${diff} seconds ago`;
   if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
   if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
   if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
   return `${Math.floor(diff / 31536000)} years ago`;
}
