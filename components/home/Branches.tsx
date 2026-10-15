import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { formatAddress, serviceBranch, washBranch } from '@/lib/business';
import { telHref } from '@/lib/contact';
import { Eyebrow, Reveal } from '@/components/ui/motion';

/**
 * The two branches, side by side.
 *
 * Two locations is the single most confusing thing about this business
 * from outside it, and the one most likely to send somebody to the wrong
 * road. So it gets its own section rather than a line in the footer, and
 * it says plainly which work happens where.
 *
 * Each card links to its own Google listing, so "Get directions" opens
 * the right pin. If a branch ever loses its address, the card falls back
 * to "call us for directions" rather than inventing one.
 */
export default function Branches() {
  return (
    <section className="section-y relative overflow-hidden bg-paper-200">
      <div className="noise pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Two branches</Eyebrow>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-display-sm text-ink-900">
              Two places, one team
              <span className="text-brass">.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2">
          <BranchCard
            /* Side by side with the wash branch, two cars in steam read
               as the same place twice. A bright shop floor with cars on
               lifts says "servicing" with no caption needed. */
            image="/images/service/bay-red-car.jpg"
            imageAlt="A car on a workshop lift above a second car"
            name={serviceBranch.name}
            blurb={serviceBranch.blurb}
            address={formatAddress(serviceBranch)}
            mapsUrl={serviceBranch.mapsUrl}
            phone={serviceBranch.phone}
            phoneDisplay={serviceBranch.phoneDisplay}
            delay={0}
          />
          <BranchCard
            image="/images/wash/foam-bay.jpg"
            imageAlt="A car covered in foam under the lights of a wash bay"
            name={washBranch.name}
            blurb={washBranch.blurb}
            address={formatAddress(washBranch)}
            mapsUrl={washBranch.mapsUrl}
            phone={washBranch.phone}
            phoneDisplay={washBranch.phoneDisplay}
            delay={0.08}
          />
        </div>
      </div>
    </section>
  );
}

function BranchCard({
  image,
  imageAlt,
  name,
  blurb,
  address,
  mapsUrl,
  phone,
  phoneDisplay,
  delay,
}: {
  image: string;
  imageAlt: string;
  name: string;
  blurb: string;
  address: string;
  mapsUrl: string | null;
  phone: string;
  phoneDisplay: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="hairline group relative h-full overflow-hidden rounded-2xl bg-paper shadow-card">
        <div className="relative aspect-[16/9] overflow-hidden bg-paper-300">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-6 lg:p-8">
          <h3 className="font-display text-2xl text-ink-900">{name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>

          <div className="mt-6 flex items-start gap-2.5 border-t border-line-soft pt-5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-ink" />
            <p className="text-sm leading-relaxed text-ink-700">{address}</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={telHref(phone)}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-500 text-paper-100 transition-transform duration-300 ease-premium hover:scale-[1.03]"
            >
              <Phone className="h-4 w-4" />
              {phoneDisplay}
            </a>
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-500 text-ink-900 transition-colors hover:border-ink-900"
              >
                Get directions
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
