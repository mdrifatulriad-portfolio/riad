import { Facebook, Instagram, Heart, ExternalLink, Youtube } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'software', label: 'Software' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
];

interface FooterProps {
  darkMode?: boolean;
  onTrigger404: () => void;
}

export default function Footer({ darkMode = true, onTrigger404 }: FooterProps) {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <footer className="relative bg-slate-50 dark:bg-gray-950/80 border-t border-slate-200 dark:border-gray-900 pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto rounded-none select-none">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-gray-900 text-left items-start">
        {/* Left Column: Brand summary */}
        <div className="col-span-1 md:col-span-5 flex flex-col items-start">
          <div className="flex items-center gap-2.5 font-black text-lg tracking-tight text-slate-900 dark:text-white mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md border border-blue-400/20">
              <span className="text-white font-black text-xs font-mono">MR</span>
            </div>
            <span className="font-bold tracking-wide">MOHAMMAD RIFAT</span>
          </div>
          <p className="text-[10px] font-mono tracking-wide mb-3 font-bold text-blue-600 dark:text-blue-400 uppercase">
            Graphic Designer • Video Editor • Meta Marketer • Generative AI Tools
          </p>
          <p className="text-xs text-slate-500 dark:text-gray-500 leading-relaxed max-w-sm">
            Forging advanced user interfaces and dynamic creative motion systems with pixel-perfect visual guidelines. Connecting elegant design and robust development.
          </p>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="col-span-1 md:col-span-4 flex flex-col items-start">
          <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest mb-4">Quick Links</h4>
          <div className="grid grid-cols-3 gap-y-2 gap-x-4 w-full">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-xs text-slate-500 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Social Connection Links */}
        <div className="col-span-1 md:col-span-3 flex flex-col items-start md:items-end">
          <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-gray-400 uppercase tracking-widest mb-4">Social Hub</h4>
          <div className="flex gap-3">
            <a
              href={PERSONAL_INFO.socials.behance}
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800/60 hover:border-blue-500/30 rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Behance profile link"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.facebook}
              target="_blank"
              rel="noreferrer"
              title="Follow me on Facebook"
              className="h-9 w-9 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800/60 hover:border-blue-500/45 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_12px_rgba(59,130,246,0.35)] rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300"
              aria-label="Facebook profile link"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="h-9 w-9 bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800/60 hover:border-blue-500/30 rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Instagram profile link"
            >
              <Instagram className="h-4 w-4" />
            </a>

            {/* YouTube Shorts Channel with Red Glow, Tooltip and Glassmorphism style */}
            <div className="relative group/yt">
              <a
                href="https://www.youtube.com/@MdrifatulIslam3426/shorts"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 bg-slate-100 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800/60 hover:border-red-500/50 hover:shadow-[0_0_12px_rgba(239,68,68,0.2)] dark:hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] rounded-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-red-500 transition-all duration-300"
                aria-label="YouTube channel link"
              >
                <Youtube className="h-4 w-4" />
              </a>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-gray-950 text-white text-[10px] font-bold py-1 px-2 rounded border border-slate-800 dark:border-gray-800/80 whitespace-nowrap opacity-0 group-hover/yt:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                Watch My YouTube Portfolio
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Copyright, heart, licensing */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">
            © 2026 MOHAMMAD RIFAT. Designed & Developed by MOHAMMAD RIFAT
          </p>
          <button 
            onClick={onTrigger404}
            className="text-[11px] text-slate-400 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 font-mono transition-colors duration-200 cursor-pointer"
          >
            [Trigger 404]
          </button>
        </div>
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
          Made with <Heart className="h-3 w-3 text-blue-500 fill-blue-500" /> & premium performance.
        </p>
      </div>

    </footer>
  );
}
