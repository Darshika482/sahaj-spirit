import { motion, type Variants } from 'motion/react';
import type { ComponentType, ElementType, ReactNode } from 'react';
import { useMemo } from 'react';
import { SAHAJ_EASE } from '../../lib/motion';

/**
 * Cache motion-wrapped components so we don't re-create them on every render.
 * Re-creating `motion(Tag)` per render causes React to remount the element
 * each time the parent re-renders (e.g. a 1Hz countdown), which restarts the
 * entry animation and looks like blinking.
 */
const motionTagCache = new Map<ElementType, ComponentType<Record<string, unknown>>>();
function getMotionTag(tag: ElementType) {
  const existing = motionTagCache.get(tag);
  if (existing) return existing;
  const created = motion(tag as ElementType) as unknown as ComponentType<Record<string, unknown>>;
  motionTagCache.set(tag, created);
  return created;
}

type Mode = 'fade' | 'words';

interface BlurTextProps {
  children?: ReactNode;
  text?: string;
  as?: ElementType;
  className?: string;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  duration?: number;
  blur?: number;
  y?: number;
  once?: boolean;
  amount?: number;
}

/**
 * BlurText — scroll-triggered blur-to-focus fade-up text animation.
 *
 *  • mode="fade"  : the whole block fades + de-blurs as one (default for paragraphs)
 *  • mode="words" : splits children/text into words and staggers them (great for headings)
 *
 * Pass blur={0} for body copy — avoids CSS filter artifacts on small text.
 */
export default function BlurText({
  children,
  text,
  as: Tag = 'div',
  className = '',
  mode = 'fade',
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  blur = 14,
  y = 22,
  once = true,
  amount = 0.3,
}: BlurTextProps) {
  const useBlur = blur > 0;

  if (mode === 'words') {
    const source = text ?? (typeof children === 'string' ? children : '');
    const words = source.split(/(\s+)/); // keep spaces as separate tokens

    const container: Variants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    };

    const wordHidden = useBlur
      ? { opacity: 0, y, filter: `blur(${blur}px)` }
      : { opacity: 0, y };

    const wordVisible = useBlur
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 1, y: 0 };

    const wordVariants: Variants = {
      hidden: wordHidden,
      visible: {
        ...wordVisible,
        transition: { duration, ease: SAHAJ_EASE },
      },
    };

    const MotionTag = useMemo(() => getMotionTag(Tag), [Tag]);

    return (
      <MotionTag
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {words.map((w, i) =>
          /^\s+$/.test(w) ? (
            <span key={`s-${i}`}>{w}</span>
          ) : (
            <motion.span
              key={`w-${i}`}
              variants={wordVariants}
              style={{
                display: 'inline-block',
                willChange: useBlur ? 'transform, filter, opacity' : 'transform, opacity',
              }}
            >
              {w}
            </motion.span>
          )
        )}
      </MotionTag>
    );
  }

  const variants: Variants = {
    hidden: useBlur
      ? { opacity: 0, y, filter: `blur(${blur}px)` }
      : { opacity: 0, y },
    visible: {
      ...(useBlur
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 1, y: 0 }),
      transition: { duration, ease: SAHAJ_EASE, delay },
    },
  };

  const MotionTag = useMemo(() => getMotionTag(Tag), [Tag]);

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      style={{ willChange: useBlur ? 'transform, filter, opacity' : 'transform, opacity' }}
    >
      {children ?? text}
    </MotionTag>
  );
}
