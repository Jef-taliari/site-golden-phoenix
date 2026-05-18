import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, SunIcon, MoonIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoSrc from '@/assets/images/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Forçar a página a começar no topo em qualquer recarregamento
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Dark é o padrão (:root). Light mode adiciona a classe .light no <html>
    document.documentElement.classList.toggle('light', !newMode);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-2000 ${
          isScrolled
            ? 'bg-background/20 backdrop-blur-xl border-b border-primary/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-8xl mx-auto px-10 py-2 flex items-center justify-between">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="text-primary font-heading text-2xl font-semibold tracking-wider">
              GOLDEN <br /> PHOENIX
            </div>
          </div>

          {/* Center - Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Limpa o link com #hash da URL (se existir)
                window.history.pushState('', document.title, window.location.pathname + window.location.search);
              }}
              className="w-24 h-24 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              aria-label="Voltar ao topo"
            >
              <div className="text-3xl">
                <img src={logoSrc} alt="Logo Golden Phoenix" />
              </div>
            </button>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-6">
            <a
              href="#store"
              className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ShoppingBag size={20} />
              <span className="font-medium">Store</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Alternar tema"
              title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            >
              {isDarkMode ? <SunIcon size={24} /> : <MoonIcon size={24} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center space-y-6"
            >
              {['Próximo Jogo', 'História', 'Elenco', 'Fan Zone', 'Loja', 'Patrocínio', 'Sócio Torcedor'].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-heading text-6xl md:text-4xl font-bold text-foreground hover:text-primary transition-colors tracking-wider"
                  >
                    {item}
                  </motion.a>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
