import { z } from "zod";
import { isAfter, isSunday, startOfDay, parseISO } from "date-fns";

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),

  date: z
    .string()
    .min(1, "Please select a date")
    .refine((val) => {
      const selected = startOfDay(parseISO(val));
      const today = startOfDay(new Date());
      return isAfter(selected, today) || selected.getTime() === today.getTime();
    }, "Please select today or a future date")
    .refine((val) => {
      return !isSunday(parseISO(val));
    }, "We are closed on Sundays. Please select another day."),

  time: z.string().min(1, "Please select a time slot"),

  treatment: z.string().min(1, "Please select a treatment"),

  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;
