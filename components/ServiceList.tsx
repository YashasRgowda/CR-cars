'use client';

import { motion } from 'framer-motion';
import {
  Armchair,
  ArrowUpRight,
  BatteryCharging,
  Brush,
  Camera,
  Car,
  CarFront,
  CircleDot,
  Cog,
  Cylinder,
  Disc,
  Droplets,
  Gauge,
  Layers,
  Lightbulb,
  Music,
  PaintBucket,
  Settings,
  ShieldCheck,
  Snowflake,
  Sofa,
  Sparkles,
  Truck,
  Waves,
  Wind,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceItem } from '@/lib/services';
import { waForService } from '@/lib/contact';
import { staggerChild, staggerParent } from '@/components/ui/motion';

/**
 * The list of jobs on a service page.
 *
 * Every tile is a WhatsApp link with the service already named in the
 * message. That is the one real interaction on this site: a customer who
 * wants an AC gas refill should not have to type "AC gas refill" — they
 * tap the tile that says it and the message is written for them. It also
 * means the owner's phone tells him what the enquiry is about before he
 * has opened it.
 *
 * The icons are listed out by name rather than reached through a
 * namespace import. `import * as Icons from 'lucide-react'` reads nicely
 * and defeats tree-shaking completely — every icon in the library ends up
 * in the client bundle, which on a site whose customers are on phones on
 * mobile data is a few hundred kilobytes spent on nothing. This map costs
 * one line per icon and ships only what is drawn.
 */
const ICONS: Record<string, LucideIcon> = {
  Armchair,
  BatteryCharging,
  Brush,
  Camera,
  Car,
  CarFront,
  CircleDot,
  Cog,
  Cylinder,
  Disc,
  Droplets,
  Gauge,
  Layers,
  Lightbulb,
  Music,
  PaintBucket,
  Settings,
  ShieldCheck,
  Snowflake,
  Sofa,
  Sparkles,
  Truck,
  Waves,
  Wind,
  Wrench,
};

export default function ServiceList({ items }: { items: ServiceItem[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8%' }}
      variants={staggerParent}
      /* One shared line colour behind a 1px gap: the grid reads as a
         single panel scored into cells rather than as a scatter of
         bordered boxes. */
      className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => {
        /* A typo in lib/services.ts should cost a nice icon, not the page. */
        const Icon = ICONS[item.icon] ?? CircleDot;

        return (
          <motion.li key={item.title} variants={staggerChild}>
            <a
              href={waForService(item.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col bg-paper p-6 transition-colors duration-500 hover:bg-paper-50 lg:p-7"
            >
              <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-paper-200 text-ink-900 transition-colors duration-500 group-hover:bg-ink-900 group-hover:text-brass">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-600 text-ink-900">{item.title}</h3>
              <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
                {item.line}
              </p>
              {/* Always visible on touch, where there is no hover to reveal
                  it — and where most of this traffic is. It only hides
                  itself on pointer devices, which can discover it. */}
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-500 uppercase tracking-[0.14em] text-brass-ink transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                Ask on WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
