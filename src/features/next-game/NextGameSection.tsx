import { motion } from 'motion/react';
import { MapPin, Ticket } from 'lucide-react';
import { PhoenixButton } from '@/shared/phoenix';
import { NextGameMatchup } from './components/NextGameMatchup';
import { NextGameCountdown } from './components/NextGameCountdown';
import { NextGameDetails } from './components/NextGameDetails';
import { useNextGame } from '@/features/next-game/hooks/useNextGame';

import { useCountdown } from '@/shared/hooks/use-countdown';
export default function NextGameSection() {
  const data = useNextGame();

  // Ensure hook order stays consistent by calling useCountdown before any early returns.
  const gameDate = data?.game?.date ?? new Date().toISOString();
  const timeLeft = useCountdown(gameDate);

  if (!data) return null;

  const { game } = data;

  return (
    <section id="próximo-jogo" className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-6xl md:text-8xl text-foreground mb-4 tracking-wider">
            PRÓXIMO JOGO
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-popover to-primary-foreground border-2 border-ring/30 rounded-lg overflow-hidden"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-primary/5 blur-3xl" />

          <div className="relative p-8 md:p-12">
            <NextGameMatchup />

            <NextGameCountdown timeLeft={timeLeft} />

            <NextGameDetails />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <PhoenixButton variant="gold" size="md">
                <Ticket size={24} />
                COMPRAR INGRESSO
              </PhoenixButton>
              <PhoenixButton variant="outline-gold" size="md">
                <MapPin size={24} />
                COMO CHEGAR
              </PhoenixButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

