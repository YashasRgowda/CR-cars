import Image from 'next/image';
import { Eyebrow, Reveal, SplitText } from '@/components/ui/motion';

/**
 * The top of every interior page: the photograph first, the words after.
 *
 * A full-width band of the page's own subject — the workshop for
 * servicing, exhaust flames, a car in the spray, the road outside — sits
 * directly under the navbar at about half the screen's height, so the
 * whole picture is in view the moment the page opens. The words follow
 * on paper beneath it. Nothing is laid over the photograph: no scrim, no
 * type, no glow.
 *
 * Half the screen, not more: the band has to leave room for the headline
 * to start above the fold, or the page opens on a picture with no hint
 * of what it is about. The photographs are 3:2, so a band this wide crops
 * them top and bottom; `focus` (an object-position) picks which slice —
 * 60% down keeps the raised bonnet and engine on the service page, and
 * 65% keeps both exhaust flames and the alloys on the modification page.
 */
export default function PageHeader({
  eyebrow,
  title,
  lines,
  image,
  imageAlt,
  focus = '50% 50%',
  fit,
}: {
  eyebrow: string;
  title: string;
  lines: string[];
  image: string;
  imageAlt: string;
  focus?: string;
  /** Show the whole photo on a matte rather than filling the band. */
  fit?: { fit: 'contain'; matte: string; ratio: number };
}) {
  return (
    <section className="relative bg-paper-100 pt-[72px]">
      <div
        className="relative h-[42svh] min-h-[260px] overflow-hidden bg-paper-300 [container-type:size] sm:h-[46svh] lg:h-[50svh] lg:max-h-[640px]"
        style={fit ? { backgroundColor: fit.matte } : undefined}
      >
        {fit ? (
          /* Whole photo, as large as the band allows in both directions
             (container units: the band's own width and height), centred,
             its side edges feathered into the matte so there is no seam. */
          <div className="flex h-full items-center justify-center">
            <div
              className="relative"
              style={{
                width: `min(100cqw, ${fit.ratio * 100}cqh)`,
                aspectRatio: String(fit.ratio),
                maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
              }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                className="animate-band-in object-cover motion-reduce:animate-none"
              />
            </div>
          </div>
        ) : (
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="animate-band-in object-cover motion-reduce:animate-none"
            style={{ objectPosition: focus }}
          />
        )}
        {/* The seam between photograph and page: a brass hairline. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass to-transparent"
        />
      </div>

      <div className="relative">
        <div className="noise pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-5 pb-14 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-10 lg:pb-16 lg:pt-14">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <SplitText
              as="h1"
              text={title}
              className="mt-5 max-w-2xl font-display text-display-sm text-ink-900"
              wordClassName="metal-text"
            />
          </div>
          <div className="max-w-lg space-y-1.5 lg:pb-2">
            {lines.map((line, i) => (
              <Reveal key={line} delay={0.1 + i * 0.06} y={14}>
                <p className="text-pretty text-base leading-relaxed text-muted">{line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
