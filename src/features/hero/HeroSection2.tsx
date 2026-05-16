import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Ticket } from 'lucide-react';
import videoSrc from '@/assets/videos/golden-phoenix.mp4';
import logoSrc from '@/assets/images/logo.png';

// ─────────────────────────────────────────────
// CONFIGURAÇÕES — ajuste conforme seu projeto
// ─────────────────────────────────────────────

/** Altura total do "trilho" de scroll. Mais vh = rola mais devagar.
 *  Regra: ~50vh por segundo de vídeo. Ex: vídeo 10s → 500vh */
const SCROLL_HEIGHT = '400vh';

/** Suavização do scrubbing (0.05 = muito suave | 0.25 = mais responsivo) */
const EASE = 0.05;

/** A partir de qual progresso (0–1) a cena 3 (logo + CTA) aparece */
const SCENE3_START = 0.82;

// ─────────────────────────────────────────────

export default function HeroSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const rafRef        = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);

  const [progress, setProgress] = useState(0);

  // Cenas baseadas no progresso
  const scene =
    progress < 0.25         ? 1 :
    progress < SCENE3_START ? 2 :
                              3;

  // ── Scroll listener + canvas scrubbing via RAF ──────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const video     = videoRef.current;
    const canvas    = canvasRef.current;
    if (!container || !video || !canvas) return;

    const ctx = canvas.getContext('2d');

    // Pausa o vídeo — não queremos autoplay, só scrubbing
    const onMeta = () => {
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener('loadedmetadata', onMeta);

    // RAF loop: interpola currentTime e desenha no canvas
    const tick = () => {
      if (video.readyState >= 2 && ctx) {
        // Interpola suavemente em direção ao target
        const diff = targetTimeRef.current - currentTimeRef.current;
        currentTimeRef.current += diff * EASE;

        // Só atualiza o DOM se a diferença for perceptível (evita jitter)
        if (Math.abs(video.currentTime - currentTimeRef.current) > 0.008) {
          video.currentTime = currentTimeRef.current;
        }

        // Desenha o frame atual no canvas (muito mais suave que <video>)
        canvas.width  = video.videoWidth  || canvas.offsetWidth;
        canvas.height = video.videoHeight || canvas.offsetHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Calcula progresso do scroll dentro do container
    const onScroll = () => {
      const rect      = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled  = Math.max(0, -rect.top);
      const p         = Math.min(Math.max(scrolled / scrollable, 0), 2);

      setProgress(p);

      const videoProgress = Math.min(p / 0.5, 1);

      if (video.duration) {
        targetTimeRef.current =
          videoProgress * video.duration;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadedmetadata', onMeta);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT, position: 'relative' }}>

      {/* ── Sticky frame ──────────────────────────────────────────────── */}
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}
        className="bg-background"
      >
        {/* Vídeo oculto — só serve de fonte de frames */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          style={{ display: 'none' }}
        />

        {/* Canvas — exibe os frames com suavidade */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Partículas douradas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0.2,
              }}
              animate={{
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Overlays de gradiente */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none z-20" />

        {/* ── Cenas ─────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center z-30">

          {/* CENA 1 — Nome do time */}
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="font-['Inter'] text-[#D4AF37] text-xl md:text-2xl tracking-[0.3em] font-light"
                >
                  ARAPONGAS
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="font-['Saira_Stencil_One'] text-white text-5xl md:text-7xl lg:text-9xl tracking-wider"
                >
                  GOLDEN PHOENIX
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="font-['Inter'] text-[#D4AF37] text-sm md:text-base tracking-[0.4em] font-light"
                >
                  FUTEBOL AMERICANO
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="pt-16 flex flex-col items-center gap-2 text-[#D4AF37]"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-sm tracking-widest opacity-70">ROLE PARA AVANÇAR</span>
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CENA 2 — Logo + CTA (aparece no final do vídeo) */}
          <AnimatePresence>
            {scene === 3 && (
              <motion.div
                key="scene3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="relative max-w-6xl mx-auto px-6 text-center"
              >
                {/* Logo com glow — tamanho reduzido */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative inline-block">
                    {/* Glow atrás da logo */}
                    <div className="absolute inset-0 blur-3xl bg-[#FF5100] opacity-40 animate-pulse rounded-full" />
                    <img
                      src={logoSrc}
                      alt="Golden Phoenix Logo"
                      className="relative w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                    />
                  </div>
                </motion.div>

                {/* Título */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-['Saira_Stencil_One'] text-5xl md:text-7xl lg:text-9xl text-foreground mb-4 tracking-wider"
                >
                  RISE OF THE PHOENIX
                </motion.h1>

                {/* Subtítulo */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-['Inter'] text-[#D4AF37] text-xl md:text-2xl mb-10 tracking-[0.2em] font-light"
                >
                  FROM THE ASHES
                </motion.p>

                {/* Botões CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-['Teko'] text-2xl font-bold tracking-wider overflow-hidden transition-all hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Comprar Ingressos <Ticket size={24} />
                    </span>
                  </button>
                  <button className="px-8 py-4 border-2 border-primary text-primary font-['Teko'] text-2xl font-bold tracking-wider hover:bg-primary hover:text-primary-foreground transition-all">
                    Seja Sócio
                  </button>
                  <button className="px-8 py-4 border-2 border-foreground text-foreground font-['Teko'] text-2xl font-bold tracking-wider hover:bg-foreground hover:text-background transition-all">
                    Loja Oficial
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Barra de progresso */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-[#D4AF37]/20 w-full z-40">
          <div
            className="h-full bg-[#D4AF37] transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
