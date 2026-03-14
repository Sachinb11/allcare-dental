"use client";
import { useEffect, useRef, useState } from "react";

const reviews = [
  { name: "Ravi Sharma",  rating: 5, date: "2 weeks ago",  avatar: "R", text: "Dr. Pravin is absolutely amazing! Got my root canal done without any pain. The clinic is very clean and modern. Highly recommend to everyone in Boisar!" },
  { name: "Sneha Patil",  rating: 5, date: "1 month ago",  avatar: "S", text: "Best dentist in Boisar hands down. Very gentle and explains everything clearly. My teeth whitening results are fantastic. Staff is also very polite." },
  { name: "Amit Joshi",   rating: 5, date: "3 weeks ago",  avatar: "A", text: "Had my dental implants done here. The doctor is highly skilled and the procedure was very professional. The clinic has state-of-the-art equipment." },
  { name: "Priya Mehta",  rating: 5, date: "2 months ago", avatar: "P", text: "Took my whole family here for check-ups. Dr. Vaishya is patient and very thorough. Kids were comfortable too! Reasonable prices and excellent care." },
  { name: "Suresh Nair",  rating: 5, date: "1 week ago",   avatar: "S", text: "The gum treatment I received was outstanding. No pain, quick recovery. Dr. Pravin clearly has years of experience. Will always come here for dental needs." },
  { name: "Kavita Desai", rating: 5, date: "3 months ago", avatar: "K", text: "Fantastic experience! Needed an emergency extraction and they accommodated me same day. Very professional and caring doctor. Location is easy to find too." },
];

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} stars`} role="img">
      {"★".repeat(n).split("").map((s, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: ".88rem" }}>{s}</span>
      ))}
    </span>
  );
}

function SectionEye({ text }: { text: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: ".73rem", fontWeight: 700, color: "var(--forest3)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>
      <span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />{text}<span style={{ width: 22, height: 1, background: "var(--forest3)", opacity: .6, display: "inline-block" }} />
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="reviews" style={{ padding: "var(--sec-pad)", background: "var(--cream)" }} ref={ref}>
      {/* Heading */}
      <div className={`rev ${visible ? "on" : ""}`} style={{ textAlign: "center", marginBottom: 52 }}>
        <SectionEye text="Patient Stories" />
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "var(--fs-h2)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-.02em", color: "var(--ink)", marginBottom: 14 }}>
          What Our <em style={{ color: "var(--forest)", fontStyle: "italic", fontWeight: 400 }}>Patients Say</em>
        </h2>
        {/* Google badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--white)", border: "1px solid var(--cream3)", borderRadius: 50, padding: "9px 20px", boxShadow: "var(--sh)", marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Google"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--ink)" }}>4.9</span>
          <Stars n={5} />
          <span style={{ fontSize: ".8rem", color: "var(--ink3)" }}>Based on 120+ Google Reviews</span>
        </div>
      </div>

      {/* Review cards */}
      <div className="rev-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(14px,2vw,20px)" }}>
        {reviews.map((r, i) => (
          <article key={r.name} className={`rev rev-card ${visible ? "on" : ""}`}
            itemScope itemType="https://schema.org/Review"
            style={{ transitionDelay: `${i * .06}s`, background: "var(--white)", border: "1px solid var(--cream3)", borderRadius: 20, padding: "clamp(18px,3vw,26px) clamp(16px,3vw,24px)", boxShadow: "var(--sh)", transition: "all .3s var(--ease)" }}>
            {/* Quote mark */}
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.8rem", color: "var(--gold)", lineHeight: 1, marginBottom: 6, opacity: .35 }}>"</div>
            <p itemProp="reviewBody" style={{ fontSize: "var(--fs-small)", color: "var(--ink2)", lineHeight: 1.75, fontWeight: 300, marginBottom: 18 }}>{r.text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 11, paddingTop: 14, borderTop: "1px solid var(--cream2)" }}>
              <div aria-hidden style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold2)", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, flexShrink: 0 }}>{r.avatar}</div>
              <div style={{ flex: 1 }}>
                <div itemProp="author" itemScope itemType="https://schema.org/Person" style={{ fontWeight: 600, fontSize: ".87rem", color: "var(--ink)" }}>
                  <span itemProp="name">{r.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                  <Stars n={r.rating} />
                  <span style={{ fontSize: ".7rem", color: "var(--ink3)" }}>{r.date}</span>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Google review" style={{ opacity: .4 }}><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <a href="https://g.page/r/review" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "var(--forest)", border: "1.5px solid var(--forest)", padding: "12px 28px", borderRadius: 50, fontWeight: 600, fontSize: ".88rem", transition: "all .2s", minHeight: 48 }}
          onMouseEnter={e => { const t = e.currentTarget; t.style.background = "var(--forest)"; t.style.color = "var(--cream)"; }}
          onMouseLeave={e => { const t = e.currentTarget; t.style.background = "transparent"; t.style.color = "var(--forest)"; }}>
          ⭐ Leave a Google Review
        </a>
      </div>
    </section>
  );
}
