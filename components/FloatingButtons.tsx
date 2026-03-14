"use client";
import { useEffect, useRef, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function FloatingButtons() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [showBook, setShowBook] = useState(false);

  // ── Custom cursor (desktop only) ───────────────────────────────────────────
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only active on pointer:fine devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();

    // Hover glow effect
    const addHover = (el: Element) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("ch"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("ch"));
    };
    document.querySelectorAll("a,button,.svcard-inner,.rev-card,.flip-card,.aside-card,.icard-hover").forEach(addHover);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Floating book button logic ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const appt = document.getElementById("appointment");
      if (!hero || !appt) return;
      const heroBottom  = hero.getBoundingClientRect().bottom;
      const apptTop     = appt.getBoundingClientRect().top;
      const apptBottom  = appt.getBoundingClientRect().bottom;
      const inAppt      = apptTop < window.innerHeight && apptBottom > 0;
      setShowBook(heroBottom < 0 && !inAppt);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const gotoAppt = () => document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Custom cursor dots */}
      <div id="cdot"  ref={dotRef}  />
      <div id="cring" ref={ringRef} />

      {/* Floating "Book Appointment" pill */}
      <button
        onClick={gotoAppt}
        className={`float-book ${showBook ? "show" : ""}`}
        aria-label="Book an appointment"
      >
        📅 Book Appointment
      </button>

      {/* WhatsApp FAB with pulse */}
      <WhatsAppButton />

      {/* Sticky mobile call bar (hidden on desktop via CSS) */}
      <a
        href="tel:7620750026"
        className="mobile-cta-bar"
        aria-label="Call the clinic"
      >
        📞 Call Now: 7620750026
      </a>
    </>
  );
}
