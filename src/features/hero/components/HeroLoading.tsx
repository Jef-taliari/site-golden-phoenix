import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
import logoSrc from '@/assets/images/logo-phoenix.webp';

interface HeroLoadingProps {
  allLoaded: boolean;
  loadPercent: number;
}

export function HeroLoading({ allLoaded, loadPercent }: HeroLoadingProps) {
  return (
    <AnimatePresence>
      {!allLoaded && (
        <motion.div
          key="loading"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <ImageWithFallback
            src={logoSrc}
            alt="Golden Phoenix"
            className="w-80 h-80 object-contain mb-8 opacity-80"
          />
          <div className="w-48 h-[2px] bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${loadPercent}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <span className="mt-3 font-body text-primary/60 text-xs tracking-[0.3em]">
            {loadPercent}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
