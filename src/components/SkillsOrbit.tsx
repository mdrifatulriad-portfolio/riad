import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Award, 
  Zap, 
  Clock, 
  Sliders, 
  ExternalLink,
  Shield,
  Star
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface SoftwareSkill {
  name: string;
  short: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  level: number;
  experience: string;
  description: string;
  specialties: string[];
}

export default function SkillsOrbit() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SoftwareSkill | null>(null);
  const [globalAngle, setGlobalAngle] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Responsive design helper
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOrbitDimensions = () => {
    if (windowWidth < 360) return { rx: 85, ry: 35 };   // Extra Small Mobile (e.g. 320px)
    if (windowWidth < 480) return { rx: 110, ry: 45 };  // Small Mobile
    if (windowWidth < 640) return { rx: 140, ry: 55 };  // Mobile
    if (windowWidth < 1024) return { rx: 200, ry: 80 }; // Tablet
    return { rx: 320, ry: 120 };                        // Desktop Premium
  };

  const { rx, ry } = getOrbitDimensions();

  // Selected Software Skills Mohammad Rifat actively uses
  const softwareSkills: SoftwareSkill[] = [
    {
      name: "Adobe Photoshop",
      short: "Ps",
      bgColor: "bg-[#001e36]/90",
      borderColor: "border-[#00c8ff]/45",
      glowColor: "rgba(0, 200, 255, 0.45)",
      textColor: "text-[#00c8ff]",
      level: 96,
      experience: "5+ Years",
      description: "Mastery of professional digital compositing, photo manipulation, surgical masking, non-destructive color correction, and high-impact custom YouTube thumbnail design.",
      specialties: ["Compositing & Art", "Color Correction", "Surgical Masking", "Click-Optimized Layouts"]
    },
    {
      name: "Adobe Illustrator",
      short: "Ai",
      bgColor: "bg-[#331c00]/90",
      borderColor: "border-[#ff9a00]/45",
      glowColor: "rgba(255, 154, 0, 0.45)",
      textColor: "text-[#ff9a00]",
      level: 94,
      experience: "4+ Years",
      description: "Crafting scalable vector assets, high-end corporate brand guides, custom typography, clean minimalist logos, print collaterals, and digital illustrational concepts.",
      specialties: ["Vector Illustration", "Minimalist Brandmarks", "Typography Composition", "Asset Guidelines"]
    },
    {
      name: "Adobe Premiere Pro",
      short: "Pr",
      bgColor: "bg-[#240038]/90",
      borderColor: "border-[#e053ff]/45",
      glowColor: "rgba(224, 83, 255, 0.45)",
      textColor: "text-[#e053ff]",
      level: 95,
      experience: "5+ Years",
      description: "Expert level cinematic timeline orchestration, speed ramping, sound dynamic master mixing, multi-camera audio/video synchronization, and color grading using custom LUT systems.",
      specialties: ["Cinematic Storytelling", "Speed Ramps & Curves", "Multi-Cam Sync", "LUT Grading Configurations"]
    },
    {
      name: "Adobe After Effects",
      short: "Ae",
      bgColor: "bg-[#1b0036]/90",
      borderColor: "border-[#bf73ff]/45",
      glowColor: "rgba(191, 115, 255, 0.45)",
      textColor: "text-[#bf73ff]",
      level: 90,
      experience: "4+ Years",
      description: "Designing bespoke 2D and 3D kinetic typography layouts, lower thirds, advanced tracking arrays, custom logo stingers, and high-octane visual transitions.",
      specialties: ["Kinetic Typography", "Logo Stinger Design", "VFX Camera Tracking", "Custom Lower Thirds"]
    },
    {
      name: "Adobe Lightroom",
      short: "Lr",
      bgColor: "bg-[#002330]/90",
      borderColor: "border-[#31c3ec]/45",
      glowColor: "rgba(49, 195, 236, 0.45)",
      textColor: "text-[#31c3ec]",
      level: 92,
      experience: "4+ Years",
      description: "High-end photo batch metadata cataloging, tonal curve balancing, specific color spectrum targeting, and premium tone adjustments for cinematic photoshoot grades.",
      specialties: ["Batch Color Correction", "Tonal Curve Mastery", "Creative Photo Grades", "Dynamic Range Control"]
    },
    {
      name: "Adobe Audition",
      short: "Au",
      bgColor: "bg-[#002914]/90",
      borderColor: "border-[#00e575]/45",
      glowColor: "rgba(0, 229, 117, 0.45)",
      textColor: "text-[#00e575]",
      level: 88,
      experience: "3+ Years",
      description: "Surgical voice track restoration, parametric EQ mastering, click and rumble suppression, stereo spectrum widening, and multi-track audio clip optimization.",
      specialties: ["Noise Suppression", "Voice track Equalization", "Multi-Track Master Mix", "Stereo Widening"]
    },
    {
      name: "Canva",
      short: "Cv",
      bgColor: "bg-[#001026]/90",
      borderColor: "border-[#00d2c4]/45",
      glowColor: "rgba(0, 210, 196, 0.45)",
      textColor: "text-[#00d2c4]",
      level: 95,
      experience: "4+ Years",
      description: "Enabling rapid layout compositions, presentations, real-time client revision drafts, branding kit syncing, and social media post layouts with optimal visual turnaround times.",
      specialties: ["Rapid Draft Assets", "Presentation Templates", "Social Post Styling", "Visual Board Sync"]
    },
    {
      name: "CapCut",
      short: "Cc",
      bgColor: "bg-[#111115]/90",
      borderColor: "border-[#2de2e6]/45",
      glowColor: "rgba(45, 226, 230, 0.45)",
      textColor: "text-[#2de2e6]",
      level: 90,
      experience: "3+ Years",
      description: "Optimized mobile and vertical format video structure design, sound effect syncing, trending transition setups, auto-caption typography, and creative overlay adjustments.",
      specialties: ["Short-form Layouts", "Trending Reels Edits", "Dynamic Captions", "Creative Overlays"]
    },
    {
      name: "AI Tools",
      short: "AI",
      bgColor: "bg-[#2d1b00]/90",
      borderColor: "border-[#f59e0b]/45",
      glowColor: "rgba(245, 158, 11, 0.45)",
      textColor: "text-[#f59e0b]",
      level: 95,
      experience: "2+ Years",
      description: "Harnessing Midjourney, Firefly, stable diffusion, and LLMs for creative resource expansion, smart content generation, and streamlining complex post-production workflows.",
      specialties: ["Generative Fill Expansion", "Midjourney Asset Prompting", "Workflow Optimization", "AI Vector Remapping"]
    }
  ];

  // Smooth High-Performance 3D Orbit Loop (GPU Bound Animation Tick)
  useEffect(() => {
    const tick = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        // Adjust speed slightly; if hovered, pause the orbital delta rotation
        if (hoveredIndex === null) {
          // 24s full rotation -> (2 * Math.PI) / 24000 rad/ms
          const speed = (2 * Math.PI) / 25000;
          setGlobalAngle((prev) => (prev + speed * delta) % (2 * Math.PI));
        }
      }
      lastTimeRef.current = time;
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [hoveredIndex]);

  // Interactive mouse parallax offset tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    // Amplify movement slightly for natural premium interactive feel
    setMouseParallax({ x: x * 12, y: y * 12 });
  };

  const handleMouseLeave = () => {
    setMouseParallax({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  // Generate dynamic atmospheric starry matrix
  const starsArray = useRef(
    Array.from({ length: 24 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      scale: 0.4 + Math.random() * 0.8,
      duration: `${3 + Math.random() * 4}s`,
    }))
  ).current;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 flex flex-col items-center justify-center min-h-[640px] sm:min-h-[720px] md:min-h-[820px] overflow-hidden select-none"
    >
      {/* 
        =========================================
        LUXURY ATMOSPHERIC BACKDROP LAYERS
        =========================================
      */}
      {/* Dynamic Aurora Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080c1a]/80 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Dynamic Interactive Soft Cinematic Light Rays */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none transition-transform duration-500 ease-out mix-blend-screen"
        style={{
          transform: `translate(calc(-50% + ${mouseParallax.x * 1.5}px), calc(-50% + ${mouseParallax.y * 1.5}px))`,
          top: '50%',
          left: '50%'
        }}
      />

      {/* Cinematic Star Field Matrix Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {starsArray.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white blur-[0.5px]"
            style={{
              top: star.top,
              left: star.left,
              width: `${2 * star.scale}px`,
              height: `${2 * star.scale}px`,
              animation: `pulse ${star.duration} infinite ease-in-out`
            }}
          />
        ))}
      </div>

      {/* 
        =========================================
        THE 3D ORBITAL STAGE
        =========================================
      */}
      <div className="relative w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] md:w-[620px] md:h-[620px] flex items-center justify-center">
        
        {/* Helper Visual 3D Guide Ellipse Lines */}
        <div 
          className="absolute rounded-full border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] pointer-events-none transition-transform duration-300"
          style={{
            width: `${rx * 2}px`,
            height: `${ry * 2}px`,
            transform: 'rotateX(60deg) translateZ(0)',
          }}
        />
        <div 
          className="absolute rounded-full border border-dashed border-indigo-400/10 pointer-events-none transition-transform duration-300"
          style={{
            width: `${rx * 2 + 30}px`,
            height: `${ry * 2 + 12}px`,
            transform: 'rotateX(60deg) translateZ(0)',
          }}
        />

        {/* 5. INTERACTIVE 3D ORBITING LIGHT PARTICLES */}
        {[...Array(6)].map((_, i) => {
          const offset = (i * 2 * Math.PI) / 6 + Math.PI / 6;
          const particleAngle = globalAngle * 1.15 + offset; // orbits dynamically
          const cosP = Math.cos(particleAngle);
          const sinP = Math.sin(particleAngle);
          
          const px = rx * cosP;
          const py = ry * sinP;
          const pDepth = sinP;
          
          const pScale = 0.45 + (pDepth + 1) * 0.25; // scale from 0.45 to 0.95
          const pOpacity = 0.25 + (pDepth + 1) * 0.35; // opacity from 0.25 to 0.95
          const pBlur = pDepth < -0.3 ? 1 : 0;
          
          const pZIndex = pDepth > 0 ? 35 : 15;
          const glowColor = i % 2 === 0 ? 'rgba(59, 130, 246, 0.7)' : 'rgba(245, 158, 11, 0.7)';
          const colorClass = i % 2 === 0 ? 'bg-blue-400' : 'bg-amber-400';

          return (
            <div
              key={`p-${i}`}
              className={`absolute rounded-full pointer-events-none transition-transform duration-100 ease-out ${colorClass}`}
              style={{
                transform: `translate(${px}px, ${py}px) scale(${pScale})`,
                opacity: pOpacity,
                filter: pBlur > 0 ? `blur(${pBlur}px)` : 'none',
                width: '6px',
                height: '6px',
                zIndex: pZIndex,
                boxShadow: `0 0 10px 4px ${glowColor}`,
              }}
            />
          );
        })}

        {/* 
          1. PREMIUM CENTRAL GLASS PORTRAIT (Double Ring + Breathing Glow)
        */}
        <div 
          className="absolute z-30 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${mouseParallax.x}px, ${mouseParallax.y}px)`
          }}
        >
          <motion.div
            className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full bg-gray-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex items-center justify-center border border-gray-800/50 backdrop-blur-md"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          >
            {/* Spinning Energy Rings & Double Borders */}
            <div className="absolute -inset-1.5 rounded-full border border-amber-500/25 blur-[1.5px] pointer-events-none animate-pulse duration-[5s]" />
            <div className="absolute -inset-3.5 rounded-full border border-blue-500/20 blur-[0.5px] pointer-events-none" />
            
            {/* Conic Energy Ring rotation trace overlay */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500/20 via-transparent to-amber-500/20 animate-spin pointer-events-none" style={{ animationDuration: '10s' }} />

            {/* Inner Ring container boundary */}
            <div className="absolute inset-1 rounded-full border border-blue-400/20 pointer-events-none" />

            {/* Core Avatar Image frame with vignette */}
            <div className="h-full w-full rounded-full overflow-hidden relative bg-gray-950 flex items-center justify-center">
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top select-none scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* 
          2. DYNAMIC 3D DEPTH ROTATING ITEMS
          Using Polar Math Projection:
          x = rx * cos(angle)
          y = ry * sin(angle)
          z = sin(angle) (depth metric: -1 to 1)
        */}
        {softwareSkills.map((skill, index) => {
          // Distribute items evenly around the circle
          const baseOffset = (index * 2 * Math.PI) / softwareSkills.length;
          const currentItemAngle = globalAngle + baseOffset;

          const cosVal = Math.cos(currentItemAngle);
          const sinVal = Math.sin(currentItemAngle);

          // Calculate visual coordinates
          const x = rx * cosVal;
          const y = ry * sinVal;

          // Depth metric: ranges from -1 (at the very back) to +1 (at the very front)
          const depth = sinVal;

          // Compute responsive 3D scales, blurs, and opacity based on depth coordinate
          const isAtFront = depth > 0;
          const baseScale = 0.76 + (depth + 1) * 0.17; // scale from 0.76 to 1.10
          const baseBlur = depth < -0.3 ? Math.min(3, Math.abs(depth + 0.3) * 4) : 0; // blur at the back
          const baseOpacity = 0.45 + (depth + 1) * 0.275; // opacity from 0.45 to 1.0

          // Calculate explicit layered Z-Index mapping:
          // The Avatar is static at z-index 30.
          // Front items (depth > 0) get z-index 40 to 50.
          // Back items (depth < 0) get z-index 10 to 20.
          const zIndex = isAtFront 
            ? 40 + Math.round(depth * 10) 
            : 10 + Math.round((depth + 1) * 10);

          // Interactivity overrides for active hovering
          const isHovered = hoveredIndex === index;
          const displayScale = isHovered ? 1.25 : baseScale;
          const displayBlur = isHovered ? 0 : baseBlur;
          const displayOpacity = isHovered ? 1.0 : baseOpacity;
          const displayZIndex = isHovered ? 100 : zIndex;

          return (
            <div
              key={index}
              className="absolute transition-transform duration-100 ease-out pointer-events-none"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                zIndex: displayZIndex,
              }}
            >
              {/* Interactive container to translate mouse interactions properly */}
              <div 
                className="pointer-events-auto"
                style={{
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
              >
                {/* 
                  3. THE LUXURY GLASSMORPHISM SOFTWARE CARD
                */}
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedSkill(skill)}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl ${skill.bgColor} border ${skill.borderColor} ${skill.textColor} flex flex-col items-center justify-center shadow-[0_6px_25px_rgba(0,0,0,0.55)] cursor-pointer select-none group transition-all duration-300`}
                  style={{
                    transform: `scale(${displayScale})`,
                    filter: displayBlur > 0 ? `blur(${displayBlur}px)` : 'none',
                    opacity: displayOpacity,
                    boxShadow: isHovered 
                      ? `0 0 25px ${skill.glowColor}, 0 10px 30px rgba(0,0,0,0.75)` 
                      : `0 0 15px ${skill.glowColor.replace('0.45', '0.15')}, 0 4px 15px rgba(0,0,0,0.4)`,
                  }}
                >
                  {/* Real reflections / shining overlay stripes */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-current opacity-30 group-hover:opacity-100 transition-opacity" />

                  {/* Icon Lettermark Typo */}
                  <span className="font-sans font-black tracking-tight text-lg sm:text-xl md:text-2xl mt-0.5 leading-none">
                    {skill.short}
                  </span>

                  {/* Micro index active dot */}
                  <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-current opacity-25 group-hover:opacity-100 transition-opacity" />

                  {/* 
                    4. MAGNETIC TOOLTIP COMPONENT
                  */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-950/95 text-white border border-gray-800 text-[10px] sm:text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-2xl whitespace-nowrap z-[120] pointer-events-none tracking-wide"
                      >
                        <div className="flex items-center gap-1.5 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style={{ color: skill.textColor }} />
                          {skill.name}
                        </div>
                        {/* Triangular support foot */}
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-950 border-r border-b border-gray-800 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* 
        =========================================
        AWWWARDS STYLE SOFTWARE MODAL POPUP
        =========================================
      */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            {/* Dark dismiss panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-blue-950/10" onClick={() => setSelectedSkill(null)} />

            {/* Glassmorphism details card popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 30 }}
              className="relative w-full max-w-lg rounded-3xl bg-gray-950 border border-gray-800 p-6 sm:p-8 overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.95)]"
              style={{
                boxShadow: `0 0 55px ${selectedSkill.glowColor.replace('0.45', '0.07')}, 0 30px 80px rgba(0,0,0,0.95)`
              }}
            >
              {/* Backing ambient gradient lights */}
              <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-blue-500/10 blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-amber-500/5 blur-[70px] pointer-events-none" />

              {/* Close Button Trigger */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-gray-850 bg-gray-900/60 hover:bg-gray-900 text-gray-400 hover:text-white transition-all cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Layout Container */}
              <div className="flex flex-col gap-6 relative z-10">
                
                {/* Header Info */}
                <div className="flex items-center gap-4 border-b border-gray-900 pb-5">
                  <div className={`w-16 h-16 rounded-2xl ${selectedSkill.bgColor} border ${selectedSkill.borderColor} ${selectedSkill.textColor} flex items-center justify-center font-bold font-mono text-2xl shadow-xl relative`}>
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-current" />
                    {selectedSkill.short}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{selectedSkill.name}</h3>
                    <div className="flex items-center gap-2 mt-1.5 text-gray-400 text-xs font-mono font-bold uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{selectedSkill.experience} Experience</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-left font-medium">
                  {selectedSkill.description}
                </p>

                {/* Level Scrubber Metric */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-orange-400" />
                      <span>Skill Proficiency</span>
                    </div>
                    <span className="text-blue-400 font-black">{selectedSkill.level}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Specialty Tags */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-gray-400 mb-3">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span>Specialties & Workflow</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800/80 text-gray-300 text-xs font-bold font-sans tracking-wide shadow-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-900 mt-2">
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="px-5 py-2.5 rounded-xl border border-gray-800 hover:border-gray-700 bg-gray-950 hover:bg-gray-900 text-gray-300 text-xs font-bold tracking-wide transition-all cursor-pointer"
                  >
                    Close Details
                  </button>
                  <a
                    href="https://behance.net/mdrifatulriad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <span>Behance Projects</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
