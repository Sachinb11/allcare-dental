export interface AppointmentFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  treatment: string;
  notes: string;
}

export interface AppointmentRecord extends AppointmentFormData {
  id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export type SubmitStatus = "idle" | "loading" | "success" | "error";
