import { motion } from 'motion/react';
import { Award, Target, Users, Zap } from 'lucide-react';
import { PhoenixButton } from '@/shared/phoenix';

const concepts = [
  {
    icon: Target,
    title: 'DOWNS',
    description:
      'O time tem 4 tentativas (downs) para avançar 10 jardas. Conseguiu? Ganha mais 4 tentativas!',
  },
  {
    icon: Award,
    title: 'TOUCHDOWN',
    description: 'Vale 6 pontos! Acontece quando a bola cruza a linha de gol adversária.',
  },
  {
    icon: Zap,
    title: 'FIELD GOAL',
    description:
      'Chute entre as traves vale 3 pontos. Alternativa quando não consegue o touchdown.',
  },
  {
    icon: Users,
    title: 'POSIÇÕES',
    description:
      'Ataque (Offense), Defesa (Defense) e Times Especiais. Cada um com funções estratégicas.',
  },
];

export default function FanZoneSection() {
  return (
    <section id="fan-zone" className="relative py-32 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-6xl md:text-8xl text-foreground mb-4 tracking-wider">
            FAN ZONE
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto">
            Novo no futebol americano? Aprenda os conceitos básicos e torne-se um verdadeiro fã!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-card to-background border-2 border-ring/30 rounded-lg p-8 overflow-hidden transition-all hover:border-secondary hover:shadow-2xl hover:shadow-secondary/20">
                {/* Background Icon */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <concept.icon size={120} className="text-primary" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <concept.icon size={32} className="text-background" />
                    </div>
                    <h3 className="font-heading text-3xl text-foreground tracking-wider">
                      {concept.title}
                    </h3>
                  </div>
                  <p className="text-foreground/70 text-lg leading-relaxed">{concept.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Field Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-card to-background border-2 border-ring/30 rounded-lg p-12 overflow-hidden"
        >
          <h3 className="font-heading text-4xl text-foreground text-center mb-8 tracking-wider">
            O CAMPO DE FUTEBOL AMERICANO
          </h3>

          {/* Simplified Field */}
          <div className="relative bg-gradient-to-r from-background via-green-900/20 to-background rounded-lg overflow-hidden">
            {/* Field Lines */}
            <div className="grid grid-cols-11 border-y-2 border-white/30">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className="border-x border-white/20 h-32 flex items-center justify-center text-foreground/50 font-heading text-xl"
                >
                  {i === 0 || i === 10 ? 'END ZONE' : `${Math.abs(50 - i * 10)}`}
                </div>
              ))}
            </div>

            {/* Field Markers */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/50" />
          </div>

          <p className="text-center text-foreground/70 mt-6">
            100 jardas de extensão + 2 end zones de 10 jardas cada
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <PhoenixButton variant="gold">GUIA COMPLETO DO FAN</PhoenixButton>
        </motion.div>
      </div>
    </section>
  );
}
