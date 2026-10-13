'use client';

import { getImageProps } from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { BUSINESS } from '@/lib/business';
import { EASE } from '@/components/ui/motion';
import GoogleMark from '@/components/icons/GoogleMark';

/**
 * The hero: a workshop photograph filling the screen, with the words on
 * its white wall. Two photographs, chosen by the screen's SHAPE, not its
 * width — an iPad Pro held upright is 1032px wide, past the desktop
 * breakpoint, and would get the wide shot's useless sliver of wall.
 *
 * Wide screens: the car on the lift, words on the left above the brick.
 * The brick line runs through the frame's middle, so the copy is printed
 * twice, in ink and in paper, each masked to the half of the photograph
 * it can be read against (scripts/make-hero-mask.py). A glow behind the
 * letters, the earlier fix, read as white fog over the dark patches.
 *
 * Tall screens (phones, upright iPads — most of this site's visitors): a
 * native 9:16 shot of a car in a bright, empty bay, the words centred on
 * the plain wall above its roof, the car whole beneath them. That wall is
 * light all the way across, so only the ink copy is used.
 *
 * Nothing is laid over either photograph: no scrim, no panel, no glow.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);

  /* Art direction through <picture>, so a phone downloads only the
     portrait photograph and a laptop only the wide one. */
  const common = { alt: '', fill: true, priority: true, sizes: '100vw' } as const;
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...common, src: '/images/hero/garage-hero.jpg' });
  const {
    props: { srcSet: tallSrcSet, ...img },
  } = getImageProps({ ...common, src: '/images/hero/garage-hero-portrait.jpg' });

  return (
    <section
      ref={ref}
      /* dvh, not vh: on a phone the browser chrome shrinks and grows as
         you scroll, and vh would leave a strip of the next section
         showing under the photograph at rest. */
      className="relative h-dvh overflow-hidden bg-paper-300"
    >
      <motion.div
        style={{ y: reduce ? 0 : plateY, scale: reduce ? 1 : plateScale }}
        className="absolute inset-0"
      >
        {/* The copy lives inside the same box as the photograph, so the
            parallax and the entrance move both together and the masks
            never slide off the brick line. */}
        <motion.div
          className="absolute -inset-[3%]"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <picture>
            <source media="(orientation: landscape)" srcSet={wideSrcSet} />
            <source media="(orientation: portrait)" srcSet={tallSrcSet} />
            <img
              {...img}
              alt="A car inside the CR Cars workshop"
              /* The wide shot is anchored left, where the wall is; the
                 masks in globals.css assume exactly this crop. The tall
                 shot is centred: the car is. */
              className="object-cover landscape:object-left"
            />
          </picture>

          <div className="hero-mask-light absolute inset-0">
            <HeroCopy tone="ink" />
          </div>
          <div className="hero-mask-dark pointer-events-none absolute inset-0" aria-hidden>
            <HeroCopy tone="paper" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const lineUp = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
};

/**
 * One copy of the hero's words. `ink` is the real one — the h1, the link,
 * the thing a screen reader reads. `paper` is the same layout in light
 * colours, hidden from assistive tech and from the pointer, and only ever
 * seen through the brick-shaped mask.
 */
