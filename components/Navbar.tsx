"use client";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#services", label: "Services"  },
  { href: "#about",    label: "About"     },
  { href: "#reviews",  label: "Reviews"   },
  { href: "#gallery",  label: "Gallery"   },
  { href: "#faq",      label: "FAQ"       },
  { href: "#location", label: "Location"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const goto = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const wasOpen = menuOpen;
    setMenuOpen(false);
    setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }), wasOpen ? 320 : 0);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar" style={{ background:"var(--forest)", color:"rgba(255,255,255,.72)", fontSize:".78rem", padding:"8px 5%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:18, alignItems:"center" }} className="trust-left-grp">
          <span>📍 Shop 137/E, Arihant Aptt., Ostwal Empire, Boisar (W) – 401 501</span>
          <span style={{ color:"rgba(255,255,255,.2)" }}>|</span>
          <a href="mailto:pravinvaishya@yahoo.com" style={{ color:"rgba(255,255,255,.75)" }}>✉ pravinvaishya@yahoo.com</a>
        </div>
        <div style={{ display:"flex", gap:18, alignItems:"center" }}>
          <a href="tel:7620750026" style={{ color:"rgba(255,255,255,.75)" }}>📞 7620750026</a>
          <span style={{ color:"rgba(255,255,255,.2)" }}>|</span>
          <a href="tel:9762788098" style={{ color:"rgba(255,255,255,.75)" }}>📱 9762788098</a>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:500, background:"rgba(250,248,244,.97)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", borderBottom:"1px solid var(--cream3)", height:68, padding:"0 5%", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow: scrolled ? "var(--shm)" : "none", transition:"box-shadow .35s" }}>
        {/* Logo */}
        <a href="#hero" onClick={e => goto(e,"#hero")} style={{ display:"flex", alignItems:"center", gap:11, flexShrink:0, textDecoration:"none" }}>
          <div style={{ width:42, height:42, background:"var(--forest)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.35rem", boxShadow:"0 4px 14px rgba(27,61,47,.28)", flexShrink:0 }}>🦷</div>
          <div>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.08rem", fontWeight:700, color:"var(--ink)", display:"block", lineHeight:1.1 }}>All Care Dental Clinic</span>
            <span style={{ fontSize:".67rem", color:"var(--ink3)", letterSpacing:".08em", textTransform:"uppercase", display:"block" }}>Dr. Pravin Vaishya · Boisar</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:2, listStyle:"none" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={e => goto(e, href)}
                style={{ color:"var(--ink2)", fontSize:".87rem", fontWeight:500, padding:"8px 13px", borderRadius:8, display:"block", transition:"all .2s" }}
                onMouseEnter={e => { const t=e.currentTarget; t.style.color="var(--forest)"; t.style.background="rgba(27,61,47,.07)"; }}
                onMouseLeave={e => { const t=e.currentTarget; t.style.color="var(--ink2)"; t.style.background=""; }}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#appointment" onClick={e => goto(e,"#appointment")} style={{ background:"var(--forest)", color:"var(--cream)", padding:"10px 22px", borderRadius:50, fontWeight:600, fontSize:".87rem", display:"inline-flex", alignItems:"center", gap:7, boxShadow:"0 4px 18px rgba(27,61,47,.26)", marginLeft:6, transition:"all .25s", whiteSpace:"nowrap" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=""; }}>
              <span style={{ width:7, height:7, background:"var(--gold2)", borderRadius:"50%", display:"inline-block", animation:"pdotAnim 1.8s ease-in-out infinite" }} />
              Book Appointment
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
          style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:"10px 4px", flexDirection:"column", gap:5, alignItems:"flex-end", minWidth:44, minHeight:44, justifyContent:"center" }}>
          {[22, 16, 20].map((w, i) => (
            <span key={i} style={{ display:"block", height:2, background:"var(--ink)", borderRadius:2, transition:"all .3s var(--ease)",
              width: menuOpen ? 22 : w,
              transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"translateX(8px)") : "",
              opacity: menuOpen && i===1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      {/* Mobile Backdrop */}
      <div onClick={() => setMenuOpen(false)} style={{ position:"fixed", inset:0, zIndex:490, background:"rgba(22,33,25,.5)", backdropFilter:"blur(4px)", opacity: menuOpen?1:0, pointerEvents: menuOpen?"auto":"none", transition:"opacity .3s" }} />

      {/* Mobile Drawer */}
      <div style={{ position:"fixed", top:0, right:0, bottom:0, zIndex:495, width:"min(310px, 92vw)", background:"var(--forest)", transform: menuOpen?"translateX(0)":"translateX(105%)", transition:"transform .36s var(--ease)", display:"flex", flexDirection:"column", padding:"76px 28px 36px", overflowY:"auto" }}>
        {/* Close */}
        <button onClick={() => setMenuOpen(false)} aria-label="Close" style={{ position:"absolute", top:18, right:18, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", borderRadius:"50%", width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--cream)", fontSize:"1.3rem", cursor:"pointer" }}>×</button>

        {/* Drawer logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32, paddingBottom:24, borderBottom:"1px solid rgba(255,255,255,.1)" }}>
          <div style={{ width:36, height:36, background:"rgba(255,255,255,.1)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem" }}>🦷</div>
          <div>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:".98rem", fontWeight:700, color:"var(--cream)", display:"block" }}>All Care Dental</span>
            <span style={{ fontSize:".65rem", color:"var(--gold2)", display:"block" }}>Dr. Pravin Vaishya</span>
          </div>
        </div>

        {/* Links */}
        <nav style={{ display:"flex", flexDirection:"column", gap:2 }}>
          {NAV_LINKS.map(({ href, label }, i) => (
            <a key={href} href={href} onClick={e => goto(e, href)} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem", fontWeight:600, color:"rgba(250,248,244,.82)", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,.07)", transition:"color .2s, padding-left .2s",
              opacity: menuOpen?1:0, transform: menuOpen?"translateX(0)":"translateX(20px)", transitionDelay:`${i*45}ms` }}
              onMouseEnter={e => { const t=e.currentTarget; t.style.color="var(--gold2)"; t.style.paddingLeft="8px"; }}
              onMouseLeave={e => { const t=e.currentTarget; t.style.color="rgba(250,248,244,.82)"; t.style.paddingLeft="0"; }}>
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ marginTop:"auto", paddingTop:28, display:"flex", flexDirection:"column", gap:11 }}>
          <a href="#appointment" onClick={e => goto(e,"#appointment")} style={{ background:"var(--gold)", color:"var(--forest)", padding:"14px 24px", borderRadius:50, fontWeight:700, fontSize:".94rem", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 6px 22px rgba(196,154,74,.38)" }}>📅 Book Appointment</a>
          <a href="tel:7620750026" style={{ background:"rgba(255,255,255,.08)", color:"var(--cream)", border:"1px solid rgba(255,255,255,.18)", padding:"13px 24px", borderRadius:50, fontWeight:600, fontSize:".94rem", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>📞 Call: 7620750026</a>
        </div>

        <p style={{ marginTop:18, fontSize:".73rem", color:"rgba(250,248,244,.32)", textAlign:"center", lineHeight:1.6 }}>
          Mon–Sat · 9:30–12:30 & 4:30–8:00<br />
          <span style={{ color:"#fca5a5" }}>Closed Sundays</span>
        </p>
      </div>
    </>
  );
}
