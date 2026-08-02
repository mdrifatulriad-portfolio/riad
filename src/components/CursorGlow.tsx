import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CursorGlowProps {
  darkMode?: boolean;
}

export default function CursorGlow({ darkMode = true }: CursorGlowProps) {
  const [mounted, setMounted] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'play' | 'click' | 'link'>('default');

  // Position coordinates using motion values for ultra-smooth rendering
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for a soft lagging/fluid effect
  const springConfig = { damping: 30, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    // Check if device supports hover (mouse)
    const mediaQuery = window.matchMedia('(hover: hover)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use exact coordinates; centering is handled by translate classes
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      const isPlay = !!target.closest('[data-cursor="play"]');
      const isLink = !!target.closest('a, [data-cursor="link"]');
      const isClick = !!target.closest('button, [role="button"], [data-cursor="click"]');

      if (isPlay) {
        setCursorType('play');
      } else if (isClick) {
        setCursorType('click');
      } else if (isLink) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Background ambient radial glow following mouse */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px] transition-opacity duration-300 md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Tiny precise interactive dot */}
      <motion.div
        className={`pointer-events-none fixed top-0 left-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/35 bg-blue-500/5 md:flex items-center justify-center text-center select-none overflow-hidden ${
          darkMode ? 'mix-blend-screen' : ''
        }`}
        animate={{
          width: cursorType === 'play' ? 64 : cursorType === 'click' ? 52 : cursorType === 'link' ? 40 : 18,
          height: cursorType === 'play' ? 64 : cursorType === 'click' ? 52 : cursorType === 'link' ? 40 : 18,
          backgroundColor: cursorType === 'play' ? 'rgba(59, 130, 246, 0.18)' : cursorType === 'click' ? 'rgba(99, 102, 241, 0.15)' : cursorType === 'link' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.03)',
          borderColor: cursorType === 'play' ? 'rgba(59, 130, 246, 0.5)' : cursorType === 'click' ? 'rgba(129, 140, 248, 0.45)' : cursorType === 'link' ? 'rgba(59, 130, 246, 0.45)' : 'rgba(59, 130, 246, 0.25)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {cursorType === 'play' && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-[8px] font-mono font-black tracking-widest uppercase select-none pointer-events-none ${
              darkMode ? 'text-white' : 'text-blue-600'
            }`}
          >
            PLAY
          </motion.span>
        )}
        {cursorType === 'click' && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-[8px] font-mono font-black tracking-widest uppercase select-none pointer-events-none ${
              darkMode ? 'text-indigo-200' : 'text-indigo-600'
            }`}
          >
            CLICK
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
