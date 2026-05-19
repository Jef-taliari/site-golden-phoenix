import { useMemo } from 'react';
import { motion } from 'motion/react';

export function Particles() {
  const particles = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
      y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
      targetY: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
      duration: Math.random() * 10 + 5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-primary rounded-full"
          initial={{ x: p.x, y: p.y, opacity: 0.2 }}
          animate={{ y: [null, p.targetY], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}
