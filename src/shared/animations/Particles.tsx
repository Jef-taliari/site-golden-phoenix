import { useMemo } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';

export function Particles() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const particles = useMemo(() =>
    [...Array(prefersReducedMotion ? 10 : 30)].map((_, i) => ({
      id: i,
      x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
      y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
      targetY: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
      duration: Math.random() * 10 + 5,
    })), [prefersReducedMotion]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-primary rounded-full"
          initial={{ x: p.x, y: p.y, opacity: 0.2 }}
          animate={prefersReducedMotion ? undefined : { y: [null, p.targetY], opacity: [0.2, 0.6, 0.2] }}
          transition={prefersReducedMotion ? undefined : { duration: p.duration, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}
