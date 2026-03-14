"use client";
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useScrollAnimation";

const feats = [
  "Painless root canal using rotary technology",
  "Advanced single-session UV teeth whitening",
  "Complete implant and replacement solutions",
  "Fully sterile and hygienic surgical environment",
  "Conveniently located near Boisar Bus Depot",
  "Flexible morning and evening appointment slots",
];

function StatBadge({ value, label, suffix = "", visible }: { value: number; label: string; suffix?: string; visible: boolean }) {
  const count = useCountUp(value, 1800, visible);
  return (
    <div style={{ textAlign: "center", padding: "16px 12px", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 14 }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "var(--gold2)", lineHeight: 1 }}>
        {value >= 1000 ? (count >= 1000 ? (count / 1000).toFixed(1) + "k" : "0") : count}{suffix}
      </div>
      <div style={{ fontSize: ".68rem", color: "rgba(250,248,244,.5)", textTransform: "uppercase", letterSpacing: ".09em", marginTop: 5, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

export default function DoctorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const goto = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="about" style={{ padding: "var(--sec-pad)", background: "var(--white)" }} ref={ref}>
      {/* Heading */}
      <div className={`rev ${visible ? "on" : ""}`} style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: ".73rem", fontWeight: 700, color: "var(--forest3)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>
          <span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />
          About the Doctor
          <span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "var(--fs-h2)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-.02em", color: "var(--ink)" }}>
          Meet <em style={{ color: "var(--forest)", fontStyle: "italic", fontWeight: 400 }}>Dr. Pravin Vaishya</em>
        </h2>
      </div>

      <div className="ab-grid" style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>
        {/* Doctor Card */}
        <div className={`rev fl ${visible ? "on" : ""}`}>
          <div style={{ background: "var(--forest)", borderRadius: 28, overflow: "hidden", boxShadow: "var(--shl)" }}>
            {/* Top section */}
            <div style={{ padding: "clamp(32px,5vw,48px) clamp(24px,4vw,36px) 36px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(196,154,74,.07) 1.5px,transparent 1.5px)", backgroundSize: "22px 22px" }} />
              <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 32, background: "var(--white)", clipPath: "ellipse(55% 100% at 50% 100%)" }} />

              {/* Avatar */}
              <div style={{ width: "clamp(72px,10vw,100px)", height: "clamp(72px,10vw,100px)", borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "3px solid rgba(255,255,255,.3)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(2rem,4vw,3.2rem)", position: "relative", zIndex: 1 }}>👨‍⚕️</div>

              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.3rem,2.5vw,1.7rem)", fontWeight: 700, color: "var(--cream)", position: "relative", zIndex: 1 }}>Dr. Pravin Vaishya</div>
              <div style={{ color: "var(--gold2)", fontSize: ".86rem", marginTop: 4, position: "relative", zIndex: 1 }}>B.D.S. — Mumbai University</div>
              <div style={{ color: "rgba(250,248,244,.38)", fontSize: ".75rem", marginTop: 3, position: "relative", zIndex: 1 }}>Registration No. A-6039</div>

              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 20, position: "relative", zIndex: 1 }}>
                {["Root Canal", "Implants", "Cosmetic", "Gum Surgery", "UV Whitening"].map(t => (
                  <span key={t} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.14)", color: "rgba(250,248,244,.78)", padding: "5px 12px", borderRadius: 50, fontSize: ".71rem", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Stats grid — animated counters */}
            <div style={{ padding: "0 24px 4px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <StatBadge value={10}   label="Years Exp."     suffix="+" visible={visible} />
              <StatBadge value={5000} label="Patients"       suffix="+" visible={visible} />
              <StatBadge value={6}    label="Specialities"   suffix="+" visible={visible} />
            </div>

            {/* Details */}
            <div style={{ background: "var(--white)", padding: "clamp(20px,3vw,28px) clamp(20px,4vw,32px)", marginTop: 4 }}>
              {[
                { icon: "🎓", label: "Qualification",    value: "B.D.S. — Mumbai University" },
                { icon: "🪪", label: "Registration No.", value: "A-6039" },
                { icon: "📍", label: "Clinic",           value: "Boisar (W), Maharashtra" },
                { icon: "📞", label: "Contact",          value: "7620750026", link: "tel:7620750026" },
              ].map((d, i) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--cream2)" : "none", fontSize: ".86rem" }}>
                  <span style={{ color: "var(--forest)", fontSize: ".95rem", width: 18, textAlign: "center", flexShrink: 0 }}>{d.icon}</span>
                  <div>
                    <span style={{ fontSize: ".7rem", color: "var(--ink3)", display: "block" }}>{d.label}</span>
                    {d.link
                      ? <a href={d.link} style={{ fontWeight: 600, color: "var(--forest)", display: "block" }}>{d.value}</a>
                      : <span style={{ fontWeight: 600, color: "var(--ink)", display: "block" }}>{d.value}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className={`rev fr ${visible ? "on" : ""}`}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: ".73rem", fontWeight: 700, color: "var(--forest3)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 16 }}>
            <span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />
            Why Choose Us
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "var(--fs-h3)", fontWeight: 600, lineHeight: 1.12, letterSpacing: "-.02em", color: "var(--ink)", marginBottom: 20 }}>
            Compassionate Care with{" "}
            <em style={{ color: "var(--forest)", fontStyle: "italic", fontWeight: 400 }}>Clinical Excellence</em>
          </h2>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--ink2)", lineHeight: 1.82, marginBottom: 16, fontWeight: 300 }}>
            Dr. Pravin Vaishya brings a wealth of knowledge and an unwavering commitment to patient wellbeing. Trained at Mumbai University, he combines the latest dental techniques with a deeply personal approach to every patient.
          </p>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--ink2)", lineHeight: 1.82, marginBottom: 22, fontWeight: 300 }}>
            Our clinic is equipped with modern diagnostic tools, UV bleaching systems, and fully sterile surgical suites — ensuring world-class care right in your neighbourhood.
          </p>

          {/* Features list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 28 }}>
            {feats.map(f => (
              <div key={f}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: "var(--cream2)", border: "1px solid var(--cream3)", borderRadius: 10, fontSize: "var(--fs-small)", color: "var(--ink2)", transition: "all .2s", cursor: "default" }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = "var(--forest3)"; t.style.background = "rgba(27,61,47,.04)"; t.style.color = "var(--ink)"; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = "var(--cream3)"; t.style.background = "var(--cream2)"; t.style.color = "var(--ink2)"; }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--forest3)", flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>

          <button onClick={() => goto("#appointment")} style={{ background: "var(--forest)", color: "var(--cream)", padding: "clamp(12px,2vw,14px) clamp(24px,4vw,32px)", borderRadius: 50, fontWeight: 700, fontSize: "var(--fs-small)", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .25s var(--ease)", boxShadow: "0 6px 22px rgba(27,61,47,.28)", border: "none", cursor: "pointer", minHeight: 48 }}>
            Book an Appointment →
          </button>
        </div>
      </div>
    </section>
  );
}
