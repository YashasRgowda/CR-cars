import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import WhatsAppMark from '@/components/icons/WhatsAppMark';
import { BUSINESS } from '@/lib/business';

const LINKS = [
  { href: '/services', label: 'Car Service' },
  { href: '/modification', label: 'Modification' },
  { href: '/car-wash', label: 'Car Wash' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Who built the site — the same quiet credit as on Kushi Cars. A WhatsApp
 * hand-off rather than a homepage link, because the shop owner it is aimed
 * at will send a message tonight and will not fill in a form tomorrow; the
 * opening line names the site, so the message is answerable straight away.
 */
const MAKER = {
  label: 'Made by team svayam.ai',
  phone: '918095762180',
  message: "Hi Svayam, I saw the CR Cars website and I'd like a website like that for my business.",
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
            <Logo />
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-ink-900">
                {l.label}
              </Link>
            ))}
          </nav>

          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} {BUSINESS.name}, {BUSINESS.city}.
          </p>
        </div>

        {/* Deliberately the quietest thing on the page: below the rule, in
            the muted tier, brass only under the cursor. */}
        <div className="mt-6 border-t border-line-soft pt-6 text-center">
          <a
            href={`https://wa.me/${MAKER.phone}?text=${encodeURIComponent(MAKER.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${MAKER.label} — message us on WhatsApp`}
            className="group inline-flex items-center gap-2 text-[11px] text-muted transition-colors duration-300 hover:text-brass-ink"
          >
            <WhatsAppMark className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:scale-110" />
            {MAKER.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
