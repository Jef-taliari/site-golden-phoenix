import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import logoNomeSrc from '@/assets/images/logo-nome-phoenix.webp';

interface HeroSceneIntroProps {
  isVisible: boolean;
}

export function HeroSceneIntro({ isVisible }: HeroSceneIntroProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scene1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="relative mx-auto w-[90vw] max-w-[800px]">
            <motion.img
              src={logoNomeSrc}
              alt="Arapongas Golden Phoenix"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            />
            <motion.div
              initial={{ backgroundPosition: '200% 0%' }}
              animate={{ backgroundPosition: '-100% 0%' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-transparent via-primary to-transparent mix-blend-color-dodge pointer-events-none"
              style={{
                WebkitMaskImage: `url(${logoNomeSrc})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${logoNomeSrc})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-body text-white text-sm md:text-base tracking-[0.4em] font-bold"
          >
            FUTEBOL AMERICANO
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-16 flex flex-col items-center gap-2 text-primary"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm tracking-widest opacity-70 font-bold text-phoenix-white">
                ROLE PARA AVANÇAR
              </span>
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
