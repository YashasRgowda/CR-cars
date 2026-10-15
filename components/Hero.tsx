import Image from 'next/image';
import { Navigation, Star } from 'lucide-react';
import { BUSINESS, serviceBranch, washBranch } from '@/lib/business';
import { Reveal } from '@/components/ui/motion';
import GoogleMark from '@/components/icons/GoogleMark';

/**
 * The hero: the owner's own photograph of the shop, with the words over
 * the bottom of it.
 *
 * The photo is busy everywhere — signboard on top, the bay below — so no
 * type reads on it unaided. The words sit on a soft fade to warm graphite,
 * in paper-white: the owner picked this over a frosted panel, and asked
 * for it gentle. The signboard, the part of the photo that sells, is never
 * under it and never cropped.
 *
 * Two shapes, by orientation rather than width:
 *
 *  - Wide screens (laptops, phones held sideways): the photo fills the
 *    screen under the navbar, anchored 12% from the top so a wider-than-2:1
 *    screen trims sky and forecourt, not the board. The words are laid over
 *    its bottom.
 *  - Tall screens (phones, upright iPads): filling the height would leave a
 *    narrow middle slice of a 2:1 photo, and the board would be cut at both
 *    ends. So the photo keeps close to its own shape — 1.55:1, positioned
 *    34% across, which holds the whole board from "CAR CUSTOMS" to "CAR
 *    WASH" — and its bottom melts into a graphite band that carries the
 *    words, like a film poster.
 */
const PHOTO = '/images/hero/showroom-hero-v3.jpg';

export default function Hero() {
  return (
    <section className="relative bg-ink-900 pt-[72px]">
      <div className="relative w-full overflow-hidden portrait:aspect-[1.55] landscape:h-[calc(100svh-72px)]">
        <Image
          src={PHOTO}
          alt="The CR Cars Service Centre frontage on Thirupalya Main Road, its open service bay decorated with marigold garlands"
          fill
          priority
          /* The LCP element on the page most people land on. */
          sizes="100vw"
          className="animate-band-in object-cover motion-reduce:animate-none portrait:object-[34%_50%] landscape:object-[50%_12%]"
        />
        {/* Wide: a gentle fade under the words. Tall: a fade that ends in
            solid graphite, so the photo flows into the band below with no
            seam. */}
        <div
          aria-hidden
          className="absolute inset-0 portrait:hidden"
          style={{
            background:
              'linear-gradient(to bottom, transparent 45%, rgba(23,22,20,0.38) 68%, rgba(23,22,20,0.7) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 landscape:hidden"
          style={{
            background:
              'linear-gradient(to bottom, transparent 58%, rgba(23,22,20,0.55) 82%, rgb(23,22,20) 100%)',
          }}
        />
      </div>

      {/* One set of words for both shapes: laid over the photo's bottom on
          a wide screen, a band of its own underneath on a tall one. */}
      <div className="flex flex-col items-center px-5 text-center portrait:-mt-px portrait:pb-10 portrait:pt-1 landscape:absolute landscape:inset-x-0 landscape:bottom-[5svh]">
        <Reveal y={10} blur={false}>
          <Byline />
        </Reveal>
        <Reveal delay={0.08} y={14} blur={false}>
          {/* One line: "Your car, in good hands." is 7.8x its font size
              wide. Wide screens: 11% of the photo's height, so a short
              screen never pushes it into the signboard, capped at 6rem.
              Tall: 10.5vw keeps it inside the phone's width. */}
          <h1 className="mt-3 whitespace-nowrap font-display text-[min(10.5vw,5.25rem)] leading-[0.98] tracking-[-0.02em] text-paper-50 sm:mt-4 landscape:text-[min(11vw,calc((100svh-72px)*0.11),6rem)]">
            Your car, <span className="italic">in good hands</span>
            <span className="text-brass">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16} y={14} blur={false}>
          {/* Both branches, one tap each, straight into Google Maps. */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-6 sm:gap-3">
            <DirectionsLink href={serviceBranch.mapsUrl} label="Service Centre" />
            <DirectionsLink href={washBranch.mapsUrl} label="Car Wash" />
          </div>
        </Reveal>
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
 * reader and in the tooltip.
 */
function Byline() {
  return (
    <div
      className="flex items-center justify-center gap-[0.6em] text-[min(4.4vw,1.4rem)] leading-none landscape:text-[min(4.6vw,calc((100svh-72px)*0.036),1.6rem)]"
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
