'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import WhatsAppMark from '@/components/icons/WhatsAppMark';
import { telHref, waHref } from '@/lib/contact';

/**
 * The floating call / WhatsApp pair.
 *
 * On a site whose only conversion is a phone call, the call button should
 * never be more than a thumb's reach away — most of this traffic arrives
 * from Google Maps on a phone, often from someone standing next to a car
 * that will not start.
 *
 * It waits until the hero is behind you before appearing. Over the hero
 * the page already has two large buttons saying the same thing, and a
 * floating pill on top of them is just clutter in the first screenshot
 * anybody sees.
 */
export default function ContactDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col gap-3 transition-all duration-500 ease-premium ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <a
        href={waHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message CR Cars on WhatsApp"
        className="group relative grid place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 ease-premium hover:scale-105"
        style={{ height: 52, width: 52 }}
      >
        {/* The halo only runs on the WhatsApp button, not on both — two
            pulsing rings stacked vertically reads as an error state. */}
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]"
        />
        <WhatsAppMark className="relative h-6 w-6" />
      </a>
      <a
        href={telHref()}
        aria-label="Call CR Cars"
        className="grid place-items-center rounded-full bg-ink-900 text-paper-100 shadow-lift-ink transition-transform duration-300 ease-premium hover:scale-105"
        style={{ height: 52, width: 52 }}
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
