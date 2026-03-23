import Reveal from '@/lib/RevealWrapper';

const FEATURES = [
  'Painless root canal using rotary technology',
  'Advanced single-session UV teeth whitening',
  'Complete implant and replacement solutions',
  'Fully sterile and hygienic surgical environment',
  'Conveniently located near Boisar Bus Depot',
  'Flexible morning and evening consultation hours',
] as const;

const DOCTOR_DETAILS = [
  { icon: '🎓', label: 'Qualification', value: 'B.D.S. — Mumbai University' },
  { icon: '🪪', label: 'Registration No.', value: 'A-6039' },
  { icon: '📍', label: 'Clinic', value: 'Boisar (W), Maharashtra' },
] as const;

const SPECIALTIES = [
  'Root Canal',
  'Implants',
  'Cosmetic',
  'Gum Surgery',
  'UV Whitening',
] as const;

export default function About() {
  return (
    <section className="sec secw" id="about" aria-labelledby="about-title">
      <Reveal className="shead">
        <div className="seye">About the Doctor</div>
        <h2 className="stit" id="about-title">
          Meet <em>Dr. Pravin Vaishya</em>
        </h2>
      </Reveal>

      <div className="abgrid">
        {/* Doctor card */}
        <Reveal direction="left">
          <div className="drcard">
            <div className="drtop">
              <div className="drav" aria-hidden="true">👨‍⚕️</div>
              <div className="drn">Dr. Pravin Vaishya</div>
              <div className="drd">B.D.S. — Mumbai University</div>
              <div className="drr">Registration No. A-6039</div>
              <div className="drtags" role="list" aria-label="Specialties">
                {SPECIALTIES.map((s) => (
                  <span key={s} className="dtag" role="listitem">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="drbot">
              {DOCTOR_DETAILS.map((d) => (
                <div className="drdet" key={d.label}>
                  <span className="drdi" aria-hidden="true">{d.icon}</span>
                  <div>
                    <span className="drdl">{d.label}</span>
                    <span className="drdv">{d.value}</span>
                  </div>
                </div>
              ))}
              <div className="drdet">
                <span className="drdi" aria-hidden="true">📞</span>
                <div>
                  <span className="drdl">Contact</span>
                  <span className="drdv">
                    <a href="tel:7620750026" style={{ color: 'var(--forest)' }}>
                      7620750026
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text content */}
        <Reveal direction="right">
          <div className="abtxt">
            <div className="seye no-after" style={{ marginBottom: '16px' }}>
              Why Choose Us
            </div>
            <h2>
              Compassionate Care with <em>Clinical Excellence</em>
            </h2>
            <p>
              Dr. Pravin Vaishya brings a wealth of knowledge and an unwavering
              commitment to patient wellbeing. Trained at Mumbai University, he combines
              the latest dental techniques with a deeply personal approach to every
              patient.
            </p>
            <p>
              Our clinic is equipped with modern diagnostic tools, UV bleaching systems,
              and fully sterile surgical suites — ensuring world-class care right in your
              neighbourhood.
            </p>

            <ul className="feats" role="list">
              {FEATURES.map((f) => (
                <li key={f} className="feat" role="listitem">
                  <div className="fd" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I'd%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="bgold"
              style={{
                background: 'var(--forest)',
                color: 'var(--cream)',
                boxShadow: '0 6px 22px rgba(27,61,47,.28)',
                display: 'inline-flex',
                marginTop: '6px',
              }}
            >
              Get in Touch →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
