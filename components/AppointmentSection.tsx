"use client";
import { useState, useEffect, useRef } from "react";

const TREATMENTS = [
  "Root Canal Treatment","Dental Implants","Teeth Replacement",
  "Gum Treatment / Surgery","Teeth Bleaching (UV Light)",
  "Dental Restoration / Fillings","Routine Check-up & Cleaning","Other / Not Sure",
];
const MORNING = ["9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM"];
const EVENING = ["4:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM"];

interface F { name:string; phone:string; date:string; time:string; treatment:string; notes:string; }
type Errs = Partial<Record<keyof F, string>>;
type Status = "idle"|"loading"|"success"|"error";

function getMin() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
}

function buildWALink(f: F) {
  const msg = `Hello Dr. Pravin,\n\nNew Appointment Request 🦷\n\nName: ${f.name}\nPhone: ${f.phone}\nDate: ${f.date}\nTime: ${f.time}\nTreatment: ${f.treatment || "Not specified"}\nNotes: ${f.notes || "None"}\n\nThank you!`;
  return `https://wa.me/917620750026?text=${encodeURIComponent(msg)}`;
}

// ── Field Component ────────────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize:".74rem", fontWeight:700, color:"var(--ink2)", letterSpacing:".06em", textTransform:"uppercase", display:"block", marginBottom:6 }}>{label}</label>
      {children}
      {error && (
        <p style={{ color:"var(--red)", fontSize:".73rem", marginTop:5, display:"flex", alignItems:"center", gap:5, animation:"slideUp .25s var(--ease)" }}>
          <span style={{ flexShrink:0 }}>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export default function AppointmentSection() {
  const secRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [f, setF] = useState<F>({ name:"", phone:"", date:"", time:"", treatment:"", notes:"" });
  const [errs, setErrs] = useState<Errs>({});
  const [touched, setTouched] = useState<Partial<Record<keyof F, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (secRef.current) obs.observe(secRef.current);
    return () => obs.disconnect();
  }, []);

  // Inline validation
  const validate = (data = f): Errs => {
    const e: Errs = {};
    if (!data.name.trim() || data.name.trim().length < 2) e.name = "Please enter your full name (min 2 characters)";
    if (!/^[6-9]\d{9}$/.test(data.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!data.date) { e.date = "Please select a date"; }
    else {
      const d = new Date(data.date); const today = new Date(); today.setHours(0,0,0,0);
      if (d < today) e.date = "Cannot book a past date. Please choose today or later.";
      else if (d.getDay() === 0) e.date = "We're closed on Sundays. Please choose another day.";
    }
    if (!data.time) e.time = "Please select a time slot";
    return e;
  };

  const onBlur = (field: keyof F) => {
    setTouched(t => ({ ...t, [field]: true }));
    const e = validate();
    setErrs(prev => ({ ...prev, [field]: e[field] }));
  };

  const onChange = (field: keyof F, value: string) => {
    const updated = { ...f, [field]: value };
    setF(updated);
    if (touched[field]) {
      const e = validate(updated);
      setErrs(prev => ({ ...prev, [field]: e[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(f).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched as typeof touched);
    const errsNow = validate();
    setErrs(errsNow);
    if (Object.keys(errsNow).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json();
      if (data.success) {
        setWaLink(buildWALink(f));
        setStatus("success");
      } else {
        setStatus("error");
        setErrMsg(data.message || "Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please check your connection or call 7620750026.");
    }
  };

  const reset = () => {
    setF({ name:"", phone:"", date:"", time:"", treatment:"", notes:"" });
    setErrs({}); setTouched({}); setStatus("idle"); setErrMsg(""); setWaLink("");
  };

  // Shared input style
  const inp = (field: keyof F): React.CSSProperties => ({
    background: "var(--cream)", border: `1.5px solid ${touched[field] && errs[field] ? "var(--red)" : touched[field] && !errs[field] ? "var(--greenok)" : "var(--cream3)"}`,
    borderRadius: 10, padding: "13px 15px", color: "var(--ink)",
    fontSize: ".92rem", outline: "none", width: "100%",
    transition: "border-color .2s, box-shadow .2s",
    WebkitAppearance: "none",
  });

  return (
    <section id="appointment" style={{ padding:"var(--sec-pad)", background:"var(--cream)" }} ref={secRef}>
      <style>{`
        .appt-grid { display: grid; grid-template-columns: 1fr 400px; gap: 40px; align-items: start; }
        .form-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .ffc        { grid-column: 1 / -1; }
        @media(max-width:1100px){ .appt-grid{ grid-template-columns: 1fr !important; } }
        @media(max-width:768px) { .form-grid{ grid-template-columns: 1fr !important; } .ffc{ grid-column: 1 !important; } }
        .inp-field:focus { border-color: var(--forest) !important; box-shadow: 0 0 0 3px rgba(27,61,47,.09) !important; background: white !important; }
        .inp-field::placeholder { color: var(--ink3); }
        .aside-card { background: var(--white); border: 1px solid var(--cream3); border-radius: 14px; padding: 22px 24px; box-shadow: var(--sh); transition: all .25s; }
        .aside-card:hover { transform: translateY(-3px); box-shadow: var(--shm); }
      `}</style>

      {/* Heading */}
      <div className={`rev ${visible?"on":""}`} style={{ marginBottom:56 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:".73rem", fontWeight:700, color:"var(--forest3)", letterSpacing:".18em", textTransform:"uppercase", marginBottom:12 }}>
          <span style={{ width:22, height:1, background:"var(--forest3)", opacity:.6, display:"inline-block" }} />
          Easy Online Booking
          <span style={{ width:22, height:1, background:"var(--forest3)", opacity:.6, display:"inline-block" }} />
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"var(--fs-h2)", fontWeight:600, lineHeight:1.08, letterSpacing:"-.02em", color:"var(--ink)", marginBottom:14 }}>
          Book Your <em style={{ color:"var(--forest)", fontStyle:"italic", fontWeight:400 }}>Appointment</em>
        </h2>
        <p style={{ fontSize:"var(--fs-body)", color:"var(--ink2)", lineHeight:1.78, fontWeight:300, maxWidth:520 }}>
          Fill in the form and our team will call you to confirm within a few hours.
        </p>
      </div>

      <div className="appt-grid">
        {/* ── FORM CARD ── */}
        <div className={`rev ${visible?"on":""}`} style={{ background:"var(--white)", border:"1px solid var(--cream3)", borderRadius:24, overflow:"hidden", boxShadow:"var(--shl)" }}>
          {/* Header */}
          <div style={{ background:"linear-gradient(135deg,var(--forest),var(--forest2))", padding:"28px 36px" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:600, color:"var(--cream)" }}>Schedule Your Visit</h3>
            <p style={{ fontSize:".84rem", color:"rgba(250,248,244,.65)", marginTop:4 }}>We&apos;ll confirm your slot with a call shortly after submission.</p>
          </div>

          {/* Body */}
          <div style={{ padding:"clamp(24px,4vw,36px) clamp(20px,5vw,38px)" }}>

            {/* SUCCESS STATE */}
            {status === "success" && (
              <div style={{ animation:"fadeIn .4s var(--ease)" }}>
                <div style={{ textAlign:"center", padding:"28px 0 20px" }}>
                  {/* Animated check */}
                  <div className="success-check" style={{ marginBottom:20 }}>
                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                      <circle cx="36" cy="36" r="34" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
                      <path d="M22 36l10 10 18-18" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        strokeDasharray="40" strokeDashoffset="40" style={{ animation:"checkDraw .5s var(--ease) .2s forwards" }} />
                    </svg>
                  </div>
                  <div className="success-msg">
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:600, color:"var(--forest)", marginBottom:8 }}>Appointment Request Sent!</h3>
                    <p style={{ color:"var(--ink2)", fontSize:".92rem", lineHeight:1.7, maxWidth:360, margin:"0 auto 20px" }}>
                      We&apos;ve received your request and will call you shortly to confirm your slot.
                    </p>
                    {/* Booking summary */}
                    <div style={{ background:"var(--cream2)", border:"1px solid var(--cream3)", borderRadius:12, padding:"16px 20px", textAlign:"left", marginBottom:20, fontSize:".86rem" }}>
                      <div style={{ fontWeight:600, color:"var(--forest)", marginBottom:10, fontSize:".78rem", textTransform:"uppercase", letterSpacing:".08em" }}>Your booking details</div>
                      {[{ l:"Name", v:f.name }, { l:"Phone", v:f.phone }, { l:"Date", v:f.date }, { l:"Time", v:f.time }, { l:"Treatment", v:f.treatment||"Not specified" }].map(row => (
                        <div key={row.l} style={{ display:"flex", gap:8, marginBottom:5, color:"var(--ink2)" }}>
                          <span style={{ fontWeight:600, color:"var(--ink)", minWidth:70 }}>{row.l}:</span>
                          <span>{row.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp confirm button */}
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, background:"var(--greenok)", color:"white", padding:"14px 24px", borderRadius:12, fontWeight:700, fontSize:".97rem", boxShadow:"0 4px 18px rgba(22,163,74,.3)", marginBottom:12, transition:"all .2s", textDecoration:"none", minHeight:52 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Confirm via WhatsApp
                </a>
                <button onClick={reset} style={{ width:"100%", background:"none", border:"1px solid var(--cream3)", borderRadius:10, padding:"12px", color:"var(--ink3)", fontSize:".84rem", cursor:"pointer", transition:"all .2s" }}>
                  Book another appointment
                </button>
              </div>
            )}

            {/* FORM STATE */}
            {status !== "success" && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  {/* Name */}
                  <Field label="Full Name *" error={touched.name ? errs.name : undefined}>
                    <input className="inp-field" style={inp("name")} type="text" placeholder="Your full name"
                      value={f.name} onChange={e => onChange("name", e.target.value)} onBlur={() => onBlur("name")} autoComplete="name" />
                  </Field>

                  {/* Phone */}
                  <Field label="Phone Number *" error={touched.phone ? errs.phone : undefined}>
                    <input className="inp-field" style={inp("phone")} type="tel" placeholder="10-digit mobile number"
                      value={f.phone} onChange={e => onChange("phone", e.target.value.replace(/\D/g,""))} onBlur={() => onBlur("phone")} autoComplete="tel" maxLength={10} />
                  </Field>

                  {/* Date */}
                  <Field label="Preferred Date *" error={touched.date ? errs.date : undefined}>
                    <input className="inp-field" style={inp("date")} type="date" min={getMin()}
                      value={f.date} onChange={e => onChange("date", e.target.value)} onBlur={() => onBlur("date")} />
                  </Field>

                  {/* Time */}
                  <Field label="Preferred Time *" error={touched.time ? errs.time : undefined}>
                    <select className="inp-field" style={{ ...inp("time"), paddingRight:36 }}
                      value={f.time} onChange={e => onChange("time", e.target.value)} onBlur={() => onBlur("time")}>
                      <option value="">Choose a slot</option>
                      <optgroup label="☀️ Morning — 9:30 AM to 12:30 PM">
                        {MORNING.map(s => <option key={s}>{s}</option>)}
                      </optgroup>
                      <optgroup label="🌆 Evening — 4:30 PM to 8:00 PM">
                        {EVENING.map(s => <option key={s}>{s}</option>)}
                      </optgroup>
                    </select>
                  </Field>

                  {/* Treatment */}
                  <div className="ffc">
                    <Field label="Treatment Needed">
                      <select className="inp-field" style={{ ...inp("treatment"), paddingRight:36 }}
                        value={f.treatment} onChange={e => onChange("treatment", e.target.value)}>
                        <option value="">Select treatment (optional)</option>
                        {TREATMENTS.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Notes */}
                  <div className="ffc">
                    <Field label="Notes (optional)">
                      <textarea className="inp-field" style={{ ...inp("notes"), resize:"vertical", minHeight:86 }}
                        placeholder="Any specific concerns or requirements..."
                        value={f.notes} onChange={e => onChange("notes", e.target.value)} />
                    </Field>
                  </div>
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"12px 16px", color:"var(--red)", fontSize:".86rem", margin:"14px 0 6px", display:"flex", alignItems:"flex-start", gap:8 }}>
                    <span style={{ flexShrink:0 }}>❌</span> {errMsg}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={status === "loading"}
                  style={{ width:"100%", marginTop:16, background: status==="loading" ? "rgba(27,61,47,.7)" : "var(--forest)", color:"var(--cream)", padding:"16px", borderRadius:12, fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:".97rem", border:"none", cursor: status==="loading" ? "not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"all .25s var(--ease)", boxShadow:"0 6px 22px rgba(27,61,47,.28)", letterSpacing:".02em", minHeight:54 }}>
                  {status === "loading" ? (
                    <><span className="spinner" />Sending your request...</>
                  ) : <>Confirm Appointment →</>}
                </button>

                <p style={{ textAlign:"center", fontSize:".74rem", color:"var(--ink3)", marginTop:12 }}>
                  🔒 Your details are safe and 100% confidential.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── ASIDE ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Hours */}
          <div className={`rev aside-card ${visible?"on":""}`} style={{ transitionDelay:".06s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(27,61,47,.07)", border:"1px solid rgba(27,61,47,.09)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>⏰</div>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:600, color:"var(--ink)" }}>Clinic Hours</h4>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[{ l:"Morning", v:"9:30 – 12:30 PM" }, { l:"Evening", v:"4:30 – 8:00 PM" }].map(t => (
                <div key={t.l} style={{ background:"var(--cream)", border:"1px solid var(--cream3)", borderRadius:9, padding:"10px 12px" }}>
                  <div style={{ fontSize:".67rem", color:"var(--ink3)", textTransform:"uppercase", letterSpacing:".08em", fontWeight:700 }}>{t.l}</div>
                  <div style={{ fontSize:".85rem", fontWeight:600, color:"var(--forest)", marginTop:2 }}>{t.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#fef2f2", border:"1px solid #fecaca", color:"var(--red)", fontSize:".74rem", fontWeight:600, padding:"5px 10px", borderRadius:6, marginTop:10 }}>
              🚫 Sunday — Closed
            </div>
          </div>

          {/* Contact */}
          <div className={`rev aside-card ${visible?"on":""}`} style={{ transitionDelay:".11s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(27,61,47,.07)", border:"1px solid rgba(27,61,47,.09)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>📞</div>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:600, color:"var(--ink)" }}>Contact Details</h4>
            </div>
            <p style={{ fontSize:".84rem", color:"var(--ink2)", lineHeight:1.8 }}>
              Clinic: <a href="tel:7620750026" style={{ color:"var(--forest)", fontWeight:500 }}>7620750026</a><br />
              Mobile: <a href="tel:9762788098" style={{ color:"var(--forest)", fontWeight:500 }}>9762788098</a><br />
              Email: <a href="mailto:pravinvaishya@yahoo.com" style={{ color:"var(--forest)", fontWeight:500 }}>pravinvaishya@yahoo.com</a>
            </p>
          </div>

          {/* Address */}
          <div className={`rev aside-card ${visible?"on":""}`} style={{ transitionDelay:".16s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(27,61,47,.07)", border:"1px solid rgba(27,61,47,.09)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>📍</div>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:600, color:"var(--ink)" }}>Our Address</h4>
            </div>
            <p style={{ fontSize:".84rem", color:"var(--ink2)", lineHeight:1.65 }}>
              Shop No. 137/E, Arihant Aptt. 1st Floor,<br />Ostwal Empire, Opp. Bus Depo,<br />
              <strong style={{ color:"var(--ink)" }}>Boisar (W) – 401 501</strong>
            </p>
            <a href="https://maps.google.com/?q=Ostwal+Empire+Boisar" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:5, color:"var(--forest)", fontSize:".82rem", fontWeight:600, marginTop:10 }}>
              Get Directions →
            </a>
          </div>

          {/* WhatsApp */}
          <div className={`rev ${visible?"on":""}`} style={{ transitionDelay:".21s", background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", border:"1px solid #bbf7d0", borderRadius:14, padding:"22px 24px", boxShadow:"var(--sh)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"#f0fdf4", border:"1px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#16a34a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:600, color:"var(--ink)" }}>WhatsApp Booking</h4>
            </div>
            <p style={{ fontSize:".84rem", color:"var(--ink2)", lineHeight:1.7 }}>Prefer messaging? Send us a WhatsApp and we&apos;ll schedule you right away.</p>
            <a href="https://wa.me/917620750026?text=Hello%20Dr.%20Pravin%2C%20I%27d%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:"var(--greenok)", color:"white", padding:"11px 20px", borderRadius:50, fontWeight:600, fontSize:".86rem", transition:"all .2s", boxShadow:"0 4px 14px rgba(22,163,74,.28)", marginTop:12, minHeight:44 }}>
              💬 Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
