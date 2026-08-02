import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import LoadingScreen from './components/LoadingScreen';
import Custom404 from './components/Custom404';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [show404, setShow404] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor total scroll position to update navbar progress indicators
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync Tailwind dark class with state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      {/* 1. App loading screen overlay */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div 
          className={`min-h-screen font-sans antialiased selection:bg-blue-500 selection:text-white transition-colors duration-500 ${
            darkMode 
              ? 'bg-[#0B1120] text-gray-100' 
              : 'bg-[#F8FAFC] text-slate-900'
          }`}
        >
          {/* 2. Interactive Cursor Glow and Follower */}
          <CursorGlow />

          {/* 3. Navigation Header Bar */}
          <Navbar 
            darkMode={darkMode} 
            toggleDarkMode={() => setDarkMode(!darkMode)} 
            scrollProgress={scrollProgress}
          />

          {/* 4. Single-page creative layouts */}
          <main className="relative">
            {/* Soft geometric grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Contact />
          </main>

          {/* 5. Minimalist detailed footer */}
          <Footer onTrigger404={() => setShow404(true)} />

          {/* Floating Back to Top Button (requested) */}
          <AnimatePresence>
            {scrollProgress > 12 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 15 }}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-24 right-6 z-40 h-14 w-14 rounded-full bg-gray-950/80 backdrop-blur-md border border-white/10 hover:border-blue-500/30 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all cursor-pointer group"
                title="Scroll to Top"
                id="floating-back-to-top"
              >
                <svg 
                  className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating WhatsApp Button */}
          <motion.a
            href="https://wa.me/8801700814379"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.6)] hover:scale-110 transition-all cursor-pointer border border-emerald-400/30"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            title="Chat on WhatsApp"
            id="floating-whatsapp-btn"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" />
            <svg 
              className="h-7 w-7 fill-current text-white" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.018-5.09-2.868-6.942-1.85-1.851-4.311-2.871-6.931-2.872-5.438 0-9.863 4.414-9.866 9.83-.001 1.745.457 3.447 1.326 4.952l-.966 3.528 3.612-.917zm11.391-7.447c-.3-.149-1.772-.874-2.047-.973-.274-.1-.474-.149-.674.15-.2.299-.774.973-.949 1.172-.175.199-.349.224-.649.075-.3-.149-1.264-.466-2.41-1.484-.892-.793-1.493-1.773-1.668-2.072-.175-.299-.019-.461.13-.61.135-.134.3-.349.449-.523.15-.174.2-.299.3-.498.1-.2.05-.374-.025-.523-.075-.149-.674-1.62-.923-2.219-.242-.583-.489-.505-.674-.515-.174-.009-.374-.011-.574-.011s-.524.075-.798.374c-.274.299-1.048 1.024-1.048 2.5s1.073 2.901 1.222 3.1c.15.199 2.112 3.224 5.116 4.524.714.31 1.272.495 1.706.634.718.228 1.371.196 1.888.118.576-.087 1.772-.724 2.022-1.424.25-.699.25-1.299.175-1.424-.075-.125-.275-.199-.575-.349z"/>
            </svg>
          </motion.a>

          {/* 6. Custom 404 router trigger overlay */}
          <AnimatePresence>
            {show404 && (
              <Custom404 onDismiss={() => setShow404(false)} />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
