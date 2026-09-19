'use client';

import * as React from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type Variants,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * A section-level entrance: content rises a little and fades in once, the
 * first time it is scrolled to. `delay` staggers siblings by hand where a
 * container variant would be more machinery than the case needs.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'li' | 'span' | 'p';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.72, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Words rise in sequence. Used once, on the hero headline. */
export function RevealWords({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.86, delay: 0.08 + i * 0.055, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>
          {/*
            A real, breaking space between the word wrappers. This used to be a
            non-breaking space inside them, which stopped the headline wrapping
            at all; on a phone the line simply ran off the side of the screen.
          */}
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

/** Children appear one after another as the list scrolls into view. */
export function Stagger({
  children,
  className,
  step = 0.075,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
}) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : step } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-56px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/**
 * Counts to a number when scrolled to. `suffix` carries the unit so the count
 * and its "%" never separate onto different lines.
 */
export function CountUp({
  to,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-48px' });
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(reduce ? to : 0);

  React.useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/** A slow vertical drift tied to scroll. Kept small; it should not be noticed. */
export function Parallax({
  children,
  className,
  distance = 44,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 64, damping: 22, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/** A soft float, used on the cards around the hero phone. */
export function Float({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 7.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Wipes an image or panel into view behind a mask. */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export { motion, useMotionValue, useReducedMotion, EASE };
