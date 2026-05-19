import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';
import logoSrc from '@/assets/images/logo-phoenix.webp';
import logoSrcMaringa from '@/assets/images/logo-maringa-pyros.webp';

export default function NextGameSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-06-15T19:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
            {/* Teams Matchup */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
              {/* Home Team */}
              <div className="text-center flex-1">
                <div className="mb-4 flex justify-center"><img src={logoSrc} width={190} alt="" /></div>
                <h3 className="font-heading text-4xl md:text-5xl text-primary tracking-wider">
                  GOLDEN PHOENIX
                </h3>
                <p className="text-foreground/70">Arapongas</p>
              </div>

              {/* VS */}
              <div className="font-heading text-5xl md:text-7xl text-foreground">VS</div>

              {/* Away Team */}
              <div className="text-center flex-1">
                <div className="mb-4 flex justify-center"><img src={logoSrcMaringa} width={190} alt="" /></div>
                <h3 className="font-heading text-4xl md:text-5xl text-foreground tracking-wider">
                  MARINGÁ PYROS
                </h3>
                <p className="text-foreground/70">Maringá</p>
              </div>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'DIAS', value: timeLeft.days },
                { label: 'HORAS', value: timeLeft.hours },
                { label: 'MINUTOS', value: timeLeft.minutes },
                { label: 'SEGUNDOS', value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-background border border-ring/30 rounded p-6 text-center"
                >
                  <div className="font-heading text-5xl md:text-6xl text-primary mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-foreground/70 text-sm tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Game Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 text-foreground">
                <Calendar className="text-primary" size={24} />
                <div>
                  <p className="text-sm text-foreground/70">Data</p>
                  <p className="font-heading text-xl">15 DE JUNHO, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Clock className="text-primary" size={24} />
                <div>
                  <p className="text-sm text-foreground/70">Horário</p>
                  <p className="font-heading text-xl">19:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <MapPin className="text-primary" size={24} />
                <div>
                  <p className="text-sm text-foreground/70">Local</p>
                  <p className="font-heading text-xl">ESTÁDIO DOS PÁSSAROS</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" className="group relative px-8 py-4 bg-primary text-background font-heading text-2xl font-bold tracking-wider overflow-hidden transition-all hover:scale-105">
                <div className="absolute inset-0 bg-secondary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-foreground flex items-center gap-2 justify-center">
                  <Ticket size={24} />
                  COMPRAR INGRESSO
                </span>
              </button>
              <button type="button" className="px-8 py-4 border-2 border-ring text-primary font-heading text-2xl font-bold tracking-wider hover:bg-primary hover:text-background transition-all flex items-center gap-2 justify-center">
                <MapPin size={24} />
                COMO CHEGAR
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
