import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Validation ─────────────────────────────────────────────────────────────────
const schema = z.object({
  name:      z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  phone:     z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  date:      z.string().min(1, "Date is required")
    .refine(v => { const d=new Date(v); const t=new Date(); t.setHours(0,0,0,0); return d>=t; }, "Date must be today or future")
    .refine(v => new Date(v).getDay() !== 0, "Clinic is closed on Sundays"),
  time:      z.string().min(1, "Please select a time slot"),
  treatment: z.string().max(100).optional(),
  notes:     z.string().max(500).optional(),
});

// ── Helper: fire-and-forget email ─────────────────────────────────────────────
async function triggerEmail(data: z.infer<typeof schema>, baseUrl: string) {
  try {
    await fetch(`${baseUrl}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.warn("Email trigger failed (non-fatal):", err);
  }
}

// ── POST /api/appointments ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;
    const origin = req.nextUrl.origin;

    // 2. Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const dbRes = await fetch(`${supabaseUrl}/rest/v1/appointments`, {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "apikey":        supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Prefer":        "return=representation",
        },
        body: JSON.stringify({
          name:      data.name,
          phone:     data.phone,
          date:      data.date,
          time:      data.time,
          treatment: data.treatment || null,
          notes:     data.notes    || null,
        }),
      });

      if (!dbRes.ok) {
        const err = await dbRes.text();
        console.error("Supabase error:", err);
        return NextResponse.json(
          { success: false, message: "Failed to save appointment. Please call 7620750026 directly." },
          { status: 500 }
        );
      }

      const saved = await dbRes.json();

      // 3. Send email notification (non-blocking)
      triggerEmail(data, origin);

      return NextResponse.json({
        success: true,
        message: "Appointment booked successfully!",
        data: saved[0],
      });
    }

    // ── Dev fallback (no Supabase configured) ─────────────────────────────────
    console.log("📅 New appointment (no DB configured):", data);
    triggerEmail(data, origin);

    return NextResponse.json({
      success: true,
      message: "Appointment received!",
      data: { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() },
    });

  } catch (err) {
    console.error("Appointments API error:", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

// ── GET /api/appointments (admin only) ────────────────────────────────────────
export async function GET(req: NextRequest) {
  const auth     = req.headers.get("authorization");
  const adminKey = process.env.ADMIN_SECRET_KEY;

  if (!adminKey || auth !== `Bearer ${adminKey}`) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ success: false, message: "Database not configured" }, { status: 503 });
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/appointments?order=created_at.desc&limit=100`,
    { headers: { "apikey": supabaseKey, "Authorization": `Bearer ${supabaseKey}` } }
  );

  const data = await res.json();
  return NextResponse.json({ success: true, count: data.length, data });
}
