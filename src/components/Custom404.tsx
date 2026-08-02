import { motion } from 'motion/react';
import { Home, Compass, AlertTriangle } from 'lucide-react';

interface Custom404Props {
  onDismiss: () => void;
}

export default function Custom404({ onDismiss }: Custom404Props) {
  return (
    <motion.div
      id="custom-404-view"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120] text-white select-none px-6"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Background radial soft blue flare */}
      <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[110px]" />
      
      {/* Dynamic Digital Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-md text-center">
        {/* Animated warning triangle */}
        <motion.div
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/35 text-blue-400 shadow-lg shadow-blue-500/10"
        >
          <Compass className="h-8 w-8 animate-spin duration-10000" />
        </motion.div>

        {/* Big 404 Headline */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-white mb-4">
          4
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">0</span>
          4
        </h1>

        {/* Error Details */}
        <h2 className="text-xl font-bold text-gray-200 mb-4">Lost in the Creative Grid</h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-10">
          The node or canvas you are trying to fetch doesn't exist in our production registry. It might have been compiled away or moved.
        </p>

        {/* Actions row */}
        <div className="flex gap-4">
          <button
            onClick={onDismiss}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider uppercase px-6 py-4 rounded-xl transition-all duration-300 shadow-md cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Return to Portfolio
          </button>
        </div>
      </div>
    </motion.div>
  );
}
