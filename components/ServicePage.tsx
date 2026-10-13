import Image from 'next/image';
import { siteUrl } from '@/lib/site';
import type { ServiceGroup } from '@/lib/services';
import PageHeader from '@/components/PageHeader';
import ServiceList from '@/components/ServiceList';
import CtaBand from '@/components/CtaBand';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Eyebrow, Reveal } from '@/components/ui/motion';

/**
 * The body shared by /services, /modification and /car-wash.
 *
 * The three pages differ only in their data, so they are one component.
 * It is not just less code: it is the reason a customer who looks at two
 * of them finds the same layout in the same order both times, which is
 * most of what "simple" means in practice.
 */
export default function ServicePage({
  group,
  note,
  gallery,
}: {
  group: ServiceGroup;
  /** An optional line under the list — used by the wash page for the
   *  second branch, which needs saying on that page specifically. */
  note?: { title: string; body: string };
  gallery: { src: string; alt: string }[];
}) {
  return (
    <>
      <BreadcrumbJsonLd
        siteUrl={siteUrl}
        items={[
          { name: 'Home', path: '/' },
          { name: group.name, path: `/${group.slug}` },
        ]}
      />

      <PageHeader
        eyebrow={group.eyebrow}
        title={group.promise}
        lines={group.intro}
        image={group.headerImage}
        imageAlt={group.headerAlt}
        focus={group.headerFocus}
        fit={group.headerFit}
      />

      <section className="section-y">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>What we do</Eyebrow>
          {/* The page's h1 already names the trade, so the list goes
              straight under its label; the heading stays for screen
              readers, which navigate by it. */}
          <h2 className="sr-only">{group.name}</h2>

          <div className="mt-8 lg:mt-10">
            <ServiceList items={group.items} />
          </div>

          {note && (
            <Reveal delay={0.1}>
              <div className="hairline hairline-brass mt-6 rounded-2xl bg-paper p-6 lg:p-8">
                <h3 className="font-display text-xl text-ink-900">{note.title}</h3>
                <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                  {note.body}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* The gallery. Three photographs, no captions, no lightbox — it is
          here to show the work, and anything clickable would invite the
          visitor away from the one action this page wants. */}
      <section className="section-y relative overflow-hidden bg-paper-200">
        <div className="noise pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>The work</Eyebrow>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 0.07}>
                <div className="hairline relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-300">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-premium hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ask about ${group.name.toLowerCase()}`}
        message={`Hi, I would like to ask about ${group.name.toLowerCase()} for my car.`}
      />
    </>
  );
}
