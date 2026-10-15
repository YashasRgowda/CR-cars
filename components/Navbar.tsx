'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import WhatsAppMark from '@/components/icons/WhatsAppMark';
import { telHref, waHref } from '@/lib/contact';
import { BUSINESS } from '@/lib/business';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Car Service' },
  { href: '/modification', label: 'CR Customs' },
  { href: '/car-wash', label: 'CR Express Wash' },
  { href: '/contact', label: 'Contact' },
];

/**
 * The navbar.
 *
 * Five links and a phone number, which is the whole site. The owner asked
 * for simple, and the fastest way to lose that is a nav that grows a
 * dropdown — so there is no dropdown, and if a sixth page is ever needed
 * it should replace one of these rather than join them.
 *
 * It is paper from the first frame on every page and picks up a frosted
 * blur once you scroll, so content passing underneath stays separated
 * from the links without the bar ever changing colour.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* The bar used to start transparent over the home page's dark hero and
     turn frosted on scroll. There is no dark hero any more — every page
     opens on paper — so it is always the light bar, and `scrolled` now
     only decides whether it casts a shadow onto the content behind it. */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Closing the sheet on navigation used to be an effect keyed on
     pathname, which is a setState inside an effect body and makes React
     render twice for every navigation. The sheet is only reachable by
     tapping one of its own links, so the links close it directly (see
     `closeSheet` below) and the only case left is the back button —
     which is an external system, and so is a subscription, which is what
     effects are actually for. */
  useEffect(() => {
    const onPop = () => setOpen(false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /* Lock the page while the sheet is open, or the body scrolls under it. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeSheet = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-premium ${
        /* With the sheet open the bar has to be the SAME solid paper as the
           panel hanging off it — frosted glass beside an opaque sheet looks
           like two components that failed to meet. */
        open
          ? 'border-line/70 bg-paper-100'
          : scrolled
            ? 'glass border-line/70'
            : 'border-transparent bg-paper-100'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-5 sm:gap-6 lg:px-10">
        <Link href="/" aria-label="CR Cars — home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-500 transition-colors duration-300 ${
                    active ? 'text-ink-900' : 'text-muted hover:text-ink-900'
                  }`}
                >
                  {item.label}
                  {/* The brass underline is how the current page announces
                      itself — the only persistent ornament in the chrome. */}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brass to-transparent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2.5 xl:flex">
          <a
            href={waHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message CR Cars on WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink-900 transition-colors duration-300 hover:border-ink-900 hover:bg-paper"
          >
            <WhatsAppMark className="h-[18px] w-[18px]" />
          </a>
          <a
            href={telHref()}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-ink-900 px-5 py-2.5 text-sm font-500 text-paper-100 transition-transform duration-300 ease-premium hover:scale-[1.03]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brass/35 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full" />
            <Phone className="relative h-4 w-4" />
            <span className="relative font-mono tracking-tight">
              {BUSINESS.phoneDisplay}
            </span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink-900 transition-colors xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* ---------------- Mobile sheet ---------------- */}
      {open && (
        <div
          /* Solid, not translucent. `bg-paper-100/97` was silently dropped —
             97 is not on Tailwind's opacity scale — and the panel fell back
             to backdrop-blur alone, which over the dark hero left ink-
             coloured links on a near-black ground. A menu is not a place to
             be clever about transparency. */
          className="animate-sheet-in border-t border-line/70 bg-paper-100 shadow-lift xl:hidden"
        >
          <ul className="mx-auto max-w-7xl px-5 py-3">
            {NAV.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="border-b border-line-soft last:border-0">
                  <Link
                    href={item.href}
                    onClick={closeSheet}
                    className={`flex items-center justify-between py-4 text-base font-500 ${
                      active ? 'text-ink-900' : 'text-muted'
                    }`}
                  >
                    {item.label}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-brass" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mx-auto flex max-w-7xl gap-3 px-5 pb-6">
            <a
              href={telHref()}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 py-3.5 text-sm font-500 text-paper-100"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong py-3.5 text-sm font-500 text-ink-900"
            >
              <WhatsAppMark className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
