import Reveal from '@/lib/RevealWrapper';

export default function Location() {
  return (
    <section className="sec secalt" id="location" aria-labelledby="location-title">
      <Reveal className="shead c">
        <div className="seye">Find Us</div>
        <h2 className="stit" id="location-title">
          Visit Our <em>Clinic</em>
        </h2>
        <p className="sdesc">
          Opposite the Bus Depot and Rickshaw Stand — easy to find, easy to reach.
        </p>
      </Reveal>

      <div className="locgrid">
        <div className="loccards">
          <Reveal>
            <address className="loccard" style={{ fontStyle: 'normal' }}>
              <h4>📍 Address</h4>
              <p>
                Shop No. 137/E, Arihant Aptt. 1st Floor,
                <br />
                Ostwal Empire, Opp. Bus Depo / Rickshaw Stand,
                <br />
                <strong>Boisar (W) – 401 501</strong>
              </p>
              <a
                href="https://maps.google.com/?q=Ostwal+Empire+Boisar"
                target="_blank"
                rel="noopener noreferrer"
                className="dirs"
              >
                Get Directions →
              </a>
            </address>
          </Reveal>

          <Reveal delay={0.07}>
            <div className="loccard">
              <h4>📞 Phone</h4>
              <p>
                <a href="tel:7620750026">7620750026</a> (Clinic)
                <br />
                <a href="tel:9762788098">9762788098</a> (Mobile)
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.13}>
            <div className="loccard">
              <h4>⏰ Timings</h4>
              <p>
                <strong>Monday – Saturday</strong>
                <br />
                Morning: 9:30 AM – 12:30 PM
                <br />
                Evening: 4:30 PM – 8:00 PM
                <br />
                <strong style={{ color: 'var(--red)' }}>Sunday: Closed</strong>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mapw">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.0!2d72.7587!3d19.7958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71f1b5a3a1d1b%3A0x0!2zQm9pc2FyLCBNYWhhcmFzaHRyYQ!5e0!3m2!1sen!2sin!4v1234"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="All Care Dental Clinic location on Google Maps"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </Reveal>
      </div>
    </section>
  );
}
