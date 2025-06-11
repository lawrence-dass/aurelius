import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { mentorVoices } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const configureAssistant = (voice: string, style: string) => {
  if (
    mentorVoices[voice as keyof typeof mentorVoices] &&
    mentorVoices[voice as keyof typeof mentorVoices][style as keyof (typeof mentorVoices)[keyof typeof mentorVoices]]
  ) {
    return mentorVoices[voice as keyof typeof mentorVoices][style as keyof (typeof mentorVoices)[keyof typeof mentorVoices]];
  }
  return "f4eadda9-f380-4454-8035-0cf3083d99d4";
};