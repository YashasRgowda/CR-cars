import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ACCESSORIES, ACCESSORY_SHOWCASE } from '@/lib/services';
import { waHref } from '@/lib/contact';
import { Eyebrow, Reveal } from '@/components/ui/motion';
import { CallButton, WhatsAppButton } from '@/components/ui/buttons';

type Item = (typeof ACCESSORY_SHOWCASE)[number];

/**
 * Accessories: the pitch on the left, a four-tile mosaic on the right.
 *
 * The mosaic is a bento, not a grid of equal cards: one tall arch, one
 * wide frame, two compact tiles, packed so the whole set fits a laptop
 * screen with no dead air around it. Each shape is chosen for what is in
 * it — the arch for a seat back, the wide frame for exhaust tips that run
 * sideways, small frames for a wheel and a headlight — and each photo was
 * cropped to its shape rather than squeezed into one.
 *
 * The text column is stretched to the mosaic's height, heading at the top
 * and the buttons at the bottom, so the two halves start and end together.
 *
 * Captions sit under the photographs, never on them, and every tile is a
 * WhatsApp question about that thing.
 */

/* Where each tile sits. Phone: two columns — the arch down the left, two
   tiles stacked beside it, the last one full width underneath. Laptop: a
   seven-column grid two rows tall — the arch, then wide over two small. */
const PLACE: Record<number, string> = {
  0: 'col-start-1 row-start-1 row-span-2 lg:col-span-3',
  1: 'col-start-2 row-start-1 lg:col-start-4 lg:col-span-4',
  2: 'col-start-2 row-start-2 lg:col-start-4 lg:col-span-2',
  3: 'col-start-1 col-span-2 row-start-3 lg:col-start-6 lg:col-span-2 lg:row-start-2',
};

export default function Accessories() {
  return (
    <section className="section-y relative overflow-hidden bg-paper-200">
      <div className="noise pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <Eyebrow>{ACCESSORIES.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-display-sm text-ink-900">
                {ACCESSORIES.title}
                <span className="text-brass">.</span>
              </h2>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted">
                {ACCESSORIES.line}
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <CallButton label="Call to ask" />
              <WhatsAppButton message="Hi, I want to know which car accessories you have." />
            </div>
          </div>
        </Reveal>

        <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[250px] sm:gap-4 lg:col-span-7 lg:h-[clamp(520px,64vh,640px)] lg:auto-rows-auto lg:grid-cols-7 lg:grid-rows-2 lg:gap-5">
          {ACCESSORY_SHOWCASE.map((item, i) => (
            <Reveal key={item.label} delay={0.06 * i} className={`min-h-0 ${PLACE[i]}`}>
              <Tile item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({ item, index }: { item: Item; index: number }) {
  // The arch: a full round top on the tall tile only. One shape that is
  // not a rectangle is enough to make the set look composed; four would
  // make it look like a sticker sheet.
  const shape = item.tile === 'tall' ? 'rounded-t-[999px] rounded-b-2xl' : 'rounded-2xl';

  return (
    <a
      href={waHref(`Hi, I want to know about ${item.label.toLowerCase()} for my car.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ask about ${item.label.toLowerCase()} on WhatsApp`}
      className="group flex h-full flex-col"
    >
      <div
        className={`hairline relative min-h-0 flex-1 overflow-hidden bg-paper-300 shadow-card ${shape}`}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 26vw, 50vw"
          className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
          style={{ objectPosition: item.focus }}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 sm:mt-3">
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-[10px] text-brass-ink sm:text-[11px]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-display text-base leading-none text-ink-900 sm:text-lg lg:text-xl">
            {item.label}
          </span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>
    </a>
  );
}
