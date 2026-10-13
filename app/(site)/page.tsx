import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/home/WhatWeDo';
import Branches from '@/components/home/Branches';
import WhyUs from '@/components/home/WhyUs';
import Accessories from '@/components/home/Accessories';
import CtaBand from '@/components/CtaBand';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * The home page.
 *
 * Six bands and no more. The owner's one hard requirement was that the
 * site stay simple, and the usual way a site like this stops being
 * simple is that every section somebody thought of gets added — a
 * testimonials carousel, a counter, a blog teaser, a brand marquee.
 *
 * The hero is the photograph and nothing else: no headline over it, no
 * panel on it and no band under it. The order after that is the order a
 * stranger needs it in — what this place does, where the two branches
 * are, why you would trust it, the thing you did not know they sold,
 * and then the ask.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Branches />
      <WhyUs />
      <Accessories />
      <CtaBand message="Hi, I found your website. I would like to book my car." />
    </>
  );
}
