import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export const proxiedUrl = (imageUrl: string | null | undefined) => {
  if (!imageUrl || !isValidUrl(imageUrl)) {
    return "/img/noimage.webp";
  }
  return `/api/image-proxy?url=${encodeURIComponent(
    imageUrl || "/img/noimage.webp"
  )}`;
};
