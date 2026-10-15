import type { Metadata } from 'next';
import { MapPin, Clock, Phone } from 'lucide-react';
import { siteUrl } from '@/lib/site';
import {
  BUSINESS,
  formatAddress,
  serviceBranch,
  washBranch,
  type Branch,
} from '@/lib/business';
import { telHref } from '@/lib/contact';
import PageHeader from '@/components/PageHeader';
import CtaBand from '@/components/CtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Eyebrow, Reveal } from '@/components/ui/motion';
import { CallButton, WhatsAppButton } from '@/components/ui/buttons';

export const metadata: Metadata = {
  title: 'Contact & Location',
  description:
    'CR Cars is on Thirupalya Main Road, Bommasandra, Bengaluru 560099. Open daily 8 am to 8:30 pm. Call 070228 46611 or message on WhatsApp.',
  alternates: { canonical: '/contact' },
};

/**
 * Contact.
 *
 * No form. The owner did not want anything to log into, and a form with
 * nowhere to send its contents is worse than no form — it accepts a
 * message and loses it. Both branches, one map, two buttons.
 */
export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        siteUrl={siteUrl}
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <PageHeader
        eyebrow="Find us"
        title="Come and see us."
        lines={[
          'We are on Thirupalya Main Road, Bommasandra.',
          'Open every day. Call before you come and we will keep a bay free.',
        ]}
        image="/images/hero/head-contact.jpg"
        imageAlt="A white SUV parked on an Indian road at golden hour"
      />

      <section className="section-y">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <Eyebrow>Talk to us</Eyebrow>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-display-sm text-ink-900">
                  One number, both branches
                  <span className="text-brass">.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
                  Call for anything — service, modification or a wash. If we
                  are under a car, send a WhatsApp and we will come back to
                  you.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <CallButton label={BUSINESS.phoneDisplay} />
                  <WhatsAppButton message="Hi, I would like to ask about my car." />
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <dl className="mt-10 space-y-5 border-t border-line pt-8">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brass-ink" />
                    <div>
                      <dt className="text-[11px] font-500 uppercase tracking-eyebrow text-muted">
                        Hours
                      </dt>
                      <dd className="mt-1 text-sm text-ink-900">
                        {BUSINESS.hoursDisplay}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brass-ink" />
                    <div>
                      <dt className="text-[11px] font-500 uppercase tracking-eyebrow text-muted">
                        Phone
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={telHref()}
                          className="-my-3 inline-block py-3 font-mono text-sm text-ink-900 transition-colors hover:text-brass-ink"
                        >
                          {BUSINESS.phoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brass-ink" />
                    <div>
                      <dt className="text-[11px] font-500 uppercase tracking-eyebrow text-muted">
                        Areas we cover
                      </dt>
                      <dd className="mt-1 text-pretty text-sm leading-relaxed text-ink-900">
                        {BUSINESS.servingAreas.join(' · ')}
                      </dd>
                    </div>
                  </div>
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="hairline overflow-hidden rounded-2xl bg-paper shadow-card">
                <iframe
                  title="CR Cars Service Center on Google Maps"
                  /* The plain embed URL needs no API key and no consent
                     banner, unlike the Maps Embed API. */
                  src={`https://www.google.com/maps?q=${serviceBranch.geo.lat},${serviceBranch.geo.lng}&z=16&output=embed`}
                  className="map-frame h-[340px] w-full border-0 lg:h-[460px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <BranchPanel branch={serviceBranch} delay={0} />
            <BranchPanel branch={washBranch} delay={0.07} />
          </div>
        </div>
      </section>

      <CtaBand
        title="We are open today"
        line="Call us, or send a WhatsApp with a photo of the problem. Either works."
        message="Hi, I would like to visit. Can you tell me the best time to come?"
      />
    </>
  );
}

function BranchPanel({ branch, delay }: { branch: Branch; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="hairline h-full rounded-2xl bg-paper p-6 shadow-card lg:p-8">
        <span className="text-[11px] font-500 uppercase tracking-eyebrow text-brass-ink">
          {branch.short}
        </span>
        <h3 className="mt-3 font-display text-2xl text-ink-900">{branch.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{branch.blurb}</p>

        <div className="mt-6 flex items-start gap-2.5 border-t border-line-soft pt-5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-ink" />
          <div className="text-sm leading-relaxed text-ink-700">
            <p>{formatAddress(branch)}</p>
            <p className="mt-1 font-mono text-xs text-muted">{branch.plusCode}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={telHref(branch.phone)}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-500 text-paper-100 transition-transform duration-300 ease-premium hover:scale-[1.03]"
          >
            <Phone className="h-4 w-4" />
            {branch.phoneDisplay}
          </a>
          {branch.mapsUrl && (
            <a
              href={branch.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-500 text-ink-900 transition-colors hover:border-ink-900"
            >
              Get directions
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}
