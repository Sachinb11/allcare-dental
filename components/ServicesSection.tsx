"use client";
import { useEffect, useRef, useState } from "react";

const services = [
  { n:"01 — Root Canal",  icon:"🔬", title:"Root Canal Treatment", desc:"Pain-free procedures using modern rotary instruments to eliminate infection and save your natural teeth comfortably." },
  { n:"02 — Implants",    icon:"🦷", title:"Dental Implants",       desc:"Permanent titanium implants that look, feel, and function exactly like natural teeth — a lifelong smile solution." },
  { n:"03 — Replacement", icon:"💎", title:"Teeth Replacement",     desc:"Bridges, full and partial dentures, and full-arch restorations — complete replacement tailored precisely to you." },
  { n:"04 — Gum Care",    icon:"🩺", title:"Gum Treatment & Surgery",desc:"Comprehensive treatment for all gum diseases, periodontal conditions, and oral surgical procedures." },
  { n:"05 — Whitening",   icon:"✨", title:"Teeth Bleaching (UV)",   desc:"Professional UV light whitening that brightens your smile by several shades visibly in just one single session." },
  { n:"06 — Restorations",icon:"🔧", title:"All Restorations",       desc:"Composite fillings, ceramic crowns, veneers, inlays — complete restorative procedures to rebuild your smile." },
];

function SectionEye({ text }: { text: string }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:".73rem", fontWeight:700, color:"var(--forest3)", letterSpacing:".18em", textTransform:"uppercase", marginBottom:12 }}>
      <span style={{ width:22, height:1, background:"var(--forest3)", opacity:.6, display:"inline-block" }} />
      {text}
      <span style={{ width:22, height:1, background:"var(--forest3)", opacity:.6, display:"inline-block" }} />
    </div>
  );
}

export { SectionEye };

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{ padding:"var(--sec-pad)", background:"var(--cream2)" }} ref={ref}>
      <div className={`rev ${visible?"on":""}`} style={{ textAlign:"center", marginBottom:52 }}>
        <SectionEye text="What We Offer" />
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"var(--fs-h2)", fontWeight:600, lineHeight:1.08, letterSpacing:"-.02em", color:"var(--ink)", marginBottom:14 }}>
          Our <em style={{ color:"var(--forest)", fontStyle:"italic", fontWeight:400 }}>Treatments</em>
        </h2>
        <p style={{ fontSize:"var(--fs-body)", color:"var(--ink2)", lineHeight:1.78, fontWeight:300, maxWidth:520, margin:"0 auto" }}>
          Comprehensive dental care using modern techniques for every member of your family.
        </p>
      </div>

      <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"clamp(14px,2vw,20px)" }}>
        {services.map((s, i) => (
          <div key={s.title} className={`rev svcard-inner ${visible?"on":""}`}
            style={{ transitionDelay:`${0.04+i*0.05}s`, background:"var(--white)", border:"1px solid var(--cream3)", borderRadius:24, padding:"clamp(22px,3vw,32px) clamp(18px,3vw,28px)", position:"relative", overflow:"hidden", transition:"all .32s var(--ease)", boxShadow:"var(--sh)" }}>
            <div className="svcard-bar" style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--forest),var(--gold))", transform:"scaleX(0)", transformOrigin:"left", transition:"transform .35s var(--ease)" }} />
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:".78rem", color:"var(--ink3)", letterSpacing:".1em", marginBottom:16, fontWeight:400 }}>{s.n}</div>
            <div className="svcard-ico" style={{ width:50, height:50, borderRadius:13, background:"rgba(27,61,47,.06)", border:"1px solid rgba(27,61,47,.09)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", marginBottom:16, transition:"all .25s" }}>{s.icon}</div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:clamp("1.05rem","1.8vw","1.18rem"), fontWeight:600, color:"var(--ink)", marginBottom:10 }}>{s.title}</h3>
            <p style={{ fontSize:"var(--fs-small)", color:"var(--ink2)", lineHeight:1.7, fontWeight:300 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Tiny helper for inline clamp — only used as fallback
function clamp(min: string, mid: string, max: string) {
  return `clamp(${min},${mid},${max})`;
}
