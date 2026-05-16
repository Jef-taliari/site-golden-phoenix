import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    <section id="próximo-jogo" className="relative py-32 bg-[#0C0C0D]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-['Teko'] text-6xl md:text-8xl text-white mb-4 tracking-wider">
            PRÓXIMO JOGO
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#1a1a1c] to-[#0C0C0D] border-2 border-[#D4AF37]/30 rounded-lg overflow-hidden"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-[#D4AF37]/5 blur-3xl" />

          <div className="relative p-8 md:p-12">
            {/* Teams Matchup */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
              {/* Home Team */}
              <div className="text-center flex-1">
                <div className="text-8xl mb-4">🔥</div>
                <h3 className="font-['Teko'] text-4xl md:text-5xl text-[#D4AF37] tracking-wider">
                  GOLDEN PHOENIX
                </h3>
                <p className="text-white/70">Arapongas</p>
              </div>

              {/* VS */}
              <div className="font-['Saira_Stencil_One'] text-5xl md:text-7xl text-white">VS</div>

              {/* Away Team */}
              <div className="text-center flex-1">
                <div className="text-8xl mb-4">⚡</div>
                <h3 className="font-['Teko'] text-4xl md:text-5xl text-white tracking-wider">
                  MARINGÁ PYROS
                </h3>
                <p className="text-white/70">Maringá</p>
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
                  className="bg-[#0C0C0D] border border-[#D4AF37]/30 rounded p-6 text-center"
                >
                  <div className="font-['Teko'] text-5xl md:text-6xl text-[#D4AF37] mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-white/70 text-sm tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Game Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 text-white">
                <Calendar className="text-[#D4AF37]" size={24} />
                <div>
                  <p className="text-sm text-white/70">Data</p>
                  <p className="font-['Teko'] text-xl">15 DE JUNHO, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Clock className="text-[#D4AF37]" size={24} />
                <div>
                  <p className="text-sm text-white/70">Horário</p>
                  <p className="font-['Teko'] text-xl">19:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <MapPin className="text-[#D4AF37]" size={24} />
                <div>
                  <p className="text-sm text-white/70">Local</p>
                  <p className="font-['Teko'] text-xl">ESTÁDIO DOS PÁSSAROS</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-[#D4AF37] text-[#0C0C0D] font-['Teko'] text-2xl font-bold tracking-wider overflow-hidden transition-all hover:scale-105">
                <div className="absolute inset-0 bg-[#FF5100] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white flex items-center gap-2 justify-center">
                  <Ticket size={24} />
                  COMPRAR INGRESSO
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-['Teko'] text-2xl font-bold tracking-wider hover:bg-[#D4AF37] hover:text-[#0C0C0D] transition-all flex items-center gap-2 justify-center">
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
