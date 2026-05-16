import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0C0C0D] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🔥</div>
              <div className="font-['Teko'] text-2xl text-[#D4AF37] tracking-wider">
                GOLDEN PHOENIX
              </div>
            </div>
            <p className="text-white/70 mb-6">
              Futebol Americano de Arapongas. Ascendendo das cinzas para dominar o campo.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-[#D4AF37]/30 rounded flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0D] transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-[#D4AF37]/30 rounded flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0D] transition-all"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-[#D4AF37]/30 rounded flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0D] transition-all"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-[#D4AF37]/30 rounded flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0D] transition-all"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Teko'] text-2xl text-white mb-4 tracking-wider">NAVEGAÇÃO</h4>
            <ul className="space-y-2">
              {['Próximo Jogo', 'História', 'Elenco', 'Fan Zone', 'Loja', 'Patrocínio'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-white/70 hover:text-[#D4AF37] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Teko'] text-2xl text-white mb-4 tracking-wider">CONTATO</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70">
                <Mail size={20} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>contato@goldenphoenix.com.br</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Phone size={20} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>(43) 9999-9999</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin size={20} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>Arapongas, PR - Brasil</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-['Teko'] text-2xl text-white mb-4 tracking-wider">NEWSLETTER</h4>
            <p className="text-white/70 mb-4">Receba novidades e atualizações do time</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 bg-[#1a1a1c] border border-[#D4AF37]/30 rounded px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
              <button className="px-4 py-2 bg-[#D4AF37] text-[#0C0C0D] rounded font-bold hover:bg-[#FF5100] hover:text-white transition-all">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
            <p>© 2026 Golden Phoenix. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
