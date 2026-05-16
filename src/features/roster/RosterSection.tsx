import { motion } from 'motion/react';
import { useState } from 'react';

const players = [
  { number: '7', name: 'LUCAS SANTOS', position: 'QUARTERBACK', stats: '2.5K YDS • 18 TDs' },
  { number: '23', name: 'RAFAEL OLIVEIRA', position: 'RUNNING BACK', stats: '1.2K YDS • 12 TDs' },
  { number: '88', name: 'GABRIEL SILVA', position: 'WIDE RECEIVER', stats: '850 YDS • 10 TDs' },
  { number: '54', name: 'MARCOS COSTA', position: 'LINEBACKER', stats: '85 TACKLES • 5 SACKS' },
  { number: '99', name: 'JOÃO MENDES', position: 'DEFENSIVE END', stats: '42 TACKLES • 8 SACKS' },
  { number: '21', name: 'PEDRO ALVES', position: 'CORNERBACK', stats: '45 TACKLES • 4 INT' },
  { number: '12', name: 'DIEGO FERREIRA', position: 'SAFETY', stats: '52 TACKLES • 3 INT' },
  { number: '77', name: 'RICARDO LIMA', position: 'OFFENSIVE TACKLE', stats: '16 GAMES • 0 SACKS' },
];

export default function RosterSection() {
  const [hoveredPlayer, setHoveredPlayer] = useState<number | null>(null);

  return (
    <section id="elenco" className="relative py-32 bg-[#0C0C0D]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-['Teko'] text-6xl md:text-8xl text-white mb-4 tracking-wider">
            ELENCO
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Os guerreiros que defendem as cores do Golden Phoenix
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player, index) => (
            <motion.div
              key={player.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPlayer(index)}
              onMouseLeave={() => setHoveredPlayer(null)}
              className="relative group cursor-pointer"
            >
              <div className="relative bg-gradient-to-br from-[#1a1a1c] to-[#0C0C0D] border-2 border-[#D4AF37]/30 rounded-lg overflow-hidden aspect-[3/4] transition-all duration-300 hover:border-[#FF5100] hover:shadow-2xl hover:shadow-[#FF5100]/30">
                {/* Number Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="font-['Teko'] text-[200px] text-[#D4AF37] leading-none">
                    {player.number}
                  </div>
                </div>

                {/* Player Avatar */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF5100] flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                  🏈
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0C0C0D] to-transparent">
                  {/* Number */}
                  <div className="font-['Teko'] text-5xl text-[#D4AF37] mb-2">#{player.number}</div>

                  {/* Name */}
                  <h3 className="font-['Teko'] text-2xl text-white mb-1 tracking-wider">
                    {player.name}
                  </h3>

                  {/* Position */}
                  <p className="text-[#D4AF37] text-sm mb-3 tracking-wider">{player.position}</p>

                  {/* Stats - Show on Hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredPlayer === index ? 1 : 0,
                      height: hoveredPlayer === index ? 'auto' : 0,
                    }}
                    className="text-white/70 text-sm border-t border-[#D4AF37]/30 pt-3"
                  >
                    {player.stats}
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#FF5100]/0 group-hover:bg-[#FF5100]/10 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-['Teko'] text-2xl font-bold tracking-wider hover:bg-[#D4AF37] hover:text-[#0C0C0D] transition-all">
            VER ELENCO COMPLETO
          </button>
        </motion.div>
      </div>
    </section>
  );
}
