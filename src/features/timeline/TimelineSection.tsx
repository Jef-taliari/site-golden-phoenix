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
    <section id="história" className="relative py-32 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="font-heading text-6xl md:text-8xl text-foreground mb-4 tracking-wider">NOSSA HISTÓRIA</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto">De um sonho à realidade, nossa jornada é marcada por dedicação, paixão e superação</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div key={event.year} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-card to-background border border-ring/30 rounded-lg p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500" />
                    <div className="relative z-10">
                      <div className="font-heading text-5xl md:text-7xl text-primary mb-4">{event.year}</div>
                      <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-3 tracking-wider">{event.title}</h3>
                      <p className="text-foreground/70 text-lg">{event.description}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="relative z-10 hidden md:block">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50" />
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
