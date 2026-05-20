import { motion, AnimatePresence } from 'motion/react';
import logoSrc from '@/assets/images/logo-phoenix.webp';
import { PhoenixButton } from '@/shared/phoenix';

interface HeroSceneMainProps {
  isVisible: boolean;
}

export function HeroSceneMain({ isVisible }: HeroSceneMainProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scene3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="mb-6 flex justify-center"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-3xl bg-secondary opacity-40 animate-pulse rounded-full" />
              <img
                src={logoSrc}
                alt="Golden Phoenix Logo"
                className="relative w-70 h-70 md:w-80 md:h-80 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-phoenix-white mb-4 tracking-wider"
          >
            RISE OF THE PHOENIX
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-body text-phoenix-white text-xl md:text-2xl mb-10 tracking-[0.2em] font-bold"
          >
            FROM THE ASHES
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <PhoenixButton variant="gold">Seja Sócio</PhoenixButton>
            <PhoenixButton variant="black">Loja Oficial</PhoenixButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
