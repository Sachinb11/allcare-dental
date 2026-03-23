'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from '@/components/WhatsAppIcon';

/* ── Animated counter ── */
function useCounter(target: number, started: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return target >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
}

function StatItem({
  target,
  label,
  started,
}: {
  target: number;
  label: string;
  started: boolean;
}) {
  const display = useCounter(target, started);
  return (
    <div className="hst">
      <div className="hstn">
        {display}+
      </div>
      <div className="hstl">{label}</div>
    </div>
  );
}

/* ── Stagger variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Left – dark panel */}
      <div className="hl">
        <motion.div
          className="htag"
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="show"
        >
          Boisar&apos;s Trusted Dental Clinic
        </motion.div>

        <motion.h1
          className="hh1"
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="show"
        >
          Your Perfect
          <br />
          <em>Smile</em> Starts
          <br />
          Here.
        </motion.h1>

        <motion.p
          className="hsub"
          variants={fadeUp}
          custom={0.28}
          initial="hidden"
          animate="show"
        >
          Advanced care, gentle hands.
        </motion.p>

        <motion.p
          className="hdesc"
          variants={fadeUp}
          custom={0.36}
          initial="hidden"
          animate="show"
        >
          Dr. Pravin Vaishya B.D.S. (Mumbai) brings over a decade of expertise —
          combining clinical precision with genuine compassion in the heart of Boisar.
        </motion.p>

        <motion.div
          className="hbtns"
          variants={fadeUp}
          custom={0.44}
          initial="hidden"
          animate="show"
        >
          <a
            href="https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I'd%20like%20to%20book%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="bgold"
          >
            <WhatsAppIcon size={17} />
            Book via WhatsApp
          </a>
          <a href="tel:7620750026" className="boutw">
            📞 Call Now
          </a>
        </motion.div>

        <motion.div
          className="hstats"
          ref={statsRef}
          variants={fadeUp}
          custom={0.52}
          initial="hidden"
          animate="show"
        >
          <StatItem target={30} label="Years Experience" started={countersStarted} />
          <StatItem target={50} label="Patients Daily" started={countersStarted} />
          <StatItem target={6} label="Specialities" started={countersStarted} />
        </motion.div>
      </div>

      {/* Right – cream panel */}
      <motion.div
        className="hr"
        variants={slideIn}
        initial="hidden"
        animate="show"
      >
        {/* Hours card */}
        <div className="hcard">
          <div className="chead">
            <div className="cicon" aria-hidden="true">⏰</div>
            <div>
              <span className="ctitle">Clinic Hours</span>
              <span className="csub">Monday to Saturday</span>
            </div>
          </div>
          <div className="slots">
            <div className="slot">
              <div className="slotl">☀️ Morning</div>
              <div className="slott">10:00 – 01:00 PM</div>
            </div>
            <div className="slot">
              <div className="slotl">🌆 Evening</div>
              <div className="slott">4:00 – 8:00 PM</div>
            </div>
          </div>
          <div className="cbadge">🚫 Sunday — Closed</div>
        </div>

        {/* Contact card */}
        <div className="ccontact">
          <div>
            <h4>Get in Touch</h4>
            <p>Call or WhatsApp to book instantly</p>
          </div>
          <div className="cbtns">
            <a href="tel:7620750026" className="cbtn cbcall">📞 7620750026</a>
            <a
              href="https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I'd%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="cbtn cbwa"
              aria-label="Book via WhatsApp"
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
