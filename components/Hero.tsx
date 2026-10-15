import Image from 'next/image';
import { Navigation, Star } from 'lucide-react';
import { BUSINESS, serviceBranch, washBranch } from '@/lib/business';
import { Reveal } from '@/components/ui/motion';
import GoogleMark from '@/components/icons/GoogleMark';

/**
 * The hero: the owner's own photograph of the shop, filling the whole
 * hero, with the words over the bottom of it.
 *
 * The photo is busy everywhere — signboard on top, the bay below — so no
 * type reads on it unaided. The words sit on a soft fade to warm graphite
 * over the bottom half only, in paper-white: the owner picked this over a
 * frosted panel, and asked for it gentle, so the fade starts at 45% and
 * stops at 70% opacity. The signboard, the part of the photo that sells,
 * is never under it.
 *
 * Height: the full screen under the navbar on a laptop. On a phone it is
 * capped at 125% of the width instead — a full-height phone crop of a 16:9
 * photo would be a thin vertical slice, and this cap keeps the centre of
 * the signboard ("CR CARS SERVICE CENTRE") and the open bay in frame. On a
 * screen wider than 16:9 the photo has to lose some height: the crop sits
 * 12% from the top, so it takes the sky, a little, and the forecourt,
 * mostly — never the signboard.
 */
const PHOTO = '/images/hero/showroom-hero-v2.jpg';

export default function Hero() {
  return (
    <section className="relative bg-ink-900 pt-[72px]">
      <div
        className="relative w-full overflow-hidden [container-type:size]"
        style={{ height: 'min(calc(100svh - 72px), 125vw)' }}
      >
        <Image
          src={PHOTO}
          alt="The CR Cars Service Centre frontage on Thirupalya Main Road, its open service bay decorated with marigold garlands"
          fill
          priority
          /* The LCP element on the page most people land on. */
          sizes="100vw"
          className="animate-band-in object-cover object-[50%_12%] motion-reduce:animate-none"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 45%, rgba(23,22,20,0.38) 68%, rgba(23,22,20,0.7) 100%)',
          }}
        />

        <div className="absolute inset-x-0 bottom-[5cqh] flex flex-col items-center px-5 text-center">
          <Reveal y={10} blur={false}>
            <Byline />
          </Reveal>
          <Reveal delay={0.08} y={14} blur={false}>
            {/* One line: "Your car, in good hands." is 7.8x its font size
                wide, so 11cqw keeps it inside a phone and 6rem is the
                laptop cap; 11cqh stops a short screen pushing it up into
                the signboard. */}
            <h1
              className="mt-[1.6cqh] whitespace-nowrap font-display leading-[0.98] tracking-[-0.02em] text-paper-50"
              style={{ fontSize: 'min(11cqw, 11cqh, 6rem)' }}
            >
              Your car, <span className="italic">in good hands</span>
              <span className="text-brass">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16} y={14} blur={false}>
            {/* Both branches, one tap each, straight into Google Maps. */}
            <div className="mt-[2.4cqh] flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <DirectionsLink href={serviceBranch.mapsUrl} label="Service Centre" />
              <DirectionsLink href={washBranch.mapsUrl} label="Car Wash" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DirectionsLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Directions to the ${label} on Google Maps`}
      className="group inline-flex items-center gap-2 rounded-full border border-paper-50/35 bg-paper-50/10 px-4 py-2 text-[13px] font-500 text-paper-50 backdrop-blur-sm transition-colors duration-300 hover:border-paper-50 hover:bg-paper-50 hover:text-ink-900 sm:px-5 sm:py-2.5 sm:text-sm"
    >
      <Navigation className="h-3.5 w-3.5 text-brass-soft transition-colors group-hover:text-brass-deep" />
      {/* On a phone the arrow icon says "directions"; the word joins from tablet up, so both pills stay on one line. */}
      <span className="hidden text-paper-50/70 transition-colors group-hover:text-ink-600 sm:inline">Directions</span>
      <span className="hidden h-3 w-px bg-paper-50/30 sm:inline-block" aria-hidden />
      {label}
    </a>
  );
}

/**
 * Where the shop is, and Google's G with five stars — the rating reduced
 * to what is read at a glance. The numbers are still there for a screen
 * reader and in the tooltip. Sized off the photo's size, like the headline.
 */
function Byline() {
  return (
    <div
      className="flex items-center justify-center gap-[0.6em] leading-none"
      style={{ fontSize: 'min(4.6cqw, 3.6cqh, 1.6rem)' }}
    >
      <span className="font-display italic text-brass-bright">Electronic City, Neotown</span>
      <span className="h-[1em] w-px bg-paper-50/45" aria-hidden />
      <a
        href={BUSINESS.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${BUSINESS.rating.toFixed(1)} on Google · ${BUSINESS.reviewCount} reviews`}
        className="-my-3 flex items-center gap-[0.35em] py-3 transition-opacity duration-300 hover:opacity-75"
      >
        <GoogleMark className="h-[1.05em] w-[1.05em]" />
        <span className="flex items-center gap-[0.08em]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-[0.85em] w-[0.85em] fill-brass text-brass" />
          ))}
        </span>
        <span className="sr-only">
          Rated {BUSINESS.rating.toFixed(1)} out of 5 on Google, from {BUSINESS.reviewCount}{' '}
          reviews
        </span>
      </a>
    </div>
  );
}
