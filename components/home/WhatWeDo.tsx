'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GROUPS } from '@/lib/services';
import { Eyebrow, Reveal, staggerChild, staggerParent } from '@/components/ui/motion';

/**
 * The three things CR Cars does, as three cards.
 *
 * This is the whole site in one screen, and it is deliberately the first
 * thing under the hero. A visitor who arrived from Google Maps knows the
 * name and nothing else; they should be able to learn the shape of the
 * business without scrolling twice or reading a paragraph.
 *
 * Three cards, three photographs, three short lines. No prices, because
 * every one of these depends on the car — each card ends at a page, and
 * every page ends at a phone call.
 */
export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="section-y relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <Reveal delay={0.05}>
            {/* An h2: the page's h1 is "Your car, in good hands." in the
                hero above. */}
            <h2 className="mt-5 font-display text-display-sm text-ink-900">
              Three things, done well
              <span className="text-brass">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
              Service and modification at our main centre. Washing and
              detailing at our second branch nearby.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={staggerParent}
          className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14"
        >
          {GROUPS.map((group) => (
            <motion.div key={group.slug} variants={staggerChild}>
              <Link
                href={`/${group.slug}`}
                className="group hairline relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-card transition-shadow duration-500 ease-premium hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-300">
                  <Image
                    src={group.image}
                    alt={group.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-500 uppercase tracking-eyebrow text-brass-ink">
                    {group.eyebrow}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-ink-900">
                    {group.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-pretty text-sm leading-relaxed text-muted">
                    {group.promise}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-500 text-ink-900">
                    See everything
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
