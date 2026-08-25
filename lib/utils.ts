import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    const cr = (price / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹ ${cr} Cr`;
  }
  if (price >= 100000) {
    const lakh = (price / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹ ${lakh} Lakhs`;
  }
  return `₹ ${price.toLocaleString('en-IN')}`;
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

export function generateWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${fullPhone}?text=${encodedText}`;
}
