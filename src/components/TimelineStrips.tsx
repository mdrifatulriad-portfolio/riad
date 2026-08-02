import React from 'react';
import { Film, Volume2, Award, Scissors, Play, Code, Layers, Sparkles } from 'lucide-react';

export default function TimelineStrips() {
  // Define simulated clip items for high-fidelity timeline strips
  const clipsStrip1 = [
    { type: 'video', label: 'RIFAT_INTRO_4K.mp4', color: 'bg-teal-500/20 border-teal-500/40 text-teal-300', width: 'w-48', icon: Film },
    { type: 'adjustment', label: 'LUT_Teal_Orange.cube', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300', width: 'w-40', icon: Layers },
    { type: 'audio', label: 'Cinematic_Impact_SFX.wav', color: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300', width: 'w-36', icon: Volume2, waveform: true },
    { type: 'video', label: 'VFX_Smoke_Overlay.mov', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300', width: 'w-56', icon: Sparkles },
    { type: 'adjustment', label: 'Glitch_Transition_FX', color: 'bg-pink-500/20 border-pink-500/40 text-pink-300', width: 'w-32', icon: Scissors },
    { type: 'video', label: 'PORTFOLIO_SHOWCASE.mp4', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300', width: 'w-64', icon: Award },
  ];

  const clipsStrip2 = [
    { type: 'video', label: 'B_ROLL_BRIGHTON.mp4', color: 'bg-sky-500/20 border-sky-500/40 text-sky-300', width: 'w-60', icon: Film },
    { type: 'adjustment', label: 'Vignette_Soft_Ambient', color: 'bg-violet-500/20 border-violet-500/40 text-violet-300', width: 'w-36', icon: Layers },
    { type: 'audio', label: 'Background_Beat_120BPM.mp3', color: 'bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-300', width: 'w-52', icon: Volume2, waveform: true },
    { type: 'video', label: '3D_Typography_Reveal.mov', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300', width: 'w-44', icon: Code },
    { type: 'video', label: 'COLOR_GRADE_RIFAT.mov', color: 'bg-teal-500/20 border-teal-500/40 text-teal-300', width: 'w-48', icon: Film },
  ];

  const renderTimelineClip = (clip: typeof clipsStrip1[number], index: string | number) => {
    const Icon = clip.icon;
    return (
      <div
        key={index}
        className={`flex-shrink-0 h-10 ${clip.width} ${clip.color} border rounded-lg px-2.5 flex items-center justify-between gap-2.5 relative overflow-hidden backdrop-blur-sm shadow-md group select-none`}
      >
        {/* Subtle left-side color highlight */}
        <div className="absolute inset-y-0 left-0 w-1 bg-current opacity-80 rounded-l-lg" />
        
        <div className="flex items-center gap-2 min-w-0 z-10">
          <Icon className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
          <span className="text-[10px] font-mono font-bold truncate tracking-wide">{clip.label}</span>
        </div>

        {/* Action icons or Waveforms inside */}
        {clip.waveform ? (
          <div className="flex items-end gap-0.5 h-6 opacity-30 z-10 w-14 justify-end">
            {[20, 50, 80, 40, 60, 30, 70, 90, 45, 15, 60, 30].map((h, i) => (
              <div key={i} className="w-[1.5px] bg-current rounded-full" style={{ height: `${h}%` }} />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1 z-10 flex-shrink-0">
            {/* Keyframe simulation dots/diamonds */}
            <div className="w-1.5 h-1.5 bg-white/70 rotate-45 border border-black/30 rounded-[1px]" />
            <div className="w-1 h-1 bg-white/40 rotate-45 border border-black/30 rounded-[1px]" />
            <div className="w-1.5 h-1.5 bg-white/70 rotate-45 border border-black/30 rounded-[1px]" />
          </div>
        )}

        {/* Hover background gloss */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 
        =========================================
        TIMELINE 01: Upper-Middle Left → Right
        =========================================
      */}
      <div 
        className="absolute top-[28%] md:top-[30%] left-0 right-0 h-16 flex items-center select-none overflow-hidden animate-timeline-float-1"
        style={{
          opacity: 0.40,
          filter: 'blur(1px) drop-shadow(0 0 8px rgba(99,102,241,0.1))',
          // CSS variable for custom marquee duration
          ['--marquee-duration' as any]: '20s',
        }}
      >
        {/* Subtle Track Control Panel Left Side */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gray-950/95 border-r border-gray-800/80 z-20 flex flex-col justify-center px-3 gap-1 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black text-teal-400">V2 (Overlay)</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded bg-gray-800 border border-gray-700 block" />
              <span className="w-2 h-2 rounded-full bg-blue-500/80 block" />
            </div>
          </div>
          <div className="h-[1px] bg-gray-900/60 w-full" />
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono font-bold text-gray-500">Mute / Solo</span>
            <span className="text-[8px] font-mono text-gray-600">60 FPS</span>
          </div>
        </div>

        {/* Marquee Wrapper: Double contents for seamless looping */}
        <div className="flex gap-4 animate-marquee-ltr pl-28">
          {/* Loop x3 to guarantee perfect wrap on any desktop width */}
          {[...Array(3)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex gap-4 flex-shrink-0">
              {clipsStrip1.map((clip, clipIdx) => renderTimelineClip(clip, `s1-${loopIdx}-${clipIdx}`))}
            </div>
          ))}
        </div>
      </div>

      {/* 
        =========================================
        TIMELINE 02: Bottom Right → Left
        =========================================
      */}
      <div 
        className="absolute bottom-[10%] md:bottom-[12%] left-0 right-0 h-16 flex items-center select-none overflow-hidden animate-timeline-float-2"
        style={{
          opacity: 0.30,
          filter: 'blur(1.5px) drop-shadow(0 0 10px rgba(249,115,22,0.12))',
          // CSS variable for custom marquee duration
          ['--marquee-duration' as any]: '24s',
        }}
      >
        {/* Subtle Track Control Panel Right Side */}
        <div className="absolute right-0 inset-y-0 w-24 bg-gray-950/95 border-l border-gray-800/80 z-20 flex flex-col justify-center px-3 gap-1 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black text-indigo-400">A1 (Audio)</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded bg-gray-800 border border-gray-700 block" />
              <span className="w-2 h-2 rounded-full bg-indigo-500/80 block" />
            </div>
          </div>
          <div className="h-[1px] bg-gray-900/60 w-full" />
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono font-bold text-gray-500">Auto Sync</span>
            <span className="text-[8px] font-mono text-green-500">Online</span>
          </div>
        </div>

        {/* Marquee Wrapper: Double contents for seamless looping */}
        <div className="flex gap-4 animate-marquee-rtl pr-28">
          {/* Loop x3 to guarantee perfect wrap on any desktop width */}
          {[...Array(3)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex gap-4 flex-shrink-0">
              {clipsStrip2.map((clip, clipIdx) => renderTimelineClip(clip, `s2-${loopIdx}-${clipIdx}`))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
