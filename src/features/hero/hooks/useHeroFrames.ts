import { useEffect, useRef, useState, useCallback } from 'react';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';
import { getFramePath, SCENE3_START } from '../hero.config';

interface UseHeroFramesProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  totalFrames: number;
  frameStart: number;
  ease: number;
}

export function useHeroFrames({
  containerRef,
  canvasRef,
  totalFrames,
  frameStart,
  ease,
}: UseHeroFramesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  const scene =
    progress < 0.00         ? 0 :
    progress < 0.10         ? 1 :
    progress < SCENE3_START ? 2 :
                              3;

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    const imgRatio = img.naturalWidth / img.naturalHeight;
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
  }, [canvasRef]);

  // Carrega as imagens dos frames sequenciais
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    if (prefersReducedMotion) {
      // Se o usuário preferir movimento reduzido, não precisamos baixar todos os 328 frames!
      // Economiza rede e memória significativamente.
      // Carregamos apenas o último frame (Cena 3 estática completa).
      const img = new Image();
      img.src = getFramePath(frameStart + totalFrames - 1);
      img.onload = () => {
        imagesRef.current = [img];
        setLoadedCount(totalFrames); // Força 100% de progresso
        setAllLoaded(true);
        // Pequeno timeout para garantir que o canvas esteja pronto no DOM
        setTimeout(() => drawFrame(0), 50);
      };
      return;
    }

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(frameStart + i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === 1) drawFrame(0);
        if (loaded === totalFrames) setAllLoaded(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame, totalFrames, frameStart, prefersReducedMotion]);

  // Loop requestAnimationFrame + Listener de Scroll
  useEffect(() => {
    if (!allLoaded) return;
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) {
      // Se movimento reduzido ativado, escuta o scroll apenas para atualizar as cenas e progresso
      const onScrollReduced = () => {
        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const p = Math.min(Math.max(scrolled / scrollable, 0), 1);
        setProgress(p);
      };
      window.addEventListener('scroll', onScrollReduced, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScrollReduced);
      };
    }

    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * ease;

      const frameIndex = Math.round(currentFrameRef.current);
      const clamped = Math.max(0, Math.min(totalFrames - 1, frameIndex));
      drawFrame(clamped);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(Math.max(scrolled / scrollable, 0), 1);

      setProgress(p);
      targetFrameRef.current = p * (totalFrames - 1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [allLoaded, drawFrame, totalFrames, ease, prefersReducedMotion, containerRef]);

  const loadPercent = Math.round((loadedCount / totalFrames) * 100);

  return {
    progress,
    loadedCount,
    allLoaded,
    loadPercent,
    scene,
    prefersReducedMotion,
  };
}
