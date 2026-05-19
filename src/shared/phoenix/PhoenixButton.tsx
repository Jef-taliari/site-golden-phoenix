import { cn } from '@/shared/lib/utils';

// ─────────────────────────────────────────────────────────────────
// PhoenixButton — botão com identidade visual Golden Phoenix
//
// Variantes:
//   gold          → fundo dourado, texto escuro (CTA principal)
//   outline-gold  → borda dourada, texto dourado, hover fundo dourado
//   outline-white → borda foreground, texto foreground, hover fundo foreground
//   secondary     → fundo laranja, texto foreground (destaque secundário)
//
// Uso:
//   <PhoenixButton variant="gold" onClick={...}>Comprar Ingresso</PhoenixButton>
//   <PhoenixButton variant="outline-gold" size="sm">Seja Sócio</PhoenixButton>
//   <PhoenixButton variant="gold" fullWidth>Ver Elenco</PhoenixButton>
// ─────────────────────────────────────────────────────────────────

export type PhoenixButtonVariant =
  | 'gold'
  | 'outline-gold'
  | 'gold-orange'
  | 'outline-white'
  | 'secondary'
  | 'black'
  | 'outline-black';

export type PhoenixButtonSize = 'sm' | 'md' | 'lg';

interface PhoenixButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PhoenixButtonVariant;
  size?: PhoenixButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<PhoenixButtonVariant, string> = {
  'gold':
    `
    bg-gradient-to-b
    from-primary
    to-[#B89220]
    text-phoenix-black
    border border-primary/40
    shadow-[0_0_25px_rgba(212,175,55,0.25)]
    hover:brightness-110
    hover:shadow-[0_0_45px_rgba(212,175,55,0.45)]
    hover:-translate-y-0.5
    `,

  'outline-gold':
    `
    bg-primary/5
    backdrop-blur-md
    border border-primary/40
    text-primary
    hover:bg-primary
    hover:text-background
    hover:shadow-[0_0_35px_rgba(212,175,55,0.35)]
    hover:-translate-y-0.5
    `,

  'gold-orange':
    `
    bg-gradient-to-r
    from-primary
    via-[#F5C542]
    to-secondary
    text-background
    border border-primary/30
    shadow-[0_0_35px_rgba(255,140,0,0.25)]
    hover:brightness-110
    hover:shadow-[0_0_55px_rgba(255,140,0,0.45)]
    hover:-translate-y-1
    `,

  'outline-white':
    `
    bg-white/5
    backdrop-blur-md
    border border-white/20
    text-white
    hover:bg-white
    hover:text-background
    hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]
    hover:-translate-y-0.5
    `,

  'secondary':
    `
    bg-secondary
    text-secondary-foreground
    border border-secondary/30
    shadow-[0_0_30px_rgba(255,81,0,0.25)]
    hover:brightness-110
    hover:shadow-[0_0_45px_rgba(255,81,0,0.45)]
    hover:-translate-y-0.5
    `,

  'black':
    `
    bg-black/70
    backdrop-blur-xl
    text-phoenix-gold
    border border-white/10
    shadow-[0_0_30px_rgba(0,0,0,0.45)]
    hover:border-primary/30
    hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]
    hover:-translate-y-0.5
    `,

  'outline-black':
    `
    bg-white
    border border-black/20
    text-black
    hover:bg-black
    hover:text-white
    hover:shadow-[0_0_30px_rgba(0,0,0,0.35)]
    hover:-translate-y-0.5
    `,
};

const sizeClasses: Record<PhoenixButtonSize, string> = {
  sm: 'px-5 py-2 text-lg',
  md: 'px-8 py-4 text-2xl',
  lg: 'px-10 py-5 text-3xl',
};

export function PhoenixButton({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  className,
  children,
  type = 'button',
  ...props
}: PhoenixButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden',
        'rounded-xl',
        'font-heading font-medium tracking-wider uppercase',
        'transition-all duration-500 ease-out',
        'active:scale-[0.98]',
        'disabled:opacity-50 disabled:pointer-events-none',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        'before:-translate-x-[200%]',
        'before:transition-transform before:duration-1000',
        'hover:before:translate-x-[200%]',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
