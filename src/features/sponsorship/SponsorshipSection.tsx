import { motion } from 'motion/react';
import { TrendingUp, Users, Eye, Share2 } from 'lucide-react';
import logoSrc from '@/assets/images/logo-phoenix.webp';

const stats = [
  { icon: Users, label: 'TORCEDORES', value: '5K+' },
  { icon: Eye, label: 'VISUALIZAÇÕES/MÊS', value: '50K+' },
  { icon: Share2, label: 'ALCANCE SOCIAL', value: '100K+' },
  { icon: TrendingUp, label: 'CRESCIMENTO', value: '+200%' },
];

export default function SponsorshipSection() {
  return (
    <section id="patrocínio" className="relative py-32 bg-background overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-6xl md:text-8xl text-foreground mb-4 tracking-wider">
            PATROCÍNIO
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-foreground/70 text-xl max-w-2xl mx-auto">
            Faça parte da ascensão do futebol americano em Arapongas
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-card to-background border-2 border-ring/30 rounded-lg p-8 text-center transition-all hover:border-secondary hover:shadow-2xl hover:shadow-secondary/20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={32} className="text-background" />
                </div>
                <div className="font-heading text-5xl text-primary mb-2">{stat.value}</div>
                <div className="text-foreground/70 text-sm tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary to-secondary rounded-lg p-12 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)'
            }} />
          </div>

          <div className="relative z-10 text-center">
            <div className="text-2x1 mb-1">
              <img 
                src={logoSrc} 
                alt="Logo Golden Phoenix" 
                className="inline-block h-64 w-auto" // ou h-16 se quiser menor
              />
            </div>
            <h3 className="font-heading text-4xl md:text-6xl text-background mb-6 tracking-wider">
              TORNE-SE PARTE DA ASCENSÃO
            </h3>
            <p className="text-background/80 text-xl mb-8 max-w-2xl mx-auto">
              Associe sua marca ao time que está revolucionando o futebol americano no Paraná.
              Visibilidade em jogos, transmissões e redes sociais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-10 py-5 bg-background text-foreground font-heading text-2xl font-bold tracking-wider hover:bg-card transition-all">
                QUERO SER PATROCINADOR
              </button>
              <button className="px-10 py-5 border-2 border-background text-background font-heading text-2xl font-bold tracking-wider hover:bg-background hover:text-foreground transition-all">
                BAIXAR MÍDIA KIT
              </button>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'EXPOSIÇÃO DE MARCA',
              description: 'Logo em uniformes, transmissões ao vivo e redes sociais',
            },
            {
              title: 'EVENTOS EXCLUSIVOS',
              description: 'Acesso VIP a jogos e eventos especiais do time',
            },
            {
              title: 'COMUNIDADE ENGAJADA',
              description: 'Conexão direta com milhares de fãs apaixonados',
            },
          ].map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-card border border-ring/30 rounded-lg p-6 text-center"
            >
              <h4 className="font-heading text-2xl text-primary mb-3 tracking-wider">
                {benefit.title}
              </h4>
              <p className="text-foreground/70">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
