'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Wrench, Clock, Truck } from 'lucide-react';
import { Eyebrow, Reveal, staggerChild, staggerParent } from '@/components/ui/motion';

/**
 * Four reasons, four lines.
 *
 * Every one of these is a promise about HOW the work is done, not a claim
 * about how good it is — "we tell you the price first" is checkable and
 * "best service in Bengaluru" is not, and a customer choosing a garage
 * has heard the second one from everybody.
 *
 * NEEDS CONFIRMATION: these are the four a garage can normally stand
 * behind. If CR Cars does not do pickup and drop, or does not give a
 * warranty on work, these must change — a promise the shop cannot keep
 * costs more than no promise at all.
 */
const POINTS = [
  {
    icon: Wrench,
    title: 'All makes and models',
    line: 'Hatchback, sedan, SUV or luxury — the same team handles it.',
  },
  {
    icon: MessageSquare,
    title: 'Price before work',
    line: 'We tell you what is wrong and what it costs. Then you decide.',
  },
  {
    icon: Clock,
    title: 'Open every day',
    line: 'Seven days a week, 9:30 am to 8:30 pm.',
  },
  {
    icon: Truck,
    title: 'Pickup and drop',
    line: 'We can collect your car and bring it back to you.',
  },
];

export default function WhyUs() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Why CR Cars</Eyebrow>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-display-sm text-ink-900">
              No surprises, ever
              <span className="text-brass">.</span>
            </h2>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={staggerParent}
          className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {POINTS.map(({ icon: Icon, title, line }) => (
            <motion.div
              key={title}
              variants={staggerChild}
              /* One shared background with a 1px grid gap showing through,
                 rather than four bordered cards — it reads as a single
                 machined panel divided up, which is quieter and costs no
                 extra markup. */
              className="group bg-paper p-7 transition-colors duration-500 hover:bg-paper-50 lg:p-8"
            >
              <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-paper-200 text-ink-900 transition-colors duration-500 group-hover:bg-ink-900 group-hover:text-brass">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-600 text-ink-900">{title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                {line}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
