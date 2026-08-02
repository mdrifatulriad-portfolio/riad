import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  scrollProgress: number;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'software', label: 'Software' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar({ darkMode, toggleDarkMode, scrollProgress }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scrolling to add background blur & active sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section Spy logic
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120; // offset for sticky nav

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Header Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-900/30">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-75"
          style={{
            width: `${scrollProgress}%`
          }}
          id="scroll-bar-indicator"
        />
      </div>

      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-white/80 dark:bg-gray-950/80 border-b border-slate-200/50 dark:border-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Mark */}
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 font-black text-xl tracking-tight text-slate-900 dark:text-white focus:outline-none hover:opacity-100 transition-all duration-300 relative"
            aria-label="Back to top"
            initial={{ opacity: 0, y: -15 }}
            animate={{ 
              opacity: 1, 
              y: [0, -3, 0],
            }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
            }}
            whileHover={{ scale: 1.02 }}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.2))'
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-[0_0_18px_rgba(59,130,246,0.35)] dark:shadow-[0_0_18px_rgba(59,130,246,0.5)] border border-blue-400/20 backdrop-blur-md shrink-0">
              <span className="text-white font-black text-base tracking-wider font-mono">MR</span>
            </div>
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent font-black tracking-tight text-base sm:text-lg hidden min-[380px]:inline-block">
              MOHAMMAD RIFAT
            </span>
          </motion.button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-gray-950/60 p-1 rounded-full border border-slate-200/50 dark:border-white/5 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-xs font-bold tracking-wider transition-colors uppercase duration-300 rounded-full ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicatorLine"
                      className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)] dark:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Utilities (Theme toggle & Mobile Menu) */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-gray-900/50 border border-slate-200/80 dark:border-gray-800/20 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Toggle visual theme"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-gray-900/50 border border-slate-200/80 dark:border-gray-800/20 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-lg flex flex-col justify-center px-8 lg:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Background glowing particles for mobile drawer */}
            <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[80px]" />

            <div className="flex flex-col gap-6 text-left relative z-10">
              <span className="text-xs tracking-widest text-blue-500 dark:text-blue-400 uppercase font-bold">Navigation</span>
              <div className="h-[2px] w-12 bg-blue-500 rounded-full" />
              
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="text-left text-2xl font-bold transition-colors uppercase focus:outline-none flex items-center gap-3"
                    >
                      <span className={`text-xs font-mono ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-slate-300 dark:text-gray-600'}`}>
                        {isActive ? '//' : '•'}
                      </span>
                      <span className={isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'}>
                        {link.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
