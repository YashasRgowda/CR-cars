/**
 * The CR Cars mark.
 *
 * CR Cars had no logo, so this was designed rather than reproduced. It is
 * a roundel, because that is the shape the automotive world already reads
 * as a marque — a customer recognises it as a badge before they have read
 * the letters, which is exactly the job a mark has to do at 20px in a
 * browser tab.
 *
 * Three decisions worth keeping if it is ever redrawn:
 *
 *  - Two rings, not one. A single stroke reads as a circle with letters
 *    in it; the thin outer ring with a gap before the field reads as
 *    something machined, and costs 200 bytes.
 *  - The letters are SET, not drawn. Instrument Serif is already loading
 *    for the headlines, so the badge inherits the site's own voice for
 *    free and stays correct if the display face is ever swapped. The
 *    favicons are rendered to PNG separately (scripts/make-icons.py), so
 *    nothing here depends on a font being available in a 16px tab slot.
 *  - Brass is the ring and the letters; the field is ink. Reversed — a
 *    brass field with dark letters — it turns into a coin and stops
 *    looking like it belongs on a car.
 */

/* The field is the deepest ink, so the badge reads as a solid object
   sitting on the page rather than as an outline drawn on it. There was a
   reverse lockup for dark grounds; the site has none any more. */
const FIELD = '#171614';

export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="CR Cars"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="31" fill={FIELD} />
      {/* Outer hairline. 0.75 rather than 1 so it stays a hairline when the
          badge is rendered at 160px on the contact page. */}
      <circle cx="32" cy="32" r="31" stroke="#d4a94a" strokeWidth="0.75" opacity="0.55" />
      {/* The machined inner ring. */}
      <circle cx="32" cy="32" r="27" stroke="#d4a94a" strokeWidth="1.5" />
      <text
        x="32"
        /* Not 32. A serif capital's optical centre sits above its metric
           centre, and dropping the baseline to 41.5 is what stops the
           letters from floating in the top half of the badge. */
        y="41.5"
        textAnchor="middle"
        fontFamily='"Instrument Serif", Georgia, serif'
        fontSize="27"
        letterSpacing="0.5"
        fill="#e3c47e"
      >
        CR
      </text>
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span
        className="font-display text-[1.35rem] leading-[0.95] tracking-[0.01em] text-ink-900"
      >
        CR Cars
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

export default function Logo({
  className = '',
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Monogram className="h-9 w-9 shrink-0" />
      {showWordmark && <Wordmark />}
    </span>
  );
}
