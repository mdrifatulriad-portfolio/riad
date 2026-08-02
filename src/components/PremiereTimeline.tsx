import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Lock, Unlock, Eye, EyeOff, Volume2, VolumeX, 
  ZoomIn, ZoomOut, RotateCcw, Sliders, Music, Film, Sparkles 
} from 'lucide-react';

interface Clip {
  id: string;
  name: string;
  start: number; // percentage
  duration: number; // percentage
  color: string;
  type: 'video' | 'audio' | 'effect';
  keyframes?: number[]; // positions
}

interface PremiereTimelineProps {
  darkMode?: boolean;
}

export default function PremiereTimeline({ darkMode = true }: PremiereTimelineProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1); // 1 to 2 zoom scale
  const [playheadPos, setPlayheadPos] = useState(25); // percentage
  const [activeClipId, setActiveClipId] = useState<string | null>('v1-1');
  const [isLocked, setIsLocked] = useState<Record<string, boolean>>({ V2: false, V1: false, A1: false, A2: false });
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({ V2: true, V1: true, A1: true, A2: true });

  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Playhead continuous movement animation loop
  useEffect(() => {
    const animate = (time: number) => {
      if (isPlaying) {
        if (previousTimeRef.current !== null) {
          const deltaTime = time - previousTimeRef.current;
          setPlayheadPos((prev) => {
            const next = prev + (deltaTime * 0.005 * zoom);
            return next > 95 ? 5 : next; // loops playhead
          });
        }
        previousTimeRef.current = time;
      } else {
        previousTimeRef.current = null;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, zoom]);

  // Handle timeline click to position playhead
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    if (percentage >= 0 && percentage <= 100) {
      setPlayheadPos(percentage);
    }
  };

  // Clips state
  const videoTrack2: Clip[] = [
    { id: 'v2-1', name: 'Color Grade LUT', start: 10, duration: 35, color: 'from-amber-500/20 to-orange-500/30 border-orange-500/60 text-orange-400', type: 'effect', keyframes: [20, 50, 80] },
    { id: 'v2-2', name: 'Text Title Overlay', start: 50, duration: 25, color: 'from-pink-500/20 to-rose-500/30 border-rose-500/60 text-rose-400', type: 'effect', keyframes: [10, 90] },
  ];

  const videoTrack1: Clip[] = [
    { id: 'v1-1', name: 'Cinematic B-Roll 01.mp4', start: 5, duration: 25, color: 'from-blue-600/30 to-blue-500/20 border-blue-500/50 text-blue-300', type: 'video' },
    { id: 'v1-2', name: 'Drone Landscape Clip.mov', start: 32, duration: 30, color: 'from-sky-600/30 to-cyan-500/20 border-sky-400/50 text-sky-300', type: 'video', keyframes: [30, 70] },
    { id: 'v1-3', name: 'Glow Transition.mp4', start: 64, duration: 28, color: 'from-indigo-600/30 to-purple-500/20 border-indigo-500/50 text-indigo-300', type: 'video' },
  ];

  const audioTrack1: Clip[] = [
    { id: 'a1-1', name: 'Ambient Beat Master.wav', start: 5, duration: 55, color: 'from-emerald-600/25 to-teal-500/15 border-emerald-500/40 text-emerald-300', type: 'audio' },
    { id: 'a1-2', name: 'SFX Rise Swoosh.mp3', start: 62, duration: 30, color: 'from-teal-600/25 to-cyan-500/15 border-teal-400/40 text-teal-300', type: 'audio' },
  ];

  const audioTrack2: Clip[] = [
    { id: 'a2-1', name: 'Voiceover Recording.wav', start: 12, duration: 40, color: 'from-violet-600/25 to-purple-500/15 border-violet-500/40 text-violet-300', type: 'audio' },
    { id: 'a2-2', name: 'Sub-Bass Drop.wav', start: 55, duration: 38, color: 'from-purple-600/25 to-fuchsia-500/15 border-purple-400/40 text-purple-300', type: 'audio' },
  ];

  const toggleLock = (track: string) => {
    setIsLocked(prev => ({ ...prev, [track]: !prev[track] }));
  };

  const toggleVisible = (track: string) => {
    setIsVisible(prev => ({ ...prev, [track]: !prev[track] }));
  };

  // Waveform generator for visual depth
  const renderWaveform = (seed: number, count = 36) => {
    const bars = [];
    for (let i = 0; i < count; i++) {
      const height = 15 + Math.abs(Math.sin(i * 0.4 + seed)) * 30;
      // Modulate slightly dynamically if playing
      const pulseHeight = isPlaying ? height * (0.85 + Math.sin(Date.now() * 0.005 + i) * 0.15) : height;
      bars.push(
        <div 
          key={i} 
          className="w-[3px] rounded-full bg-current opacity-60 hover:opacity-100 transition-all duration-150" 
          style={{ height: `${pulseHeight}%` }}
        />
      );
    }
    return <div className="flex items-center justify-around h-full w-full px-4">{bars}</div>;
  };

  // Helper to format playhead percentage to standard video timecode (24fps)
  const formatTimecode = (pct: number) => {
    const totalFrames = Math.floor((pct / 100) * 240);
    const mins = Math.floor(totalFrames / 1440);
    const secs = Math.floor((totalFrames % 1440) / 24);
    const frames = totalFrames % 24;
    return `00:0${mins}:${secs < 10 ? '0' : ''}${secs}:${frames < 10 ? '0' : ''}${frames}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full bg-white dark:bg-[#0D1527]/90 border border-slate-200 dark:border-blue-500/20 rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.05)] dark:shadow-[0_20px_50px_rgba(37,99,235,0.15)] overflow-hidden backdrop-blur-xl max-w-5xl mx-auto"
      id="premiere-pro-timeline"
    >
      {/* 1. Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-3.5 border-b border-slate-200 dark:border-gray-800/60 bg-slate-50 dark:bg-gray-950/40 gap-3">
        <div className="flex items-center justify-between md:justify-start gap-3 w-full md:w-auto">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-gray-800 shrink-0" />
          <span className="text-[10px] xs:text-xs font-mono font-bold text-slate-500 dark:text-gray-400 tracking-wider flex items-center gap-1.5 truncate max-w-[160px] xs:max-w-[200px] sm:max-w-none">
            <Film className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
            <span className="truncate">EXPORT_RENDER_RIFAT.prproj</span>
          </span>
        </div>

        {/* Playhead Timecode and Actions row */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          {/* Playhead Timecode display */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-gray-950/80 border border-slate-200 dark:border-gray-800/60 px-3 py-1 rounded-lg shrink-0">
            <span className="text-xs sm:text-sm font-mono font-bold text-red-500 tracking-wider">
              {formatTimecode(playheadPos)}
            </span>
            <div className="text-[9px] font-mono text-slate-400 dark:text-gray-500 font-bold uppercase tracking-widest hidden sm:inline">
              23.976 fps
            </div>
          </div>

          {/* Toolbar action buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`h-7.5 w-7.5 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center transition-colors border cursor-pointer ${
                isPlaying 
                  ? 'bg-red-500/10 border-red-500/40 text-red-500 dark:text-red-400 hover:bg-red-500/20' 
                  : 'bg-blue-500/10 border-blue-500/40 text-blue-500 dark:text-blue-400 hover:bg-blue-500/20'
              }`}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
            </button>
            
            <button 
              onClick={() => setPlayheadPos(10)}
              className="h-7.5 w-7.5 sm:h-8 sm:w-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:text-white flex items-center justify-center cursor-pointer"
              title="Reset Playhead"
            >
              <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-gray-800 hidden xs:inline" />

            {/* Zoom Control - Hidden on mobile, shown on tablet & desktop */}
            <div className="hidden xs:flex items-center gap-1.5">
              <button 
                onClick={() => setZoom(prev => Math.max(1, prev - 0.2))}
                className="p-1 text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-gray-500 w-7 text-center select-none">
                {Math.round(zoom * 100)}%
              </span>
              <button 
                onClick={() => setZoom(prev => Math.min(2, prev + 0.2))}
                className="p-1 text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Rulers / Time Marks */}
      <div 
        className="h-8 bg-slate-100/85 dark:bg-gray-950/60 border-b border-slate-200 dark:border-gray-800/40 relative select-none cursor-ew-resize overflow-hidden"
        onClick={handleTimelineClick}
      >
        {/* Subtle background grid ticks */}
        <div className="absolute inset-0 flex justify-between px-4 pointer-events-none">
          {Array.from({ length: 11 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center justify-between h-full pt-1.5">
              <span className="text-[9px] font-mono text-slate-400 dark:text-gray-600 font-semibold">
                00:00:0{idx}:00
              </span>
              <div className="h-2 w-[1px] bg-slate-200 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tracks Panel Container */}
      <div className="relative min-h-[220px] max-h-[320px] overflow-y-auto bg-slate-50/50 dark:bg-gray-950/20 flex flex-col">
        
        {/* Background ticks extending vertically */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between pointer-events-none opacity-5 dark:opacity-5">
          {Array.from({ length: 11 }).map((_, idx) => (
            <div key={idx} className="w-[1px] h-full bg-slate-400 dark:bg-white border-dashed border-gray-100" />
          ))}
        </div>

        {/* Render Track Row Helper */}
        {renderTrackRow({
          id: 'V2',
          icon: <Sparkles className="h-3.5 w-3.5 text-orange-400" />,
          clips: videoTrack2,
          isLocked: isLocked.V2,
          isVisible: isVisible.V2,
          onToggleLock: () => toggleLock('V2'),
          onToggleVisible: () => toggleVisible('V2'),
          zoom,
          playheadPos,
          activeClipId,
          setActiveClipId,
          handleTimelineClick,
          renderWaveform: null,
          darkMode
        })}

        {renderTrackRow({
          id: 'V1',
          icon: <Film className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />,
          clips: videoTrack1,
          isLocked: isLocked.V1,
          isVisible: isVisible.V1,
          onToggleLock: () => toggleLock('V1'),
          onToggleVisible: () => toggleVisible('V1'),
          zoom,
          playheadPos,
          activeClipId,
          setActiveClipId,
          handleTimelineClick,
          renderWaveform: null,
          darkMode
        })}

        {/* Divider */}
        <div className="h-1.5 bg-slate-200 dark:bg-gray-950/90 border-y border-slate-300 dark:border-gray-900/60" />

        {renderTrackRow({
          id: 'A1',
          icon: <Volume2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />,
          clips: audioTrack1,
          isLocked: isLocked.A1,
          isVisible: isVisible.A1,
          onToggleLock: () => toggleLock('A1'),
          onToggleVisible: () => toggleVisible('A1'),
          zoom,
          playheadPos,
          activeClipId,
          setActiveClipId,
          handleTimelineClick,
          renderWaveform: (seed) => renderWaveform(seed, 40),
          darkMode
        })}

        {renderTrackRow({
          id: 'A2',
          icon: <Music className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />,
          clips: audioTrack2,
          isLocked: isLocked.A2,
          isVisible: isVisible.A2,
          onToggleLock: () => toggleLock('A2'),
          onToggleVisible: () => toggleVisible('A2'),
          zoom,
          playheadPos,
          activeClipId,
          setActiveClipId,
          handleTimelineClick,
          renderWaveform: (seed) => renderWaveform(seed, 30),
          darkMode
        })}

        {/* 4. Playhead Vertical Overlay Line */}
        <div 
          className="absolute inset-y-0 pointer-events-none z-30 transition-all duration-75"
          style={{ left: `${playheadPos}%` }}
        >
          {/* Main Red Playhead Line */}
          <div className="w-[1.5px] h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] relative">
            {/* Playhead Top Handle Tag */}
            <div className="absolute -top-1.5 -left-1.5 w-4.5 h-4.5 bg-red-500 border border-red-400 rounded-sm rotate-45 flex items-center justify-center shadow-lg">
              <div className="w-1.5 h-1.5 bg-white rounded-full rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Footer Preview Status */}
      <div className="px-5 py-3 border-t border-slate-200 dark:border-gray-800/40 bg-slate-50 dark:bg-gray-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            GPU acceleration: Enabled
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Active Layer: <strong className="text-slate-700 dark:text-gray-300 font-mono">{activeClipId || 'None'}</strong></span>
        </div>
        <div className="text-slate-600 dark:text-gray-400 font-medium">
          💡 <span className="text-slate-400 dark:text-gray-500">Pro Tip:</span> Click anywhere on the timeline to scrub or pause/play to see real waveforms!
        </div>
      </div>
    </motion.div>
  );
}

// Sub-component Helper: Track Row
interface TrackRowProps {
  id: string;
  icon: React.ReactNode;
  clips: Clip[];
  isLocked: boolean;
  isVisible: boolean;
  onToggleLock: () => void;
  onToggleVisible: () => void;
  zoom: number;
  playheadPos: number;
  activeClipId: string | null;
  setActiveClipId: (id: string | null) => void;
  handleTimelineClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  renderWaveform: ((seed: number) => React.ReactNode) | null;
  darkMode?: boolean;
}

function renderTrackRow({
  id, icon, clips, isLocked, isVisible, onToggleLock, onToggleVisible, zoom, playheadPos, activeClipId, setActiveClipId, handleTimelineClick, renderWaveform, darkMode = true
}: TrackRowProps) {
  return (
    <div className="flex h-12 border-b border-slate-200 dark:border-gray-800/30 items-stretch select-none relative group/row">
      {/* Sidebar - Controls */}
      <div className="w-24 sm:w-32 bg-slate-50/95 dark:bg-gray-950/70 border-r border-slate-200 dark:border-gray-800/50 px-2 sm:px-3 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-gray-400 z-10 shrink-0">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="font-bold tracking-wider text-slate-700 dark:text-gray-200">{id}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleVisible}
            className={`p-1 rounded hover:bg-slate-250 dark:hover:bg-gray-800 transition-colors ${!isVisible ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-gray-600'}`}
            title={isVisible ? 'Hide track' : 'Show track'}
          >
            {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          </button>
          <button 
            onClick={onToggleLock}
            className={`p-1 rounded hover:bg-slate-250 dark:hover:bg-gray-800 transition-colors ${isLocked ? 'text-amber-500' : 'text-slate-400 dark:text-gray-600'}`}
            title={isLocked ? 'Unlock track' : 'Lock track'}
          >
            {isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Main Track - Scrollable/Interactive clips */}
      <div 
        className={`flex-1 relative overflow-hidden flex items-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-15 pointer-events-none'
        } ${isLocked ? 'bg-amber-950/5' : ''}`}
        onClick={handleTimelineClick}
      >
        {/* Render Track Clips */}
        <div className="absolute inset-0 flex items-center" style={{ transform: `scaleX(${zoom})`, transformOrigin: 'left center' }}>
          {clips.map((clip, index) => {
            const isActive = activeClipId === clip.id;
            const isCurrentlyIntersecting = 
              playheadPos >= clip.start && 
              playheadPos <= (clip.start + clip.duration);

            return (
              <motion.div
                key={clip.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLocked) setActiveClipId(clip.id);
                }}
                className={`absolute h-8 rounded-md border flex flex-col justify-center px-3 cursor-pointer select-none transition-all duration-200 bg-gradient-to-r shadow-lg ${clip.color} ${
                  isActive ? 'ring-2 ring-blue-500 scale-98 border-white/50 shadow-[0_0_15px_rgba(59,130,246,0.35)]' : ''
                } ${isCurrentlyIntersecting && !isLocked ? 'brightness-125' : ''}`}
                style={{
                  left: `${clip.start}%`,
                  width: `${clip.duration}%`,
                }}
                whileHover={!isLocked ? { scale: 0.99, y: -0.5 } : {}}
                layout
              >
                {/* Title line */}
                <div className="flex items-center justify-between gap-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-[10px] font-bold tracking-wide pointer-events-none">
                    {clip.name}
                  </span>
                  
                  {/* Active frame indicator blinker */}
                  {isCurrentlyIntersecting && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping shrink-0" />
                  )}
                </div>

                {/* Keyframe diamonds overlay */}
                {clip.keyframes && (
                  <div className="absolute inset-x-0 bottom-1.5 flex justify-around px-2 pointer-events-none">
                    {clip.keyframes.map((kf, kIdx) => (
                      <div 
                        key={kIdx} 
                        className="w-1.5 h-1.5 bg-white border border-gray-900 rotate-45 opacity-70"
                        style={{ left: `${kf}%` }}
                      />
                    ))}
                  </div>
                )}

                {/* Waveform graphic overlay for audio clips */}
                {renderWaveform && (
                  <div className="absolute inset-0 top-3 pointer-events-none">
                    {renderWaveform(index * 12 + 5)}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
