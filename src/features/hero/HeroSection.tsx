import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Ticket } from 'lucide-react';
import logoSrc from '@/assets/images/logo.png';

// ─────────────────────────────────────────────
// CONFIGURAÇÕES
// ─────────────────────────────────────────────

const frameUrls = import.meta.glob('/src/assets/frames/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

/** Primeiro e último número dos frames */
const FRAME_START = 1000;
const FRAME_END   = 1191;
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1; // 192 frames

/** Caminho dos frames — deve bater com sua pasta */
const getFramePath = (index: number) => {
  const path = `/src/assets/frames/Sequência0${index}.jpg`;
  return frameUrls[path] || '';
};

/** Altura total do trilho de scroll.
 *  Mais vh = animação mais lenta/controlada.
 *  Sugestão: 400–600vh para 192 frames */
const SCROLL_HEIGHT = '700vh';

/** Suavização entre frames (0.08 = suave | 0.25 = responsivo) */
const EASE = 0.08;

/** A partir de qual progresso (0–1) a cena final (logo + CTA) aparece */
const SCENE3_START = 0.72;

// ─────────────────────────────────────────────

export default function HeroSection() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const imagesRef      = useRef<HTMLImageElement[]>([]);
  const rafRef         = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const [progress, setProgress]       = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded]     = useState(false);

  const totalFrames = TOTAL_FRAMES;

  // Cenas baseadas no progresso
  const scene =
    progress < 0.25         ? 1 :
    progress < SCENE3_START ? 2 :
                              3;

  // ── Desenha um frame específico no canvas ────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajusta canvas ao tamanho natural do container
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (canvas.width !== w)  canvas.width  = w;
    if (canvas.height !== h) canvas.height = h;

    // Cover: mantém proporção e corta as bordas
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

  // ── Pré-carrega todos os frames ──────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(FRAME_START + i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        // Exibe o primeiro frame assim que carrega
        if (loaded === 1) drawFrame(0);
        if (loaded === totalFrames) setAllLoaded(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame, totalFrames]);

  // ── Scroll → frame + RAF suavizado ──────────────────────────────
  useEffect(() => {
    if (!allLoaded) return;

    const container = containerRef.current;
    if (!container) return;

    // RAF loop: interpola o frame atual em direção ao target
    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * EASE;

      const frameIndex = Math.round(currentFrameRef.current);
      const clamped    = Math.max(0, Math.min(totalFrames - 1 , frameIndex));
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

  // ── Loading progress percentage ──────────────────────────────────
  const loadPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT, position: 'relative' }}>

      {/* ── Sticky frame ─────────────────────────────────────────── */}
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}
        className="bg-black"
      >
        {/* Canvas — onde os frames são desenhados */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* ── Tela de loading ─────────────────────────────────────── */}
        <AnimatePresence>
          {!allLoaded && (
            <motion.div
              key="loading"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            >
              <img
                src={logoSrc}
                alt="Golden Phoenix"
                className="w-80 h-80 object-contain mb-8 opacity-80"
              />
              {/* Barra de carregamento */}
              <div className="w-48 h-[2px] bg-[#D4AF37]/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#D4AF37]"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadPercent}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <span className="mt-3 font-['Inter'] text-[#D4AF37]/60 text-xs tracking-[0.3em]">
                {loadPercent}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Gradientes */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-20" />

        {/* ── Cenas ────────────────────────────────────────────────── */}
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

          {/* CENA 2 — vazia (os frames contam a história) */}
          {/* Pode adicionar texto flutuante aqui se quiser */}

          {/* CENA 3 — Logo + CTA */}
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
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 blur-3xl bg-[#FF5100] opacity-40 animate-pulse rounded-full" />
                    <img
                      src={logoSrc}
                      alt="Golden Phoenix Logo"
                      className="relative w-80 h-80 md:w-120 md:h-120 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
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
