'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const WA_URL =
  "https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I'd%20like%20to%20book%20an%20appointment.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' sh' : ''}`} id="mainNav" aria-label="Main navigation">
      <Link href="#hero" className="nlogo">
        <div className="nlogo-icon" aria-hidden="true">🦷</div>
        <div>
          <span className="nlogo-p">All Care Dental Clinic</span>
          <span className="nlogo-s">Dr. Pravin Vaishya · Boisar</span>
        </div>
      </Link>

      {/* Desktop nav — hidden on mobile */}
      <ul className="nlinks" role="list">
        <li><Link href="#services">Services</Link></li>
        <li><Link href="#about">About</Link></li>
        <li><Link href="#location">Location</Link></li>
        <li>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nbtn"
            aria-label="Contact us on WhatsApp"
          >
            <span className="pdot" aria-hidden="true" />
            WhatsApp Us
          </a>
        </li>
      </ul>

      {/* Mobile-only WhatsApp CTA — visible only when nlinks is hidden */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-mobile-wa"
        aria-label="Contact us on WhatsApp"
      >
        <WhatsAppIcon size={18} />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}
