// ─────────────────────────────────────────────
// CONFIGURAÇÕES — Hero Section
// ─────────────────────────────────────────────

/** Importa todos os frames da pasta de assets */
export const frameUrls = import.meta.glob(
  '/src/assets/frames/*.jpg',
  { eager: true, import: 'default' }
) as Record<string, string>;

/** Primeiro e último número dos frames */
export const FRAME_START  = 1000;
export const FRAME_END    = 1328;
export const TOTAL_FRAMES = FRAME_END - FRAME_START + 1; // 208 frames

/** Retorna a URL do frame pelo índice absoluto (ex: 1000, 1001…) */
export const getFramePath = (index: number): string => {
  const path = `/src/assets/frames/Sequência0${index}.jpg`;
  return frameUrls[path] || '';
};

/** Altura total do trilho de scroll.
 *  Mais vh = animação mais lenta/controlada.
 *  Sugestão: 400–600vh para 208 frames */
export const SCROLL_HEIGHT = '700vh';

/** Suavização do RAF entre frames.
 *  0.08 = suave | 0.25 = responsivo */
export const EASE = 0.08;

/** Progresso (0–1) a partir do qual a cena 3 (logo + CTA) aparece */
export const SCENE3_START = 0.75;
