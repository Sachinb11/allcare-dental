'use client';

import WhatsAppIcon from '@/components/WhatsAppIcon';

const WA_URL =
  'https://wa.me/917620750026?text=Hello%20Dr.%20Pravin,%20I%27d%20like%20to%20book%20an%20appointment.';

export default function FloatingElements() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fwa"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}
