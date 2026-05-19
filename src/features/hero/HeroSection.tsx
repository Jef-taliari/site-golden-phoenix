import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import logoSrc from '@/assets/images/logo-phoenix.webp';
import logoNomeSrc from '@/assets/images/logo-nome-phoenix.webp';
import { PhoenixButton } from '@/shared/phoenix';
import {
  FRAME_START,
  TOTAL_FRAMES,
  SCROLL_HEIGHT,
  EASE,
  SCENE3_START,
  getFramePath,
} from './hero.config';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
import { Particles } from '@/shared/animations/Particles';

export default function HeroSection() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const imagesRef       = useRef<HTMLImageElement[]>([]);
  const rafRef          = useRef<number | null>(null);
  const targetFrameRef  = useRef(0);
  const currentFrameRef = useRef(0);

  const [progress, setProgress]       = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded]     = useState(false);

  const totalFrames = TOTAL_FRAMES;

  const scene =
    progress < 0.00         ? 0 :
    progress < 0.10         ? 1 :
    progress < SCENE3_START ? 2 :
                              3;

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (canvas.width !== w)  canvas.width  = w;
    if (canvas.height !== h) canvas.height = h;

    const imgRatio    = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let sw, sh, sx, sy;

    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }, []);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(FRAME_START + i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === 1) drawFrame(0);
        if (loaded === totalFrames) setAllLoaded(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame, totalFrames]);

  useEffect(() => {
    if (!allLoaded) return;

    const container = containerRef.current;
    if (!container) return;

    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * EASE;

      const frameIndex = Math.round(currentFrameRef.current);
      const clamped    = Math.max(0, Math.min(totalFrames - 1, frameIndex));
      drawFrame(clamped);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onScroll = () => {
      const rect       = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled   = Math.max(0, -rect.top);
      const p          = Math.min(Math.max(scrolled / scrollable, 0), 1);

      setProgress(p);
      targetFrameRef.current = p * (totalFrames - 1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [allLoaded, drawFrame, totalFrames]);

  const loadPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT, position: 'relative' }}>

      <div
        style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}
        className="bg-black"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Animação de apresentação do Golden Phoenix"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

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

        <Particles />

        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-20" />

        <div className="absolute inset-0 flex items-center justify-center z-30">

          <AnimatePresence>
            {scene === 1 && (
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
                    <span className="text-sm tracking-widest opacity-70 font-bold text-phoenix-white">ROLE PARA AVANÇAR</span>
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {scene === 3 && (
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
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full z-40">
          <div
            className="h-full bg-primary transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
