import { Eyebrow, Reveal } from '@/components/ui/motion';
import { CallButton, WhatsAppButton } from '@/components/ui/buttons';
import { BUSINESS } from '@/lib/business';

/**
 * The closing band, on every page.
 *
 * A visitor who has read to the bottom has decided something; this is
 * where the site stops explaining and asks. It is the same component on
 * all five pages, with the prefilled WhatsApp message changed per page so
 * the owner can tell at a glance which page the enquiry came from.
 */
export default function CtaBand({
  title = 'Bring your car in',
  line = 'Call us or send a message on WhatsApp. We will tell you what it needs and what it costs.',
  message,
}: {
  title?: string;
  line?: string;
  message?: string;
}) {
  return (
    <section className="section-y relative overflow-hidden bg-paper-200">
      <div className="noise pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-10">
        <Eyebrow centered>Get in touch</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-display-sm text-ink-900">
            {title}
            <span className="text-brass">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted">
            {line}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <CallButton label={BUSINESS.phoneDisplay} />
            <WhatsAppButton message={message} />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm text-muted">{BUSINESS.hoursDisplay}</p>
        </Reveal>
      </div>
    </section>
  );
}
