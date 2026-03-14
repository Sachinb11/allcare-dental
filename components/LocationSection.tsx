"use client";
import { useEffect, useRef, useState } from "react";

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const infoCards = [
    {
      delay: "0s", icon: "📍", title: "Address",
      content: (
        <>
          Shop No. 137/E, Arihant Aptt. 1st Floor,<br />
          Ostwal Empire, Opp. Bus Depo / Rickshaw Stand,<br />
          <strong style={{ color: "var(--ink)" }}>Boisar (W) – 401 501</strong>
          <br />
          <a href="https://maps.google.com/?q=Ostwal+Empire+Boisar" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--forest)", fontSize: ".82rem", fontWeight: 600, marginTop: 10, transition: "gap .2s" }}>
            Get Directions →
          </a>
        </>
      ),
    },
    {
      delay: ".07s", icon: "📞", title: "Phone",
      content: (
        <>
          <a href="tel:7620750026" style={{ color: "var(--forest)", fontWeight: 600, display: "block", fontSize: ".92rem" }}>7620750026</a>
          <span style={{ fontSize: ".76rem", color: "var(--ink3)" }}>Clinic</span>
          <a href="tel:9762788098" style={{ color: "var(--forest)", fontWeight: 600, display: "block", fontSize: ".92rem", marginTop: 4 }}>9762788098</a>
          <span style={{ fontSize: ".76rem", color: "var(--ink3)" }}>Mobile</span>
          <div style={{ marginTop: 12 }}>
            <a href="https://wa.me/917620750026?text=Hello%20Dr.%20Pravin%2C%20I%27d%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", padding: "7px 14px", borderRadius: 50, fontSize: ".78rem", fontWeight: 600, minHeight: 36 }}>
              💬 WhatsApp Us
            </a>
          </div>
        </>
      ),
    },
    {
      delay: ".13s", icon: "⏰", title: "Timings",
      content: (
        <>
          <strong style={{ display: "block", color: "var(--ink)", marginBottom: 4 }}>Monday – Saturday</strong>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            {[{ l: "Morning", v: "9:30 – 12:30 PM" }, { l: "Evening", v: "4:30 – 8:00 PM" }].map(t => (
              <div key={t.l} style={{ background: "var(--cream2)", border: "1px solid var(--cream3)", borderRadius: 8, padding: "9px 11px" }}>
                <div style={{ fontSize: ".66rem", color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700 }}>{t.l}</div>
                <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--forest)", marginTop: 2 }}>{t.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#fef2f2", border: "1px solid #fecaca", color: "var(--red)", fontSize: ".73rem", fontWeight: 600, padding: "5px 10px", borderRadius: 6, marginTop: 10 }}>
            🚫 Sunday — Closed
          </div>
        </>
      ),
    },
    {
      delay: ".19s", icon: "🚗", title: "Getting Here",
      content: (
        <>
          <p style={{ fontSize: "var(--fs-small)", color: "var(--ink2)", lineHeight: 1.7 }}>
            Located opposite the <strong style={{ color: "var(--ink)" }}>Boisar Bus Depot & Rickshaw Stand</strong> — landmark makes us very easy to find.
          </p>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {["🚌 2 min walk from Bus Depot", "🛺 Rickshaw stand right outside", "🅿️ Street parking available"].map(item => (
              <div key={item} style={{ fontSize: ".78rem", color: "var(--ink2)", display: "flex", alignItems: "center", gap: 6 }}>{item}</div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <section id="location" style={{ padding: "var(--sec-pad)", background: "var(--cream2)" }} ref={ref}>
      {/* Heading */}
      <div className={`rev ${visible ? "on" : ""}`} style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: ".73rem", fontWeight: 700, color: "var(--forest3)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>
          <span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />Find Us<span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "var(--fs-h2)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-.02em", color: "var(--ink)", marginBottom: 14 }}>
          Visit Our <em style={{ color: "var(--forest)", fontStyle: "italic", fontWeight: 400 }}>Clinic</em>
        </h2>
        <p style={{ fontSize: "var(--fs-body)", color: "var(--ink2)", lineHeight: 1.78, fontWeight: 300, maxWidth: 480, margin: "0 auto" }}>
          Opposite the Bus Depot and Rickshaw Stand — easy to find, easy to reach.
        </p>
      </div>

      <div className="loc-grid" style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "clamp(20px,3vw,36px)", alignItems: "start" }}>
        {/* Info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {infoCards.map(card => (
            <div key={card.title} className={`rev icard-hover ${visible ? "on" : ""}`}
              style={{ transitionDelay: card.delay, background: "var(--white)", border: "1px solid var(--cream3)", borderRadius: 14, padding: "clamp(16px,3vw,22px) clamp(16px,3vw,22px)", boxShadow: "var(--sh)", transition: "all .25s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(27,61,47,.07)", border: "1px solid rgba(27,61,47,.09)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".95rem", flexShrink: 0 }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: ".97rem", color: "var(--ink)" }}>{card.title}</h3>
              </div>
              <div style={{ fontSize: "var(--fs-small)", color: "var(--ink2)", lineHeight: 1.7 }}>{card.content}</div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className={`rev ${visible ? "on" : ""}`} style={{ transitionDelay: ".1s", borderRadius: 24, overflow: "hidden", boxShadow: "var(--shl)", border: "1px solid var(--cream3)", height: "clamp(300px,40vw,460px)" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.0!2d72.7587!3d19.7958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71f1b5a3a1d1b%3A0x0!2zQm9pc2FyLCBNYWhhcmFzaHRyYQ!5e0!3m2!1sen!2sin!4v1234"
            width="100%" height="100%"
            style={{ border: "none", display: "block" }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="All Care Dental Clinic — Boisar location on Google Maps"
          />
        </div>
      </div>
    </section>
  );
}
