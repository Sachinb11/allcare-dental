import Link from 'next/link';
import WhatsAppIcon from './WhatsAppIcon';

const WA_URL = 'https://wa.me/917620750026';

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footbody">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '9px',
                background: 'rgba(255,255,255,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
              }}
              aria-hidden="true"
            >
              🦷
            </div>
            <span className="fbn">All Care Dental Clinic</span>
          </div>
          <p className="fbd">
            Providing advanced, compassionate dental care to the Boisar community.
            Your smile is our priority and our pride.
          </p>
        </div>

        {/* Navigation */}
        <nav className="fcol" aria-label="Footer navigation">
          <h5>Navigation</h5>
          <ul>
            <li><Link href="#services">Our Services</Link></li>
            <li><Link href="#about">About Dr. Vaishya</Link></li>
            <li><Link href="#location">Find Us</Link></li>
            <li>
              <a
                href="https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I'd%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer">
                  <WhatsAppIcon size={10} />
                  
                 <span >     WhatsApp Us</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div className="fcol">
          <h5>Contact</h5>
          <ul>
            <li><a href="tel:7620750026">📞 7620750026</a></li>
            <li><a href="tel:9762788098">📱 9762788098</a></li>
            <li><a href="mailto:pravinvaishya@yahoo.com">✉️ pravinvaishya@yahoo.com</a></li>
            <li>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                💬 WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="fdiv" />

      <div className="fbot">
        <span>© {new Date().getFullYear()} All Care Dental Clinic · Dr. Pravin Vaishya · Reg. A-6039</span>
        <span>Boisar (W) – 401 501, Maharashtra, India</span>
      </div>
    </footer>
  );
}
