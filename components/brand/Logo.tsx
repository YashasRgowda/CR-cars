import Image from 'next/image';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span
        /* The full name, as on the Google listing and the logo artwork.
           A step smaller on a phone, where it shares the bar with the
           drawing and the menu button. */
        className="whitespace-nowrap font-display text-[1.05rem] leading-[0.95] tracking-[0.01em] text-ink-900 min-[380px]:text-[1.15rem] sm:text-[1.35rem]"
      >
        CR Cars Service Center
      </span>
      {/* The descriptor does the work a tagline would, in four words, and
          is the only place on the site that names all three trades in one
          breath. Tracked wide so it reads as a rule of type rather than as
          a second, smaller heading. */}
      <span
        className="mt-[3px] font-sans text-[8px] font-500 uppercase tracking-[0.26em] text-brass-ink"
      >
        Service · Modify · Wash
      </span>
    </span>
  );
}

/**
 * The logo as the site shows it.
 *
 * The identity is an engraved drawing — a mechanic leaning into the open
 * bonnet of a car — over "CR Cars Service Center". It is detailed, so it
 * is used at two sizes only:
 *
 *  - `bar` (navbar): the drawing alone, beside the wordmark set in the
 *    site's own type. At 44px tall the drawing still reads as a car and a
 *    person; the full lockup's lettering would not.
 *  - `full` (footer): the whole lockup as drawn, where it has room.
 *
 * The small-size mark — the browser tab, where an engraving shrinks to a
 * smudge — is the CR roundel drawn by scripts/make-icons.py.
 *
 * Both images are transparent PNGs cut from the artwork by
 * scripts/make-logo.py, so they sit on any of the paper tones.
 */
export default function Logo({
  className = '',
  variant = 'bar',
}: {
  className?: string;
  variant?: 'bar' | 'full';
}) {
  if (variant === 'full') {
    return (
      <Image
        src="/brand/logo-full.png"
        alt="CR Cars Service Center — Service · Modify · Wash"
        width={1208}
        height={697}
        sizes="200px"
        className={`h-auto w-[168px] sm:w-[188px] ${className}`}
      />
    );
  }

  return (
    <span className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={913}
        height={510}
        priority
        sizes="96px"
        className="h-9 w-auto shrink-0 sm:h-11"
      />
      <span className="h-8 w-px bg-line" aria-hidden />
      <Wordmark />
    </span>
  );
}
