import { motion } from 'motion/react';

const timelineEvents = [
  { year: '2021', title: 'FUNDAÇÃO', description: 'Nasce o sonho do futebol americano em Arapongas' },
  { year: '2022', title: 'MARINGÁ PYROS', description: 'Primeiros passos como Maringá Pyros' },
  { year: '2023', title: 'ASSOCIAÇÃO OFICIAL', description: 'Formalização e estruturação do time' },
  { year: '2024', title: 'ESTREIA NACIONAL', description: 'Primeira participação em campeonato nacional' },
  { year: '2025', title: 'VICE-CAMPEONATO PINHÃO BOWL', description: 'Ascensão meteórica ao topo do estado' },
];

export default function TimelineSection() {
  return (
    <section id="história" className="relative py-32 bg-gradient-to-b from-[#0C0C0D] to-[#1a1a1c]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="font-['Teko'] text-6xl md:text-8xl text-white mb-4 tracking-wider">NOSSA HISTÓRIA</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-white/70 text-xl max-w-2xl mx-auto">De um sonho à realidade, nossa jornada é marcada por dedicação, paixão e superação</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-[#FF5100] to-[#D4AF37] hidden md:block" />
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div key={event.year} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-[#1a1a1c] to-[#0C0C0D] border border-[#D4AF37]/30 rounded-lg p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#FF5100]/0 group-hover:from-[#D4AF37]/10 group-hover:to-[#FF5100]/10 transition-all duration-500" />
                    <div className="relative z-10">
                      <div className="font-['Saira_Stencil_One'] text-5xl md:text-7xl text-[#D4AF37] mb-4">{event.year}</div>
                      <h3 className="font-['Teko'] text-3xl md:text-4xl text-white mb-3 tracking-wider">{event.title}</h3>
                      <p className="text-white/70 text-lg">{event.description}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="relative z-10 hidden md:block">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="w-6 h-6 bg-[#D4AF37] rounded-full border-4 border-[#0C0C0D] shadow-lg shadow-[#D4AF37]/50" />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
