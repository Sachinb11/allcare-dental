"use client";
import { useEffect, useRef, useState } from "react";

const cases = [
  { label: "Teeth Whitening", before: "Stained & yellowed enamel", after: "8 shades brighter smile",   icon: "✨", color: "#fef9ec" },
  { label: "Dental Implants", before: "Missing tooth gap",          after: "Natural-looking crown",      icon: "🦷", color: "#ecfdf5" },
  { label: "Smile Makeover",  before: "Uneven, chipped teeth",      after: "Perfect symmetry",           icon: "😁", color: "#eff6ff" },
  { label: "Root Canal",      before: "Severe decay & pain",        after: "Saved natural tooth",        icon: "🔬", color: "#fdf4ff" },
];

function CaseCard({ c, i, visible }: { c: typeof cases[0]; i: number; visible: boolean }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`rev ${visible ? "on" : ""}`} style={{ transitionDelay: `${i * .08}s` }}>
      <style>{`
        .flip-wrap { perspective: 1000px; cursor: pointer; height: clamp(200px,25vw,240px); }
        .flip-inner { position: relative; width: 100%; height: 100%; transition: transform .55s cubic-bezier(.22,1,.36,1); transform-style: preserve-3d; }
        .flip-wrap.flipped .flip-inner { transform: rotateY(180deg); }
        .flip-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: clamp(20px,4vw,28px); text-align: center; }
        .flip-back { transform: rotateY(180deg); }
        .flip-hint { font-size: .68rem; color: rgba(27,61,47,.4); margin-top: 14px; letter-spacing: .04em; }
        @media(max-width:480px){ .flip-wrap{ height: 200px; } }
      `}</style>
      <div className={`flip-wrap ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
        onKeyDown={e => e.key === "Enter" && setFlipped(!flipped)}
        role="button" tabIndex={0} aria-label={`${c.label} before and after`}>
        <div className="flip-inner">
          {/* BEFORE face */}
          <div className="flip-face" style={{ background: c.color, border: "2px solid var(--cream3)" }}>
            <span style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", marginBottom: 10 }}>{c.icon}</span>
            <div style={{ fontSize: ".62rem", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 5 }}>Before</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(.95rem,2vw,1.15rem)", fontWeight: 600, color: "var(--ink)", marginBottom: 5 }}>{c.label}</div>
            <div style={{ fontSize: ".8rem", color: "var(--ink3)" }}>{c.before}</div>
            <div className="flip-hint">Tap to see result →</div>
          </div>
          {/* AFTER face */}
          <div className="flip-face flip-back" style={{ background: "linear-gradient(135deg,var(--forest),var(--forest2))", border: "2px solid var(--forest3)" }}>
            <div style={{ position: "absolute", top: 12, right: 14, background: "var(--gold)", color: "var(--forest)", fontSize: ".6rem", fontWeight: 800, padding: "3px 10px", borderRadius: 50, letterSpacing: ".12em", textTransform: "uppercase" }}>AFTER</div>
            <span style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", marginBottom: 10 }}>{c.icon}</span>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(.95rem,2vw,1.15rem)", fontWeight: 600, color: "var(--cream)", marginBottom: 7 }}>{c.label}</div>
            <div style={{ fontSize: ".8rem", color: "var(--gold2)" }}>{c.after}</div>
            <div style={{ display: "flex", gap: 3, marginTop: 14 }}>
              {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "var(--gold3)", fontSize: ".85rem" }}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="gallery" style={{ padding: "var(--sec-pad)", background: "var(--cream2)" }} ref={ref}>
      <div className={`rev ${visible ? "on" : ""}`} style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: ".73rem", fontWeight: 700, color: "var(--forest3)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>
          <span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />Smile Transformations<span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "var(--fs-h2)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-.02em", color: "var(--ink)", marginBottom: 14 }}>
          Before &amp; <em style={{ color: "var(--forest)", fontStyle: "italic", fontWeight: 400 }}>After Gallery</em>
        </h2>
        <p style={{ fontSize: "var(--fs-body)", color: "var(--ink2)", lineHeight: 1.78, fontWeight: 300, maxWidth: 420, margin: "0 auto" }}>
          Real results from real patients. Tap each card to reveal the transformation.
        </p>
      </div>
      <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(14px,2vw,20px)" }}>
        {cases.map((c, i) => <CaseCard key={c.label} c={c} i={i} visible={visible} />)}
      </div>
    </section>
  );
}
