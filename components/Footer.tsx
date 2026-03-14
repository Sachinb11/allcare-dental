
"use client";
export default function Footer() {
  const year = new Date().getFullYear();
  const goto = (id: string) => {
    if (typeof window !== "undefined") document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "var(--forest)" }}>
      <div className="foot-body" style={{ padding: "clamp(44px,6vw,64px) 5% clamp(36px,5vw,48px)", display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "clamp(28px,4vw,56px)" }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🦷</div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--cream)" }}>All Care Dental Clinic</span>
          </div>
          <p style={{ fontSize: ".84rem", color: "rgba(250,248,244,.5)", lineHeight: 1.75, maxWidth: 270, marginBottom: 20 }}>
            Providing advanced, compassionate dental care to the Boisar community. Your smile is our priority and our pride.
          </p>
          {/* Social / trust signals */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "BDS Mumbai", bg: "rgba(196,154,74,.2)", color: "var(--gold2)", border: "rgba(196,154,74,.3)" },
              { label: "Reg. A-6039", bg: "rgba(255,255,255,.06)", color: "rgba(250,248,244,.6)", border: "rgba(255,255,255,.12)" },
              { label: "10+ Years", bg: "rgba(255,255,255,.06)", color: "rgba(250,248,244,.6)", border: "rgba(255,255,255,.12)" },
            ].map(b => (
              <span key={b.label} style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color, fontSize: ".7rem", fontWeight: 600, padding: "4px 12px", borderRadius: 50 }}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: ".95rem", fontWeight: 700, color: "var(--cream)", marginBottom: 18, letterSpacing: ".04em" }}>Navigation</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[["#services","Our Services"],["#about","About Dr. Vaishya"],["#reviews","Patient Reviews"],["#appointment","Book Appointment"],["#faq","FAQ"],["#location","Find Us"]].map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={e => { e.preventDefault(); goto(href); }}
                  style={{ fontSize: ".83rem", color: "rgba(250,248,244,.5)", transition: "color .2s", display: "inline-block" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--gold2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(250,248,244,.5)"; }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: ".95rem", fontWeight: 700, color: "var(--cream)", marginBottom: 18, letterSpacing: ".04em" }}>Contact</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["tel:7620750026","📞 7620750026"],
              ["tel:9762788098","📱 9762788098"],
              ["mailto:pravinvaishya@yahoo.com","✉️ pravinvaishya@yahoo.com"],
              ["https://wa.me/917620750026","💬 WhatsApp Us"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ fontSize: ".83rem", color: "rgba(250,248,244,.5)", transition: "color .2s", display: "inline-block" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--gold2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(250,248,244,.5)"; }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {/* Emergency call */}
          <a href="tel:7620750026" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 20, background: "rgba(220,38,38,.15)", border: "1px solid rgba(220,38,38,.3)", color: "#fca5a5", padding: "9px 18px", borderRadius: 50, fontSize: ".78rem", fontWeight: 700, transition: "all .2s" }}
            onMouseEnter={e => { const t = e.currentTarget; t.style.background = "rgba(220,38,38,.3)"; }}
            onMouseLeave={e => { const t = e.currentTarget; t.style.background = "rgba(220,38,38,.15)"; }}>
            🚨 Emergency: 7620750026
          </a>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.08)", margin: "0 5%" }} />
      <div style={{ padding: "18px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: ".76rem", color: "rgba(250,248,244,.32)" }}>
        <span>© {year} All Care Dental Clinic · Dr. Pravin Vaishya · Reg. A-6039</span>
        <span>Boisar (W) – 401 501, Maharashtra, India</span>
      </div>
    </footer>
  );
}
