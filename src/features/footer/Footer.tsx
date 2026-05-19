import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logoSrc from '@/assets/images/logo-phoenix.webp';
import { PhoenixButton } from "@/shared/phoenix";

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-ring/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl"><img 
                              src={logoSrc} 
                              alt="Logo Golden Phoenix" 
                              className="inline-block h-20 w-auto" // ou h-16 se quiser menor
                            /></div>
              <div className="font-heading text-2xl text-primary tracking-wider">
                GOLDEN PHOENIX
              </div>
            </div>
            <p className="text-foreground/70 mb-6">
              Futebol Americano de Arapongas. Ascendendo das cinzas para dominar
              o campo.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-ring/30 rounded flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-ring/30 rounded flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-ring/30 rounded flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-ring/30 rounded flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-2xl text-foreground mb-4 tracking-wider">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2">
              {[
                "Próximo Jogo",
                "História",
                "Elenco",
                "Fan Zone",
                "Loja",
                "Patrocínio",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-2xl text-foreground mb-4 tracking-wider">
              CONTATO
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-foreground/70">
                <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>contato@goldenphoenix.com.br</span>
              </li>
              <li className="flex items-start gap-3 text-foreground/70">
                <Phone
                  size={20}
                  className="text-primary mt-1 flex-shrink-0"
                />
                <span>(43) 9999-9999</span>
              </li>
              <li className="flex items-start gap-3 text-foreground/70">
                <MapPin
                  size={20}
                  className="text-primary mt-1 flex-shrink-0"
                />
                <span>Arapongas, PR - Brasil</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ring/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/50 text-sm">
            <p>© 2026 Golden Phoenix. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
