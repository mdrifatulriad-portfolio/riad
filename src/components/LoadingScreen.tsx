import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Elegant incremental progress ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 500); // Hold briefly at 100% for readability
          setTimeout(onComplete, 1100); // Complete animation sequence
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 4; // realistic steps
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120] text-white select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Subtle glowing mesh in background */}
          <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="relative flex flex-col items-center">
            {/* Logo Mark */}
            <motion.div
              className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="text-2xl font-black tracking-tighter">AR</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-sm font-black tracking-[0.25em] text-white uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              MOHAMMAD RIFAT
            </motion.h2>
            <motion.div
              className="mt-2 flex flex-col items-center gap-0.5 text-[10px] sm:text-xs text-blue-400 font-mono tracking-widest uppercase font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>Graphic Designer</span>
              <span>Video Editor</span>
              <span>Meta Marketer</span>
            </motion.div>

            {/* Numerical Progress */}
            <div className="mt-12 overflow-hidden h-[40px] flex items-center justify-center">
              <motion.span 
                className="text-4xl font-extrabold tracking-tight text-blue-400 tabular-nums"
                key={progress}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {progress}%
              </motion.span>
            </div>

            {/* Loading Bar */}
            <div className="mt-4 h-[2px] w-48 rounded-full bg-gray-800 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
