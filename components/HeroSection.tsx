"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const ctrRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const targets = [10, 5000, 6];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLSpanElement;
        const target = parseInt(el.dataset.t || "0", 10);
        let start: number | null = null;
        const dur = 1800;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const v = Math.round(target * ease);
          el.textContent = target >= 1000 && v >= 1000 ? (v / 1000).toFixed(1) + "k" : String(v);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target >= 1000 ? (target / 1000).toFixed(1) + "k" : String(target);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });

    ctrRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const goto = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero">
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 108px);
        }
        .hero-left {
          background: var(--forest);
          padding: clamp(48px,7vw,80px) 6% clamp(48px,7vw,80px) 5%;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
        }
        .hero-left::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle,rgba(196,154,74,.08) 1.5px,transparent 1.5px);
          background-size: 26px 26px; pointer-events: none;
        }
        .hl-diagonal::after {
          content: '';
          position: absolute; top:0; right:-40px; bottom:0; width:80px;
          background: var(--forest);
          clip-path: polygon(0 0,50% 0,100% 100%,0 100%);
          z-index: 2;
        }
        .hero-right {
          background: var(--cream);
          padding: clamp(40px,6vw,80px) 5% clamp(40px,6vw,80px) 10%;
          display: flex; flex-direction: column; justify-content: center; gap: 20px;
          position: relative; z-index: 1;
        }
        .hero-stats {
          display: flex; gap: 0; margin-top: 52px; padding-top: 28px;
          border-top: 1px solid rgba(250,248,244,.1);
        }
        .hero-stat {
          flex: 1; padding-right: 18px; margin-right: 18px;
          border-right: 1px solid rgba(250,248,244,.1);
        }
        .hero-stat:last-child { border: none; margin: 0; padding: 0; }
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-gold {
          background: var(--gold); color: var(--forest);
          padding: clamp(12px,2vw,14px) clamp(22px,4vw,32px);
          border-radius: 50px; font-weight: 700; font-size: clamp(.85rem,2vw,.94rem);
          display: inline-flex; align-items: center; gap: 8px;
          transition: all .25s var(--ease);
          box-shadow: 0 6px 24px rgba(196,154,74,.38); border: none; cursor: pointer;
          min-height: 48px; white-space: nowrap;
        }
        .btn-gold:hover { background: var(--gold2); transform: translateY(-3px); box-shadow: 0 12px 36px rgba(196,154,74,.48); }
        .btn-outline-w {
          background: transparent; color: rgba(250,248,244,.8);
          padding: clamp(11px,2vw,13px) clamp(20px,4vw,28px);
          border-radius: 50px; font-weight: 500; font-size: clamp(.85rem,2vw,.94rem);
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid rgba(250,248,244,.22); transition: all .25s;
          min-height: 48px; white-space: nowrap; cursor: pointer;
          text-decoration: none;
        }
        .btn-outline-w:hover { border-color: var(--gold2); color: var(--gold3); }
        .hours-card {
          background: var(--white); border: 1px solid var(--cream3);
          border-radius: 24px; padding: clamp(20px,4vw,28px);
          box-shadow: var(--shm); position: relative; overflow: hidden;
        }
        .contact-card {
          background: var(--forest); border-radius: 24px;
          padding: clamp(18px,3vw,24px) clamp(20px,4vw,28px);
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        /* ── 1100px: stack columns ── */
        @media(max-width:1100px) {
          .hero-grid { grid-template-columns: 1fr !important; min-height: unset; }
          .hl-diagonal::after { display: none; }
          .hero-right { padding: clamp(32px,5vw,52px) 5% !important; }
        }
        /* ── 768px: mobile ── */
        @media(max-width:768px) {
          .hero-left { padding: 48px 6% 40px !important; }
          .hero-stats { gap: 12px !important; margin-top: 36px !important; }
          .hero-stat  { padding-right: 12px !important; margin-right: 12px !important; }
          .hero-btns  { flex-direction: column; }
          .hero-btns > * { width: 100%; justify-content: center; }
          .contact-card { flex-direction: column; align-items: flex-start; }
          .cbtns  { flex-direction: column; width: 100%; }
          .cbtns a { justify-content: center; }
        }
      `}</style>

      <div className="hero-grid">
        {/* LEFT */}
        <div className="hero-left hl-diagonal">
          <div className="hanim-1" style={{ display:"inline-flex", alignItems:"center", gap:10, color:"var(--gold2)", fontSize:".76rem", fontWeight:600, letterSpacing:".2em", textTransform:"uppercase", marginBottom:24 }}>
            <span style={{ width:28, height:1, background:"var(--gold2)", display:"inline-block" }} />
            Boisar&apos;s Trusted Dental Clinic
          </div>

          <h1 className="hanim-2" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"var(--fs-hero)", fontWeight:600, color:"var(--cream)", lineHeight:1.0, letterSpacing:"-.025em", marginBottom:8 }}>
            Your Perfect<br />
            <em style={{ fontStyle:"italic", color:"var(--gold3)", fontWeight:400 }}>Smile</em> Starts<br />
            Here.
          </h1>

          <p className="hanim-3" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.1rem,2vw,1.75rem)", fontWeight:400, fontStyle:"italic", color:"rgba(250,248,244,.4)", marginBottom:28 }}>
            Advanced care, gentle hands.
          </p>

          <p className="hanim-4" style={{ fontSize:"clamp(.88rem,2vw,.96rem)", color:"rgba(250,248,244,.65)", lineHeight:1.8, fontWeight:300, maxWidth:420, marginBottom:40 }}>
            Dr. Pravin Vaishya B.D.S. (Mumbai) brings over a decade of expertise — combining clinical precision with genuine compassion in the heart of Boisar.
          </p>

          <div className="hanim-5 hero-btns">
            <button onClick={() => goto("#appointment")} className="btn-gold">📅 Book Your Visit</button>
            <a href="tel:7620750026" className="btn-outline-w">📞 Call Now</a>
          </div>

          <div className="hanim-6 hero-stats">
            {[{ t:"10", label:"Years Experience" }, { t:"5000", label:"Patients Treated" }, { t:"6", label:"Specialities" }].map((s, i) => (
              <div key={s.label} className="hero-stat">
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,2.6rem)", fontWeight:600, color:"var(--gold2)", lineHeight:1 }}>
                  <span ref={el => { ctrRefs.current[i] = el; }} data-t={s.t}>0</span>+
                </div>
                <div style={{ fontSize:".7rem", color:"rgba(250,248,244,.45)", textTransform:"uppercase", letterSpacing:".1em", marginTop:4, fontWeight:500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right hanim-r">
          {/* Hours Card */}
          <div className="hours-card">
            <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:"linear-gradient(90deg,var(--forest),var(--forest3),var(--gold))" }} />
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:"rgba(27,61,47,.07)", border:"1px solid rgba(27,61,47,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", flexShrink:0 }}>⏰</div>
              <div>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", fontWeight:600, color:"var(--ink)", display:"block" }}>Clinic Hours</span>
                <span style={{ fontSize:".75rem", color:"var(--ink3)", display:"block" }}>Monday to Saturday</span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              {[{ icon:"☀️", label:"Morning", time:"9:30 – 12:30 PM" }, { icon:"🌆", label:"Evening", time:"4:30 – 8:00 PM" }].map(sl => (
                <div key={sl.label} style={{ background:"rgba(27,61,47,.05)", border:"1px solid rgba(27,61,47,.08)", borderRadius:10, padding:"12px 14px" }}>
                  <div style={{ fontSize:".68rem", color:"var(--ink3)", textTransform:"uppercase", letterSpacing:".08em", fontWeight:600 }}>{sl.icon} {sl.label}</div>
                  <div style={{ fontSize:".88rem", fontWeight:600, color:"var(--forest)", marginTop:3 }}>{sl.time}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fef2f2", border:"1px solid #fecaca", color:"var(--red)", fontSize:".76rem", fontWeight:600, padding:"6px 12px", borderRadius:7 }}>
              🚫 Sunday — Closed
            </div>
          </div>

          {/* Contact Card */}
          <div className="contact-card">
            <div>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:600, color:"var(--cream)", marginBottom:3 }}>Get in Touch</h4>
              <p style={{ fontSize:".78rem", color:"rgba(250,248,244,.55)" }}>Call or WhatsApp to book instantly</p>
            </div>
            <div className="cbtns" style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <a href="tel:7620750026" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"11px 18px", borderRadius:50, fontSize:".84rem", fontWeight:600, background:"var(--gold)", color:"var(--forest)", transition:"all .2s", whiteSpace:"nowrap", minHeight:44 }}>📞 7620750026</a>
              <a href="https://wa.me/917620750026?text=Hello%20Dr.%20Pravin%2C%20I%27d%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:50, fontSize:".84rem", fontWeight:600, background:"rgba(255,255,255,.1)", color:"rgba(250,248,244,.85)", border:"1px solid rgba(255,255,255,.18)", transition:"all .2s", whiteSpace:"nowrap", minHeight:44 }}>💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
