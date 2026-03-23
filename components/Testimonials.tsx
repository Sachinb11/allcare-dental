'use client';

import Reveal from '@/lib/RevealWrapper';
import WhatsAppIcon from '@/components/WhatsAppIcon';

/* ── Types ── */
interface Testimonial {
  name: string;
  location: string;
  treatment: string;
  rating: number;
  quote: string;
  initials: string;
}

/* ── Data ── */
const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Priya Nair',
    location: 'Boisar',
    treatment: 'Root Canal Treatment',
    rating: 5,
    quote:
      'I was terrified of root canal treatment but Dr. Pravin made it completely painless. He explained every step beforehand and I was out in under an hour. Best dental experience I have ever had.',
    initials: 'PN',
  },
  {
    name: 'Aditya Kulkarni',
    location: 'Palghar',
    treatment: 'Dental Implants',
    rating: 5,
    quote:
      'The implants look and feel exactly like my natural teeth. The procedure was smooth and Dr. Vaishya was very patient with all my questions. Worth every rupee — I can smile confidently again.',
    initials: 'AK',
  },
  {
    name: 'Kavita More',
    location: 'Boisar',
    treatment: 'UV Teeth Whitening',
    rating: 5,
    quote:
      'I had UV whitening done and my teeth are several shades brighter after just one session. The clinic is very clean and hygienic. Dr. Pravin is kind and professional. Strongly recommended!',
    initials: 'KM',
  },
  {
    name: 'Rahul Sawant',
    location: 'Vasai',
    treatment: 'Gum Treatment',
    rating: 5,
    quote:
      'Had a serious gum problem and came to All Care Dental Clinic on a recommendation. Dr. Vaishya diagnosed everything perfectly and the treatment resolved my issue completely. Very happy with the results.',
    initials: 'RS',
  },
];

/* ── Star renderer ── */
function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="tm-stars" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < rating ? 'tm-star filled' : 'tm-star'} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

/* ── Quote icon ── */
function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="tm-quote-icon"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

const WA_URL =
  "https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I'd%20like%20to%20book%20an%20appointment.";

export default function Testimonials() {
  return (
    <section
      className="sec secalt tm-section"
      id="testimonials"
      aria-labelledby="tm-title"
    >
      <Reveal className="shead c">
        <div className="seye">Patient Stories</div>
        <h2 className="stit" id="tm-title">
          What Our Patients <em>Experience</em>
        </h2>
        <p className="sdesc">
          Hear directly from patients who have transformed their smiles at All Care
          Dental Clinic.
        </p>
      </Reveal>

      {/* Testimonial cards */}
      <div className="tm-grid">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.07}>
            <article className="tm-card" aria-label={`Testimonial from ${t.name}`}>
              <QuoteIcon />
              <p className="tm-text">{t.quote}</p>
              <Stars rating={t.rating} />
              <div className="tm-footer">
                <div className="tm-avatar" aria-hidden="true">
                  {t.initials}
                </div>
                <div className="tm-info">
                  <span className="tm-name">{t.name}</span>
                  <span className="tm-meta">
                    {t.location} · {t.treatment}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal>
        <div className="tm-cta">
          <p className="tm-cta-text">
            Ready to join our happy patients? Book your visit today.
          </p>
          <div className="tm-cta-btns">
            <a href="tel:7620750026" className="bgold">
              📞 Call Now
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tm-wa-btn"
              aria-label="Book via WhatsApp"
            >
              <WhatsAppIcon size={18} />
              Book via WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
