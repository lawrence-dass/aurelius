import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { practiceColors } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPracticeColor = (practice: string) => {
  return practiceColors[practice as keyof typeof practiceColors];
};
