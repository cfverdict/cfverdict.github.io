import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRatingColorClass(rating: number): string {
  if (rating < 1200) return "text-gray-400"; // Newbie (Gray)
  if (rating < 1400) return "text-green-500"; // Pupil (Green)
  if (rating < 1600) return "text-cyan-400"; // Specialist (Cyan)
  if (rating < 1900) return "text-blue-500"; // Expert (Blue)
  if (rating < 2100) return "text-purple-500"; // Candidate Master (Violet)
  if (rating < 2300) return "text-orange-400"; // Master (Orange)
  if (rating < 2400) return "text-orange-400"; // International Master (Orange)
  if (rating < 3000) return "text-red-500"; // Grandmaster (Red)
  return "text-red-500"; // Legendary Grandmaster (Red, handled separately for first letter)
}