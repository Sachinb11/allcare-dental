"use client";
import { useEffect, useRef, useState } from "react";

const faqs = [
  { q: "Is root canal treatment painful?",          a: "No! With modern rotary technology and effective local anaesthesia, root canal treatment at our clinic is completely painless. Most patients are surprised at how comfortable the procedure is." },
  { q: "How long does a dental implant take?",      a: "The implant placement itself takes about 1–2 hours per implant. The full process, including healing and crown placement, typically takes 3–6 months. We'll create a personalised plan for you." },
  { q: "How much does teeth whitening cost?",       a: "Our professional UV light whitening starts at an affordable price and delivers results up to 8 shades brighter in a single session. Contact us for a personalised quote." },
  { q: "Can I book on Sunday?",                     a: "We are closed on Sundays. Our clinic is open Monday to Saturday — mornings from 9:30 AM to 12:30 PM and evenings from 4:30 PM to 8:00 PM." },
  { q: "Do you treat children?",                    a: "Absolutely! We provide complete paediatric dental care in a child-friendly environment. We make dental visits fun and stress-free for kids of all ages." },
  { q: "Which areas do you serve near Boisar?",     a: "We serve patients from Boisar, Palghar, Tarapur, Kelwa, Boisar East, Navapur and surrounding areas. Our central location near the Bus Depot makes us easy to reach." },
  { q: "Do you offer EMI or payment plans?",        a: "Yes! We offer flexible payment options and EMI facilities to ensure you get the care you need without financial stress." },
  { q: "How do I know if I need a root canal?",     a: "Common signs include severe toothache, prolonged sensitivity to hot/cold, tooth discolouration, or swelling near the gum. Book a consultation and we'll diagnose accurately with digital X-rays." },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id="faq" style={{ padding: "var(--sec-pad)", background: "var(--white)" }} ref={ref}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "clamp(32px,5vw,64px)", alignItems: "start" }}>
        {/* Left */}
        <div className={`rev ${visible ? "on" : ""}`} style={{ position: "sticky", top: 88 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: ".73rem", fontWeight: 700, color: "var(--forest3)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 14 }}>
            <span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />Common Questions
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "var(--fs-h2)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-.02em", color: "var(--ink)", marginBottom: 18 }}>
            Frequently Asked{" "}<em style={{ color: "var(--forest)", fontStyle: "italic", fontWeight: 400 }}>Questions</em>
          </h2>
          <p style={{ fontSize: "var(--fs-body)", color: "var(--ink2)", lineHeight: 1.78, fontWeight: 300, marginBottom: 28 }}>
            Have more questions? We&apos;re happy to help. Call us or book a free consultation.
          </p>
          <a href="tel:7620750026" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--forest)", color: "var(--cream)", padding: "12px 26px", borderRadius: 50, fontWeight: 600, fontSize: ".88rem", boxShadow: "0 4px 18px rgba(27,61,47,.28)", transition: "all .2s", minHeight: 48 }}>
            📞 Call Us Now
          </a>

          {/* Doctor badge */}
          <div style={{ marginTop: 28, padding: "18px 20px", background: "var(--forest)", borderRadius: 16, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, background: "rgba(255,255,255,.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>👨‍⚕️</div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, color: "var(--cream)", fontSize: "1rem" }}>Dr. Pravin Vaishya</div>
              <div style={{ fontSize: ".72rem", color: "var(--gold2)" }}>10+ years · BDS Mumbai · Reg. A-6039</div>
            </div>
          </div>
        </div>

        {/* Right — accordion */}
        <div className={`rev ${visible ? "on" : ""}`} style={{ transitionDelay: ".1s", display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}
                style={{ background: isOpen ? "var(--forest)" : "var(--cream2)", border: `1px solid ${isOpen ? "var(--forest)" : "var(--cream3)"}`, borderRadius: 14, overflow: "hidden", transition: "all .3s var(--ease)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "clamp(14px,2vw,18px) clamp(16px,3vw,22px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left", minHeight: 54 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(.95rem,2vw,1.05rem)", fontWeight: 600, color: isOpen ? "var(--cream)" : "var(--ink)", lineHeight: 1.35 }}>{faq.q}</span>
                  <span style={{ color: isOpen ? "var(--gold2)" : "var(--forest3)", fontSize: "1.4rem", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform .3s", lineHeight: 1 }}>+</span>
                </button>
                <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height .4s var(--ease)" }}>
                  <div style={{ padding: "0 clamp(16px,3vw,22px) clamp(14px,2vw,18px)", fontSize: "var(--fs-small)", color: isOpen ? "rgba(250,248,244,.78)" : "var(--ink2)", lineHeight: 1.75 }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