function HeroCopy({ tone }: { tone: 'ink' | 'paper' }) {
  const ink = tone === 'ink';
  const Heading = ink ? 'h1' : 'div';

  return (
    /* The masked box is the photograph's box — 6% larger than the section
       and 3% outside it — so 3/106 in from each edge is the section again. */
    <div className="absolute inset-[2.8302%]">
      {/* Pinned by its bottom edge rather than centred, in both shapes.

          Wide: the brick line sits at 50% of the section on the left (the
          photograph is drawn 6% taller than the section from 3% above, and
          covers by height), and the headline ends at 48%, just above it,
          left-aligned with a gutter that tracks the width so the long line
          still ends on the wall.

          Tall: the block ends 24px above the car's roof, centred over the
          car. The roof is at 39.5% of the portrait photograph, which lands
          at 38.9% of a phone's section (cover by height) and at 50% - 19.8vw
          of a wider one's (cover by width, the photo then cropped top and
          bottom); `bottom` takes whichever is higher on screen. */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
        }}
        className="contents"
      >
        <div className="absolute inset-x-0 bottom-[calc(max(61.1%,50%+19.8vw)+24px)] flex flex-col items-center px-5 text-center landscape:bottom-[52%] landscape:items-start landscape:px-[5vw] landscape:text-left">
          <Byline ink={ink} className="mb-4 lg:mb-5 [@media(max-aspect-ratio:5/8)]:hidden" />

          {/* Wide: one line. It must end on the wall, whose right edge is
              a share of the photograph and so follows the screen's height:
              the line is 7.8x its font size, and 11.5dvh keeps it ending at
              ~43.5% across the photograph, where the wall still runs to 46%
              (92px at 1440x800, 115px at 1728x1000).

              Tall, phone: two lines, as big as the width allows (16vw,
              ~62-70px), capped at 9dvh so a short screen keeps it clear of
              the navbar.

              Tall, iPad: the byline sits above the headline, and must clear
              the lowest ceiling light, which on this crop is at
              50% - 52.9vw against the roof's 50% - 19.8vw. Solving for the
              font size gives 16.5vw - 48px (~87px on an iPad Air, ~75px on
              a mini), and 8dvh stops a squat window going larger. */}
          <Heading
            className={`overflow-hidden pb-[0.12em] -mb-[0.12em] font-display text-[clamp(3rem,min(8dvh,calc(16.5vw_-_48px)),8rem)] leading-[1] [@media(max-aspect-ratio:5/8)]:text-[clamp(3rem,min(16vw,9dvh),8rem)] tracking-[-0.02em] landscape:whitespace-nowrap landscape:text-[clamp(2.5rem,min(7.5vw,11.5dvh),7.25rem)] ${
              ink ? 'text-ink-900' : 'text-paper-50'
            }`}
          >
            <motion.span variants={lineUp} className="inline-block">
              Your car,{' '}
              <br className="landscape:hidden" />
              <span className="italic">in good hands</span>
              <span className="text-brass">.</span>
            </motion.span>
          </Heading>
        </div>

        {/* Phones only — tall AND narrow, past 5:8. An upright iPad (3:4)
            has wall to spare above the car for the byline; a phone does
            not, and there it was squeezed under the navbar across a ceiling
            light. So it drops to the floor under the car instead. The floor
            is the photograph's lowest 16% (luminance ~190, speckled no
            darker than ~130), and 5% up from the bottom stays inside it
            from a 0.46 to a 0.62 screen. */}
        <div className="absolute inset-x-0 bottom-[5%] hidden justify-center px-5 [@media(max-aspect-ratio:5/8)]:flex">
          <Byline ink={ink} />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Where the shop is, and Google's G with five stars — the rating reduced
 * to what is read at a glance. The numbers are still there for a screen
 * reader and in the tooltip.
 */
function Byline({ ink, className = '' }: { ink: boolean; className?: string }) {
  return (
    <motion.div
      variants={rise}
      className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5 sm:gap-x-4 lg:gap-x-5 landscape:justify-start ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="hidden h-px w-8 bg-brass landscape:block lg:w-12" />
        <span
          className={`font-display text-lg italic leading-none sm:text-xl lg:text-[1.625rem] ${
            ink ? 'text-ink-800' : 'text-paper-200'
          }`}
        >
          Bommasandra, Bengaluru
        </span>
      </span>

      <span className={`h-5 w-px ${ink ? 'bg-ink-900/25' : 'bg-paper-50/40'}`} />

      <a
        href={BUSINESS.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={ink ? undefined : -1}
        title={`${BUSINESS.rating.toFixed(1)} on Google · ${BUSINESS.reviewCount} reviews`}
        className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-75"
      >
        <GoogleMark className="h-5 w-5 lg:h-[22px] lg:w-[22px]" />
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-brass text-brass lg:h-[18px] lg:w-[18px]" />
          ))}
        </span>
        <span className="sr-only">
          Rated {BUSINESS.rating.toFixed(1)} out of 5 on Google, from {BUSINESS.reviewCount}{' '}
          reviews
        </span>
      </a>
    </motion.div>
  );
}
