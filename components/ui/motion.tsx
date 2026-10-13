'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

/**
 * The motion vocabulary. Four primitives, used everywhere.
 *
 * Keeping them here rather than writing transitions per component is what
 * makes the site feel like one object: every entrance travels the same
 * distance on the same curve, so the eye stops noticing the animation and
 * starts reading it as the page simply arriving.
 *
 * Every primitive honours prefers-reduced-motion, which on this site is
 * not a checkbox exercise — a lot of these customers will open the page on
 * a phone, one-handed, in a workshop.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------
   SplitText — words rise from behind a mask.

   The mask is the whole difference between this and a fade: type appears
   to be printed on something moving up past a window, rather than
   materialising out of nowhere. Split by word, not by character — it
   keeps the node count sane and it keeps the line readable while it is
   still arriving.
   ------------------------------------------------------------------ */
export function SplitText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.055,
  duration = 0.95,
  as: Tag = 'span',
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const MotionTag = motion[Tag];

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12%' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          /* pb/-mb gives descenders room so the mask does not clip them. */
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '115%' },
              show: { y: '0%', transition: { duration, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------
   Reveal — the house entrance. One distance, one easing, everywhere.
   ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  blur = true,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(10px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-10%' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE },
  },
};

/* ------------------------------------------------------------------
   Magnetic — the control leans toward the cursor before you reach it.

   Costs almost nothing, and it is the detail people describe as "feels
   expensive" without being able to name what they noticed.
   ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------
   Eyebrow — the small-caps label above every section heading, with the
   brass rule that is this brand's one piece of ornament.
   ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  centered = false,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  centered?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={`flex items-center gap-4 ${centered ? 'justify-center' : ''} ${className}`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, ease: EASE, delay: delay + 0.1 }}
        className="h-px w-12 origin-left bg-gradient-to-r from-brass to-brass/20"
      />
      <span className="text-[11px] font-500 uppercase tracking-eyebrow text-muted">
        {children}
      </span>
      {centered && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + 0.1 }}
          className="h-px w-12 origin-right bg-gradient-to-l from-brass to-brass/20"
        />
      )}
    </motion.div>
  );
}
