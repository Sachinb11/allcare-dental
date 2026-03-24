'use client';

import Reveal from '@/lib/RevealWrapper';

/* ── Types ── */
interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  initials: string;
}

/* ── Data ── */
const REVIEWS: Review[] = [
  {
    name: 'Anjali Sharma',
    date: 'March 2025',
    rating: 5,
    text: 'Dr. Pravin is absolutely wonderful. I had a root canal done and felt no pain at all. The clinic is spotless and the staff are very welcoming. Highly recommend!',
    initials: 'AS',
  },
  {
    name: 'Ravi Patil',
    date: 'January 2025',
    rating: 5,
    text: 'Got dental implants here and the results are outstanding. Looks and feels just like natural teeth. Dr. Vaishya explained everything clearly before and after the procedure.',
    initials: 'RP',
  },
  {
    name: 'Meena Joshi',
    date: 'February 2025',
    rating: 5,
    text: 'UV teeth whitening done in just one session — my smile is noticeably brighter. The clinic is very hygienic and modern. Will definitely come back for all dental needs.',
    initials: 'MJ',
  },
  {
    name: 'Sunil Desai',
    date: 'December 2024',
    rating: 4,
    text: 'Very professional and patient-friendly doctor. He took time to understand my gum problem and the treatment worked perfectly. Convenient location near Bus Depot.',
    initials: 'SD',
  },
];

/* ── Star renderer ── */
function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="gr-stars" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={i < rating ? 'gr-star filled' : 'gr-star'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ── Google G icon ── */
function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function GoogleReviews() {
  return (
    <section className="sec secw gr-section" id="google-reviews" aria-labelledby="gr-title">
      <Reveal className="shead c">
        <div className="seye">What Our Patients Say</div>
        <h2 className="stit" id="gr-title">
          Google <em>Reviews</em>
        </h2>
        <p className="sdesc">
          Real feedback from real patients — see why Boisar trusts All Care Dental Clinic.
        </p>
      </Reveal>

      {/* Overall rating badge */}
      <Reveal>
        <div className="gr-overall">
          <div className="gr-overall-inner">
            <GoogleIcon />
            <div className="gr-overall-score">
              <span className="gr-overall-num">4.8</span>
              <Stars rating={5} />
              <span className="gr-overall-label">Based on Google Reviews</span>
            </div>
            <div className="gr-divider" aria-hidden="true" />
            <a
              href="https://g.page/r/Cd9R32kfHe_UEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="gr-view-btn"
              aria-label="View All Care Dental Clinic on Google Maps"
            >
              <GoogleIcon />
              View on Google
            </a>
          </div>
        </div>
      </Reveal>

      {/* Review cards grid */}
      <div className="gr-grid">
        {REVIEWS.map((review, i) => (
          <Reveal key={review.name} delay={i * 0.07}>
            <article className="gr-card" aria-label={`Review by ${review.name}`}>
              {/* Card top stripe */}
              <div className="gr-card-stripe" aria-hidden="true" />

              <div className="gr-card-head">
                <div className="gr-avatar" aria-hidden="true">
                  {review.initials}
                </div>
                <div className="gr-meta">
                  <span className="gr-name">{review.name}</span>
                  <span className="gr-date">{review.date}</span>
                </div>
                <div className="gr-glogo" aria-hidden="true">
                  <GoogleIcon />
                </div>
              </div>

              <Stars rating={review.rating} />

              <p className="gr-text">{review.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
