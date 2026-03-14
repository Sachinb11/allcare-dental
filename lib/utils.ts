import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppLink(data: {
  name: string; phone: string; date: string; time: string; treatment: string;
}): string {
  const msg = `Hello Dr. Pravin, I want to book an appointment.\n\nName: ${data.name}\nPhone: ${data.phone}\nDate: ${data.date}\nTime: ${data.time}\nTreatment: ${data.treatment || "Not specified"}\n\nThank you!`;
  const doctor = process.env.NEXT_PUBLIC_DOCTOR_WHATSAPP || "917620750026";
  return `https://wa.me/${doctor}?text=${encodeURIComponent(msg)}`;
}
