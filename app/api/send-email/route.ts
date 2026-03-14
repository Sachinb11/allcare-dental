import { NextRequest, NextResponse } from "next/server";

interface EmailPayload {
  name: string;
  phone: string;
  date: string;
  time: string;
  treatment?: string;
  notes?: string;
}

// ── HTML email template ────────────────────────────────────────────────────────
function buildEmailHtml(d: EmailPayload): string {
  const rows = [
    { label: "Patient Name", value: d.name },
    { label: "Phone Number", value: `<a href="tel:${d.phone}" style="color:#1b3d2f">${d.phone}</a>` },
    { label: "Date",         value: d.date },
    { label: "Time Slot",    value: d.time },
    { label: "Treatment",    value: d.treatment || "Not specified" },
    { label: "Notes",        value: d.notes || "—" },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Appointment Request</title>
</head>
<body style="margin:0;padding:0;background:#f3efe7;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3efe7;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(27,61,47,.12);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1b3d2f,#254d3c);padding:32px 36px;text-align:center;">
            <div style="font-size:2.2rem;margin-bottom:10px;">🦷</div>
            <h1 style="margin:0;font-size:1.4rem;font-weight:700;color:#faf8f4;font-family:Georgia,serif;">New Appointment Request</h1>
            <p style="margin:6px 0 0;font-size:.84rem;color:rgba(250,248,244,.65);">All Care Dental Clinic — Dr. Pravin Vaishya</p>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#c49a4a;padding:12px 36px;text-align:center;">
            <span style="font-size:.8rem;font-weight:700;color:#1b3d2f;letter-spacing:.1em;text-transform:uppercase;">Action Required — Please Call to Confirm</span>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:28px 36px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${rows.map(r => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9e3d9;width:38%;">
                  <span style="font-size:.75rem;font-weight:700;color:#7a9e8a;text-transform:uppercase;letter-spacing:.06em;">${r.label}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #e9e3d9;">
                  <span style="font-size:.92rem;font-weight:600;color:#162119;">${r.value}</span>
                </td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>

        <!-- CTA buttons -->
        <tr>
          <td style="padding:8px 36px 28px;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding-right:8px;" width="50%">
                  <a href="tel:${d.phone}" style="display:block;background:#1b3d2f;color:#faf8f4;text-align:center;padding:13px 16px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none;">📞 Call Patient</a>
                </td>
                <td style="padding-left:8px;" width="50%">
                  <a href="https://wa.me/91${d.phone}?text=Hello%20${encodeURIComponent(d.name)}%2C%20your%20appointment%20at%20All%20Care%20Dental%20Clinic%20on%20${encodeURIComponent(d.date)}%20at%20${encodeURIComponent(d.time)}%20is%20confirmed!" style="display:block;background:#16a34a;color:white;text-align:center;padding:13px 16px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none;">💬 WhatsApp</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f3efe7;padding:18px 36px;border-top:1px solid #e9e3d9;text-align:center;">
            <p style="margin:0;font-size:.76rem;color:#7a9e8a;line-height:1.6;">
              All Care Dental Clinic · Shop 137/E, Arihant Aptt., Ostwal Empire, Boisar (W) – 401 501<br />
              📞 7620750026 · 📱 9762788098 · ✉ pravinvaishya@yahoo.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Plain text fallback ────────────────────────────────────────────────────────
function buildEmailText(d: EmailPayload): string {
  return `NEW APPOINTMENT REQUEST — All Care Dental Clinic
=======================================================

Patient Name : ${d.name}
Phone        : ${d.phone}
Date         : ${d.date}
Time         : ${d.time}
Treatment    : ${d.treatment || "Not specified"}
Notes        : ${d.notes || "None"}

=======================================================
Please call the patient to confirm the appointment.
All Care Dental Clinic · Boisar · 7620750026`;
}

// ── POST /api/send-email ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: EmailPayload = await req.json();

    if (!body.name || !body.phone || !body.date || !body.time) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail   = process.env.CLINIC_EMAIL || "pravinvaishya@yahoo.com";
    const fromEmail = process.env.EMAIL_FROM   || "noreply@allcaredental.in";

    if (!resendKey) {
      // Dev mode — log and succeed
      console.log("📧 [Email skipped — no RESEND_API_KEY]");
      console.log("TO:", toEmail);
      console.log("Subject: New Appointment — " + body.name);
      console.log("Body:", buildEmailText(body));
      return NextResponse.json({ success: true, message: "Email logged (no API key in dev)" });
    }

    // ── Send via Resend ────────────────────────────────────────────────────────
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from:    `All Care Dental <${fromEmail}>`,
        to:      [toEmail],
        reply_to: body.phone ? undefined : undefined,
        subject: `🦷 New Appointment Request — ${body.name} (${body.date} at ${body.time})`,
        html:    buildEmailHtml(body),
        text:    buildEmailText(body),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", result);
      return NextResponse.json(
        { success: false, message: "Email delivery failed. Appointment still saved." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Email sent successfully", id: result.id });

  } catch (err) {
    console.error("send-email error:", err);
    return NextResponse.json({ success: false, message: "Email service error" }, { status: 500 });
  }
}
