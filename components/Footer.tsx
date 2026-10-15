import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import WhatsAppMark from '@/components/icons/WhatsAppMark';

const LINKS = [
  { href: '/services', label: 'Car Service' },
  { href: '/modification', label: 'CR Customs' },
  { href: '/car-wash', label: 'CR Express Wash' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Who built the site, and the way to reach them.
 *
 * Aimed at the other shop owners who scroll to the bottom thinking "I
 * want one of these". A plain credit line did not read as clickable, so it
 * is a question and a link: "Want a website like this?" says why you
 * would tap, and the underlined "Chat with team svayam.ai" with its arrow
 * says it is clickable and opens WhatsApp. Kept to one small muted line —
 * the owner's site, not an advert — with colour only on hover.
 */
const MAKER = {
  name: 'team svayam.ai',
  phone: '918095762180',
  message:
    "Hi Svayam team, I saw the CR Cars website and I'd like a website like that for my business.",
};

/**
 * The footer: one slim bar — logo, pages, copyright — and the maker's line.
 *
 * It used to carry both branch addresses, phone numbers and hours in four
 * columns, which repeated what the page directly above it had just said.
 * The addresses live on the home page's branch cards and the contact page;
 * the phone and WhatsApp are in the navbar and the floating dock on every
 * page. So the footer only has to close the page, as Kushi Cars' does.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto max-w-7xl px-5 py-9 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-5 text-sm text-muted sm:flex-row">
          <Link href="/" aria-label="CR Cars — home">
            <Logo variant="full" />
          </Link>

          <nav className="-my-2.5 flex flex-wrap justify-center gap-x-6">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="inline-block py-2.5 transition-colors hover:text-ink-900">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* NEEDS CONFIRMATION: the founding year. */}
          <p className="text-center font-display text-base italic text-ink-800 sm:text-right">
            Electronic City · Since 2020
          </p>
        </div>

        <div className="mt-6 border-t border-line-soft pt-5 text-center text-xs text-muted">
          Want a website like this?{' '}
          <a
            href={`https://wa.me/${MAKER.phone}?text=${encodeURIComponent(MAKER.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${MAKER.name} on WhatsApp`}
            className="group -my-3 inline-flex items-center gap-1.5 py-3 font-500 text-ink-700 transition-colors duration-300 hover:text-ink-900"
          >
            <WhatsAppMark className="h-3.5 w-3.5 text-muted transition-colors duration-300 group-hover:text-[#25D366]" />
            <span className="underline decoration-brass/60 decoration-1 underline-offset-[3px] transition-colors group-hover:decoration-brass">
              Chat with {MAKER.name}
            </span>
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
