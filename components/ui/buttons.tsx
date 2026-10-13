import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import WhatsAppMark from '@/components/icons/WhatsAppMark';
import { telHref, waHref } from '@/lib/contact';
import { BUSINESS } from '@/lib/business';

/**
 * The two buttons that matter.
 *
 * This site has no form and no cart; a visit succeeds when somebody calls
 * or opens WhatsApp, and fails otherwise. So those two actions are
 * components rather than markup repeated per page — one place to change
 * the label, the padding and the prefilled message, and no chance of one
 * page quietly shipping a dead `tel:` with a space in it.
 *
 * Call is the primary and wears the ink fill; WhatsApp is the ghost beside
 * it. That order is deliberate and it is the opposite of what most sites
 * do: a workshop answers the phone, and a customer with a car that will
 * not start wants a voice, not a chat thread.
 */

export function CallButton({
  label = 'Call now',
  phone,
  className = '',
}: {
  label?: string;
  phone?: string;
  className?: string;
}) {
  return (
    <a
      href={telHref(phone)}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-ink-900 px-7 py-3.5 text-sm font-500 text-paper-100 shadow-lift-ink transition-transform duration-300 ease-premium hover:scale-[1.03] ${className}`}
    >
      {/* The brass sheen crossing the face on hover — the one place the
          ornament colour touches a control. */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brass/35 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full" />
      <Phone className="relative h-4 w-4" />
      <span className="relative">{label}</span>
    </a>
  );
}

export function WhatsAppButton({
  label = 'WhatsApp',
  message,
  className = '',
}: {
  label?: string;
  message?: string;
  className?: string;
}) {
  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-paper/60 px-7 py-3.5 text-sm font-500 text-ink-900 backdrop-blur-sm transition-colors duration-300 hover:border-ink-900 hover:bg-paper ${className}`}
    >
      <WhatsAppMark className="h-4 w-4" />
      {label}
    </a>
  );
}

/** A quiet text link with an arrow that steps forward on hover. */
export function TextLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-500 text-ink-900 transition-colors hover:text-brass-ink ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
    </Link>
  );
}

/** Used in the footer and on the contact page. */
export function PhoneLine({ className = '' }: { className?: string }) {
  return (
    <a
      href={telHref()}
      className={`font-mono text-base tracking-tight transition-colors hover:text-brass-ink ${className}`}
    >
      {BUSINESS.phoneDisplay}
    </a>
  );
}
