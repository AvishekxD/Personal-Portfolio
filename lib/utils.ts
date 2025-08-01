import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DataOrientation = "vertical" | "horizontal";
export type Direction = "top" | "middle" | "bottom";