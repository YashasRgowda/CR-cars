'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A brass hairline across the top of the viewport tracking read position.
 *
 * Two pixels of ornament that make a long page feel finite. Spring-damped
 * rather than bound straight to scroll, so a trackpad flick does not make
 * it twitch.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brass-deep via-brass to-brass-soft"
      aria-hidden
    />
  );
}
