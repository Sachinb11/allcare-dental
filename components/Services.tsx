import Reveal from '@/lib/RevealWrapper';

const SERVICES = [
  {
    number: '01 — Root Canal',
    icon: '🔬',
    title: 'Root Canal Treatment',
    desc: 'Pain-free procedures using modern rotary instruments to eliminate infection and save your natural teeth comfortably.',
  },
  {
    number: '02 — Implants',
    icon: '🦷',
    title: 'Dental Implants',
    desc: 'Permanent titanium implants that look, feel, and function exactly like natural teeth — a lifelong smile solution.',
  },
  {
    number: '03 — Replacement',
    icon: '💎',
    title: 'Teeth Replacement',
    desc: 'Bridges, full and partial dentures, and full-arch restorations — complete replacement tailored precisely to you.',
  },
  {
    number: '04 — Gum Care',
    icon: '🩺',
    title: 'Gum Treatment & Surgery',
    desc: 'Comprehensive treatment for all gum diseases, periodontal conditions, and oral surgical procedures.',
  },
  {
    number: '05 — Whitening',
    icon: '✨',
    title: 'Teeth Bleaching (UV)',
    desc: 'Professional UV light whitening that brightens your smile by several shades visibly in just one single session.',
  },
  {
    number: '06 — Restorations',
    icon: '🔧',
    title: 'All Restorations',
    desc: 'Composite fillings, ceramic crowns, veneers, inlays — complete restorative procedures to rebuild your smile.',
  },
] as const;

export default function Services() {
  return (
    <section className="sec secalt" id="services" aria-labelledby="services-title">
      <Reveal className="shead c">
        <div className="seye">What We Offer</div>
        <h2 className="stit" id="services-title">
          Our <em>Treatments</em>
        </h2>
        <p className="sdesc">
          Comprehensive dental care using modern techniques for every member of your
          family.
        </p>
      </Reveal>

      <div className="sgrid" role="list">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.05} direction="up">
            <article className="svcard" role="listitem">
              <div className="svn">{service.number}</div>
              <div className="svico" aria-hidden="true">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
