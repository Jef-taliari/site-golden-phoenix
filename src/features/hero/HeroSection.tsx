import { useRef } from 'react';
import { Particles } from '@/shared/animations/Particles';
import {
  FRAME_START,
  TOTAL_FRAMES,
  SCROLL_HEIGHT,
  EASE,
} from './hero.config';
import { useHeroFrames } from './hooks/useHeroFrames';
import { HeroLoading } from './components/HeroLoading';
import { HeroSceneIntro } from './components/HeroSceneIntro';
import { HeroSceneMain } from './components/HeroSceneMain';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    progress,
    allLoaded,
    loadPercent,
    scene,
  } = useHeroFrames({
    containerRef,
    canvasRef,
    totalFrames: TOTAL_FRAMES,
    frameStart: FRAME_START,
    ease: EASE,
  });

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Animação de apresentação do Golden Phoenix"
          className="absolute inset-0 w-full h-full"
        />

        <HeroLoading allLoaded={allLoaded} loadPercent={loadPercent} />

        <Particles />

        {/* Gradiente de overlay escuro e efeito de bordas */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-20" />

        <div className="absolute inset-0 flex items-center justify-center z-30">
          <HeroSceneIntro isVisible={scene === 1} />
          <HeroSceneMain isVisible={scene === 3} />
        </div>

        {/* Barra de progresso do scroll no rodapé da seção */}
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
