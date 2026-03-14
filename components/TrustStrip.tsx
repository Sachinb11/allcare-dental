"use client";
import { useEffect, useRef, useState } from "react";

const items = [
  { icon: "🏛", text: "B.D.S. Mumbai University" },
  { icon: "🔬", text: "Modern Equipment" },
  { icon: "✅", text: "Reg. No. A-6039" },
  { icon: "💉", text: "Painless Procedures" },
  { icon: "🧼", text: "Sterile Environment" },
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="trust-strip" style={{ background: "var(--forest2)", padding: "16px 5%", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px,4vw,48px)", flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <div key={item.text} className={`rev ${visible ? "on" : ""}`}
          style={{ transitionDelay: `${i * 60}ms`, display: "flex", alignItems: "center", gap: 9, color: "rgba(250,248,244,.78)", fontSize: "clamp(.76rem,2vw,.83rem)", whiteSpace: "nowrap" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".88rem", flexShrink: 0 }}>{item.icon}</div>
          {item.text}
        </div>
      ))}
    </div>
  );
}
