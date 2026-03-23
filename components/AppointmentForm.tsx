'use client';

import { useState, FormEvent } from 'react';
import Reveal from '@/lib/RevealWrapper';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const WA_URL =
  'https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I%27d%20like%20to%20book%20an%20appointment.';

export default function AppointmentForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  /* Set min date to today */
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
      setSuccess(true);
    }, 1300);
  };

  return (
    <section className="sec" id="appointment" aria-labelledby="appt-title">
      <Reveal className="shead">
        <div className="seye">Easy Online Booking</div>
        <h2 className="stit" id="appt-title">
          Book Your <em>Appointment</em>
        </h2>
        <p className="sdesc">
          Fill in the form and our team will call you to confirm within a few hours.
        </p>
      </Reveal>

      <div className="alay">
        {/* ── Form card ── */}
        <Reveal>
          <div className="fcard">
            <div className="fhead">
              <h3>Schedule Your Visit</h3>
              <p>We&apos;ll confirm your slot with a call shortly after submission.</p>
            </div>
            <div className="fbody">
              <form onSubmit={handleSubmit} noValidate>
                <div className="fg">
                  <div className="fld">
                    <label htmlFor="fname">Full Name *</label>
                    <input
                      id="fname"
                      type="text"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="fld">
                    <label htmlFor="fphone">Phone Number *</label>
                    <input
                      id="fphone"
                      type="tel"
                      placeholder="10-digit mobile"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <div className="fld">
                    <label htmlFor="fdate">Preferred Date *</label>
                    <input
                      id="fdate"
                      type="date"
                      min={today}
                      required
                    />
                  </div>
                  <div className="fld">
                    <label htmlFor="ftime">Preferred Time *</label>
                    <select id="ftime" required>
                      <option value="">Choose a time slot</option>
                      <optgroup label="☀️ Morning — 9:30 AM to 12:30 PM">
                        <option>9:30 AM</option>
                        <option>10:00 AM</option>
                        <option>10:30 AM</option>
                        <option>11:00 AM</option>
                        <option>11:30 AM</option>
                        <option>12:00 PM</option>
                      </optgroup>
                      <optgroup label="🌆 Evening — 4:30 PM to 8:00 PM">
                        <option>4:30 PM</option>
                        <option>5:00 PM</option>
                        <option>5:30 PM</option>
                        <option>6:00 PM</option>
                        <option>6:30 PM</option>
                        <option>7:00 PM</option>
                        <option>7:30 PM</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="fld ffc">
                    <label htmlFor="ftreat">Treatment Needed</label>
                    <select id="ftreat">
                      <option value="">Select treatment (optional)</option>
                      <option>Root Canal Treatment</option>
                      <option>Dental Implants</option>
                      <option>Teeth Replacement</option>
                      <option>Gum Treatment / Surgery</option>
                      <option>Teeth Bleaching (UV Light)</option>
                      <option>Dental Restoration / Fillings</option>
                      <option>Routine Check-up &amp; Cleaning</option>
                      <option>Other / Not Sure</option>
                    </select>
                  </div>
                  <div className="fld ffc">
                    <label htmlFor="fnotes">Notes (optional)</label>
                    <textarea
                      id="fnotes"
                      placeholder="Any specific concerns or requirements..."
                    />
                  </div>
                </div>

                <button type="submit" className="fsbmt" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Confirm Appointment →'}
                </button>
                <p className="fnote">🔒 Your details are safe and confidential.</p>
              </form>

              {success && (
                <div className="fsuccess" role="alert">
                  ✅ Appointment request received! We&apos;ll call you shortly to
                  confirm your slot.
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── Aside cards ── */}
        <div className="aside">
          <Reveal delay={0.06}>
            <div className="icard">
              <div className="ichead">
                <div className="icico" aria-hidden="true">⏰</div>
                <h4>Clinic Hours</h4>
              </div>
              <div className="tg2">
                <div className="tbox">
                  <div className="tbl">Morning</div>
                  <div className="tbv">9:30 – 12:30 PM</div>
                </div>
                <div className="tbox">
                  <div className="tbl">Evening</div>
                  <div className="tbv">4:30 – 8:00 PM</div>
                </div>
              </div>
              <div className="stag">🚫 Sunday — Closed</div>
            </div>
          </Reveal>

          <Reveal delay={0.11}>
            <div className="icard">
              <div className="ichead">
                <div className="icico" aria-hidden="true">📞</div>
                <h4>Contact Details</h4>
              </div>
              <p>
                Clinic:{' '}
                <a href="tel:7620750026">7620750026</a>
                <br />
                Mobile:{' '}
                <a href="tel:9762788098">9762788098</a>
                <br />
                Email:{' '}
                <a href="mailto:pravinvaishya@yahoo.com">pravinvaishya@yahoo.com</a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="icard">
              <div className="ichead">
                <div className="icico" aria-hidden="true">📍</div>
                <h4>Our Address</h4>
              </div>
              <p>
                Shop No. 137/E, Arihant Aptt. 1st Floor,
                <br />
                Ostwal Empire, Opp. Bus Depo / Rickshaw Stand,
                <br />
                <strong style={{ color: 'var(--ink)' }}>Boisar (W) – 401 501</strong>
              </p>
              <a
                href="https://maps.google.com/?q=Ostwal+Empire+Boisar"
                target="_blank"
                rel="noopener noreferrer"
                className="dirs"
              >
                Get Directions →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.21}>
            <div className="icard wacard">
              <div className="ichead">
                <div
                  className="icico"
                  style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#16a34a' }}
                  aria-hidden="true"
                >
                  <WhatsAppIcon size={20} />
                </div>
                <h4>WhatsApp Booking</h4>
              </div>
              <p style={{ color: 'var(--ink2)' }}>
                Prefer messaging? Send us a WhatsApp and we&apos;ll schedule you right
                away.
              </p>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="wabtn"
                aria-label="Book appointment via WhatsApp"
              >
                <WhatsAppIcon size={17} />
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
