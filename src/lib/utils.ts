
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Replace any instances of border-border with border in the UI
export function fixBorderClass(className: string): string {
  return className.replace(/border-border/g, 'border');
}
