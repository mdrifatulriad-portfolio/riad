import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowRight, Star, Palette, MessageSquare, Play, Video, Sparkles, Youtube, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import PremiereTimeline from './PremiereTimeline';
import TimelineStrips from './TimelineStrips';

export default function Hero() {
  const skills = ["Graphic Designer", "Video Editor", "Meta Marketer", "Generative AI Tools"];
  const [skillIndex, setSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const fullText = skills[skillIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        
        if (displayText.length === fullText.length) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
          return;
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setSkillIndex((prev) => (prev + 1) % skills.length);
          return;
        }
      }

      const speed = isDeleting ? 30 : 70;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, isDeleting ? 30 : 90);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, skillIndex]);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToId = (id: string) => {
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
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden px-4 md:px-8 max-w-7xl mx-auto group/hero"
    >
      {/* Premium Shifting Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120] via-[#0E172C] to-[#0A0F1D] z-0 pointer-events-none" />

      {/* Mouse follow spotlight (requested) */}
      <div 
        className="absolute pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 rounded-full w-[450px] h-[450px] bg-gradient-to-r from-blue-500/8 via-indigo-500/8 to-transparent blur-[80px] z-0"
        style={{
          left: `${coords.x - 225}px`,
          top: `${coords.y - 225}px`,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Drifting subtle particles (requested) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full bg-blue-400/20 blur-[1px]"
            style={{
              top: `${(i * 13) % 100}%`,
              left: `${(i * 27) % 100}%`,
              width: `${2 + (i % 3) * 2}px`,
              height: `${2 + (i % 3) * 2}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + (i % 5) * 4,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Background Floating Gradient Blobs */}
      <div className="absolute top-1/6 left-1/12 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px] animate-pulse duration-5000 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/12 h-96 w-96 rounded-full bg-indigo-500/15 blur-[140px] animate-pulse duration-7000 pointer-events-none" />
      
      {/* Animated Video Editing Timelines */}
      <TimelineStrips />
      
      {/* Floating Glowing Shapes in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Shape 1 */}
        <motion.div 
          animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 120, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-12 h-12 rounded-xl bg-blue-500/5 border border-blue-500/10 blur-[1px]"
        />
        {/* Shape 2 */}
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, -90, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
          className="absolute bottom-1/3 left-1/5 w-16 h-16 rounded-full bg-indigo-500/5 border border-indigo-500/10 blur-[2px]"
        />
        {/* Shape 3 */}
        <motion.div 
          animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/3 w-8 h-8 rounded-lg bg-sky-400/5 border border-sky-400/10 blur-[1px]"
        />
      </div>

      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Style overrides for custom light sweep, particle animations, and deep neon glow */}
      <style>{`
        @keyframes textSweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes subtleFloating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(0.5deg); }
        }
        @keyframes orbitalFloat {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); opacity: 0; }
        }
      `}</style>

      {/* Cinematic Star Field Backdrop Matrix */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none z-0">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full blur-[0.2px] animate-pulse"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 29) % 100}%`,
              width: `${1.2 + (i % 3) * 0.6}px`,
              height: `${1.2 + (i % 3) * 0.6}px`,
              animationDuration: `${3 + (i % 4) * 2.5}s`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full py-6 relative z-10 -mt-8 sm:-mt-12 lg:-mt-24">
        
        {/* Left Hand Column: Typography, Animated Typing, CTAs */}
        <div className="col-span-1 lg:col-span-7 flex flex-col text-center items-center lg:text-left lg:items-start">
          
          {/* Eyebrow badges row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] xs:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.15)]"
              initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              PREMIUM CREATIVE DIRECTOR
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] xs:text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Freelance
            </motion.div>
          </div>

          {/* Name Header with text sweep, glow, and increased sharpness */}
          <motion.h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-2 leading-none relative select-none"
            initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              textShadow: '0 0 40px rgba(59, 130, 246, 0.25), 0 0 80px rgba(59, 130, 246, 0.1)',
              letterSpacing: '-0.035em',
            }}
          >
            MOHAMMAD <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-100 to-white font-black drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              RIFAT
              {/* Light Sweep Animation overlay */}
              <span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full pointer-events-none mix-blend-overlay"
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'textSweep 7s ease-in-out infinite',
                }}
              />
            </span>
          </motion.h1>

          {/* Professional Animated Skill Rotator */}
          <motion.div
            className="mt-4 mb-2 flex items-center min-h-[40px] select-none"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center font-sans">
              <span className="text-blue-500 mr-2 sm:mr-3 select-none text-xl sm:text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                •
              </span>
              <span className="bg-gradient-to-r from-white via-indigo-100 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.45)] font-sans font-bold">
                {displayText}
              </span>
              <span className="w-[3px] h-5 sm:h-7 bg-blue-400 ml-2 animate-pulse rounded-full shadow-[0_0_10px_#60a5fa]" style={{ animationDuration: '0.8s' }} />
            </span>
          </motion.div>

          {/* Short introduction */}
          <motion.p
            className="text-sm xs:text-base sm:text-lg text-gray-400 font-medium leading-relaxed max-w-xl mb-6 select-none mt-4 px-4 sm:px-0"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {PERSONAL_INFO.intro}
          </motion.p>

          {/* Social Media Section with Premium Glassmorphism and Hover Glow */}
          <motion.div
            className="flex items-center gap-3.5 mb-8 px-4 sm:px-0 justify-center lg:justify-start flex-wrap"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest mr-1.5">// CONNECT:</span>
            
            {/* Behance */}
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href={PERSONAL_INFO.socials.behance}
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 bg-gray-900/40 border border-gray-800/40 hover:border-blue-500/35 hover:bg-blue-600/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-md cursor-pointer"
              aria-label="Behance profile link"
              title="Behance"
            >
              <ExternalLink className="h-4.5 w-4.5" />
            </motion.a>

            {/* Facebook */}
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href={PERSONAL_INFO.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 bg-gray-900/40 border border-gray-800/40 hover:border-blue-500/45 hover:bg-blue-600/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-md cursor-pointer"
              aria-label="Facebook profile link"
              title="Facebook"
            >
              <Facebook className="h-4.5 w-4.5" />
            </motion.a>

            {/* Instagram */}
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 bg-gray-900/40 border border-gray-800/40 hover:border-blue-500/35 hover:bg-blue-600/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-md cursor-pointer"
              aria-label="Instagram profile link"
              title="Instagram"
            >
              <Instagram className="h-4.5 w-4.5" />
            </motion.a>

            {/* YouTube Shorts Channel with Red Glow, Tooltip and Glassmorphism style */}
            <div className="relative group/yth">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.youtube.com/@MdrifatulIslam3426/shorts"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 bg-gray-900/40 border border-gray-800/40 hover:border-red-500/50 hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.45)] rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-md cursor-pointer"
                aria-label="YouTube Shorts channel link"
              >
                <Youtube className="h-4.5 w-4.5" />
              </motion.a>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-950 text-white text-[10px] font-bold py-1 px-2.5 rounded border border-gray-800/80 whitespace-nowrap opacity-0 group-hover/yth:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                Watch My YouTube Portfolio
              </div>
            </div>
          </motion.div>

          {/* Horizontal row of CTAs with premium centering and wrapping */}
          <motion.div
            className="flex flex-wrap gap-3.5 sm:gap-4 items-center justify-center lg:justify-start w-full px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <motion.button
              onClick={() => scrollToId('portfolio')}
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white font-bold text-xs tracking-widest uppercase px-6 py-4 rounded-xl transition-all duration-350 cursor-pointer relative overflow-hidden border border-blue-400/20"
              whileHover={{ 
                scale: 1.03, 
                y: -2,
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Internal shiny reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span>View Portfolio</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-blue-200" />
            </motion.button>

            <motion.a
              href={PERSONAL_INFO.cvUrl}
              className="flex items-center gap-2 bg-gray-950/70 hover:bg-gray-900 border border-gray-800/80 hover:border-gray-700 text-gray-300 hover:text-white font-bold text-xs tracking-widest uppercase px-5 py-4 rounded-xl transition-all duration-300 relative"
              whileHover={{ 
                scale: 1.03, 
                y: -2,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.05), 0 10px 25px rgba(0,0,0,0.5)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="h-4 w-4 text-blue-400" />
              Download CV
            </motion.a>

            <motion.a
              href={PERSONAL_INFO.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 font-bold text-xs tracking-widest uppercase px-5 py-4 rounded-xl transition-all duration-350 shadow-sm relative"
              whileHover={{ 
                scale: 1.03, 
                y: -2,
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.25), 0 10px 25px rgba(0,0,0,0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              WhatsApp
            </motion.a>
          </motion.div>
        </div>

        {/* Right Hand Column: Portrait Display */}
        <div className="col-span-1 lg:col-span-5 flex justify-center items-center relative py-6 lg:py-0 lg:mt-16 lg:translate-y-[85px] lg:pl-4">
          {/* Main frame container */}
          <motion.div
            className="relative h-[350px] w-full max-w-[270px] xs:h-[380px] xs:max-w-[290px] sm:h-[440px] sm:max-w-[340px] md:h-[480px] md:max-w-[380px] lg:h-[510px] lg:max-w-[410px] rounded-[36px] transition-all duration-500 group/card cursor-default"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{ 
              y: -5,
              rotateX: 1.2,
              rotateY: -1.2,
              boxShadow: '0 30px 60px -15px rgba(59, 130, 246, 0.25)'
            }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            {/* 1. CINEMATIC GLOW LAYERS BEHIND SUBJECT */}
            {/* Orange/gold/amber glow behind head and shoulders */}
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-amber-500/25 to-orange-600/15 blur-[70px] z-0 pointer-events-none animate-pulse duration-[7000ms]" />
            <div className="absolute top-[20%] left-1/3 w-56 h-56 rounded-full bg-blue-500/15 blur-[90px] z-0 pointer-events-none" />
            <div className="absolute top-[3%] right-1/4 w-72 h-72 rounded-full bg-amber-600/15 blur-[80px] z-0 pointer-events-none" />
            
            {/* Volumetric light rays container */}
            <div className="absolute inset-0 overflow-hidden rounded-[36px] z-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[conic-gradient(from_0deg_at_50%_0%,transparent_0%,rgba(249,115,22,0.1)_10%,transparent_20%,rgba(245,158,11,0.06)_40%,transparent_50%,rgba(59,130,246,0.05)_70%,transparent_80%)] animate-[spin_40s_linear_infinite]" />
            </div>

            {/* 2. VIDEO EDITING TIMELINE-INSPIRED BACKGROUND */}
            <div className="absolute inset-x-4 top-[15%] bottom-[12%] rounded-2xl bg-gray-950/75 border border-gray-900/60 p-3 shadow-inner z-10 overflow-hidden select-none transition-all duration-700 blur-[2px] opacity-40 hover:blur-[0.5px] hover:opacity-75 pointer-events-none">
              {/* Timeline Ruler */}
              <div className="flex justify-between items-center h-4 border-b border-gray-800/60 pb-1 mb-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center h-full">
                    <span className="text-[6px] font-mono text-gray-600 font-bold">00:0{i}f</span>
                    <div className="w-[1px] h-1 bg-gray-800" />
                  </div>
                ))}
              </div>
              
              {/* Tracks (V3, V2, V1, A1) */}
              <div className="space-y-1.5">
                {/* V3: Effects (Orange) */}
                <div className="flex gap-1 h-5 items-center bg-orange-950/10 border-b border-gray-900/30">
                  <span className="text-[6px] font-mono font-bold text-orange-500 w-4 pl-0.5">V3</span>
                  <div className="h-3.5 rounded bg-gradient-to-r from-orange-500/20 to-amber-500/30 border border-orange-500/40 w-1/2 flex items-center px-1">
                    <span className="text-[6px] font-bold text-orange-400 font-mono truncate">LUT_Orange_Rim</span>
                  </div>
                  <div className="h-1.5 w-1.5 bg-white rounded-full opacity-60 self-center ml-2 border border-gray-900" />
                </div>

                {/* V2: Overlay (Blue) */}
                <div className="flex gap-1 h-5 items-center bg-blue-950/10 border-b border-gray-900/30">
                  <span className="text-[6px] font-mono font-bold text-blue-500 w-4 pl-0.5">V2</span>
                  <div className="h-3.5 rounded bg-gradient-to-r from-blue-500/20 to-indigo-500/30 border border-blue-500/40 w-2/3 flex items-center px-1">
                    <span className="text-[6px] font-bold text-blue-300 font-mono truncate">Cinematic_Vignette</span>
                  </div>
                </div>

                {/* V1: Main Video (Teal) */}
                <div className="flex gap-1 h-5 items-center bg-teal-950/10 border-b border-gray-900/30">
                  <span className="text-[6px] font-mono font-bold text-teal-500 w-4 pl-0.5">V1</span>
                  <div className="h-3.5 rounded bg-gradient-to-r from-teal-500/20 to-emerald-500/30 border border-teal-500/40 w-[85%] flex items-center px-1">
                    <span className="text-[6px] font-bold text-teal-300 font-mono truncate">RIFAT_PORTRAIT.png</span>
                  </div>
                </div>

                {/* A1: Audio waveform (Pink/Purple) */}
                <div className="flex gap-1 h-6 items-center bg-purple-950/10">
                  <span className="text-[6px] font-mono font-bold text-purple-500 w-4 pl-0.5">A1</span>
                  <div className="h-4 rounded bg-gradient-to-r from-purple-500/15 to-pink-500/25 border border-purple-500/30 flex-1 relative overflow-hidden flex items-center">
                    {/* Tiny visual waveform */}
                    <div className="absolute inset-y-0.5 inset-x-1 flex items-center justify-around">
                      {[15, 35, 10, 45, 20, 30, 15, 40, 25, 10, 35, 15, 20, 45].map((h, index) => (
                        <div key={index} className="w-[1.5px] rounded-full bg-purple-400/50" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Playhead in backend timeline */}
              <div className="absolute top-0 bottom-0 left-[42%] w-[1px] bg-red-500/70 z-10 pointer-events-none">
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-red-500 border border-red-400 rotate-45" />
              </div>
            </div>

            {/* Soft vignette overlay around the background edge */}
            <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,5,5,0.75)_100%)] z-15 pointer-events-none" />

            {/* Thin animated neon blue border & soft outer glow */}
            <div className="absolute -inset-[1px] rounded-[34px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 z-15 opacity-80 pointer-events-none shadow-[0_0_20px_rgba(59,130,246,0.35)] animate-[pulse_3s_infinite_alternate]" />
            <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 animate-[spin_10s_linear_infinite] z-10 pointer-events-none blur-md opacity-25" />

            {/* Frame geometric outlines (for technical HUD style overlay) */}
            <div className="absolute -inset-2 rounded-[38px] border border-blue-500/10 pointer-events-none z-15" />
            <div className="absolute -inset-4 rounded-[46px] border border-indigo-500/5 pointer-events-none z-15" />

            {/* Core Avatar Container & Interactive Image Frame */}
            <div className="h-full w-full rounded-[32px] bg-gray-950/40 backdrop-blur-[12px] p-2.5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden z-20 group">
              
              {/* Rotating sci-fi energy rings inside the frame */}
              <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/20 animate-[spin_25s_linear_infinite] pointer-events-none z-10" />
              <div className="absolute inset-8 rounded-full border border-double border-indigo-500/10 animate-[spin_40s_linear_infinite_reverse] pointer-events-none z-10" />

              {/* Premium Background layers: subtle shifting linear gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/25 via-gray-950/80 to-indigo-950/25 z-0 opacity-80 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.12),transparent_70%)] z-0 pointer-events-none" />

              {/* Cinematic spotlight behind the body */}
              <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.32)_0%,transparent_65%)] pointer-events-none z-0 blur-xl" />

              {/* Premium floating light effect with slow movement */}
              <motion.div
                className="absolute w-40 h-40 rounded-full bg-blue-500/8 blur-[45px] pointer-events-none z-0"
                animate={{
                  x: [-35, 35, -20, -35],
                  y: [-25, 35, -40, -25],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: 'easeInOut'
                }}
              />

              {/* Subtle floating particles in the background */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-400/40 pointer-events-none z-0"
                  style={{
                    width: i % 2 === 0 ? 3 : 2,
                    height: i % 2 === 0 ? 3 : 2,
                    left: `${15 + i * 14}%`,
                    bottom: '10%',
                  }}
                  animate={{
                    y: [0, -200],
                    opacity: [0, 0.7, 0],
                    x: [0, i % 2 === 0 ? 12 : -12]
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.8
                  }}
                />
              ))}

              {/* Dynamic slow breathing scale and floating effect */}
              <motion.div
                className="h-full w-full flex items-center justify-center relative z-20 pt-8 sm:pt-10 lg:pt-12"
                animate={{ 
                  y: [0, -3.5, 0],
                  scale: [1, 1.012, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 8, 
                  ease: 'easeInOut' 
                }}
              >
                {/* Underlaid Rim Light Overlays */}
                <div className="absolute -left-6 top-1/4 bottom-1/4 w-12 rounded-full bg-blue-500/15 blur-[25px] pointer-events-none" />
                <div className="absolute -right-6 top-1/4 bottom-1/4 w-12 rounded-full bg-amber-500/10 blur-[25px] pointer-events-none" />

                {/* Soft breathing spotlight behind profile image */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_65%)] pointer-events-none z-0 blur-md animate-pulse duration-[5000ms]" />

                {/* 3. RIM LIGHTING EFFECTS (Blue/Gold glows matching body cutout contours) */}
                {/* Underlay glow shadows on the transparent cutout */}
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain object-top transition-all duration-700 scale-102 group-hover/card:scale-104 select-none relative z-10"
                  style={{
                    filter: 'drop-shadow(0px -4px 15px rgba(59, 130, 246, 0.55)) drop-shadow(-8px 4px 18px rgba(59, 130, 246, 0.45)) drop-shadow(8px 4px 18px rgba(245, 158, 11, 0.35)) drop-shadow(0 15px 30px rgba(0,0,0,0.85))'
                  }}
                />
              </motion.div>
            </div>

            {/* Floating Card A: Video Editor Specialist Badge */}
            <motion.div
              className="absolute -top-3 -left-3 sm:-top-5 sm:-left-6 scale-90 sm:scale-100 bg-gray-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shadow-[0_8px_30px_rgba(59,130,246,0.2)] select-none z-30 origin-top-left"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(59, 130, 246, 0.45)' }}
            >
              <div className="h-8 w-8 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/40 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <span className="text-sm select-none leading-none">🎬</span>
              </div>
              <div className="text-left pr-1">
                <p className="text-[8px] sm:text-[9px] font-bold text-blue-400 uppercase tracking-widest">Professional</p>
                <p className="text-[10px] sm:text-xs font-black text-white">Video Editor</p>
              </div>
            </motion.div>

            {/* Floating Card B: Premium Quality Rating Badge */}
            <motion.div
              className="absolute -bottom-3 -right-2 sm:-right-4 scale-90 sm:scale-100 bg-gray-950/85 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-1.5 shadow-[0_10px_35px_rgba(59,130,246,0.22)] select-none z-30 origin-bottom-right"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(59, 130, 246, 0.45)' }}
            >
              <div className="flex items-center gap-2 shrink-0">
                <div className="h-7 w-7 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.25)]">
                  <Star className="h-3.5 w-3.5 text-blue-400 fill-blue-400/40" />
                </div>
                <div className="text-left pr-1">
                  <p className="text-[8px] sm:text-[9px] font-bold text-blue-400 uppercase tracking-widest">Creative Portfolio</p>
                  <p className="text-[10px] sm:text-xs font-black text-white">Premium Quality</p>
                </div>
              </div>
              <div className="flex gap-1 justify-center bg-white/5 py-1 px-2 rounded-lg border border-white/5 shadow-inner">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-3 w-3 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.95)]" />
                ))}
              </div>
            </motion.div>

            {/* Floating Card C: Creative Designer Badge */}
            <motion.div
              className="absolute bottom-1/3 -left-3 sm:-left-8 scale-90 sm:scale-100 bg-gray-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shadow-[0_8px_30px_rgba(99,102,241,0.15)] select-none z-30 origin-left"
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 35px rgba(99, 102, 241, 0.4)' }}
            >
              <div className="h-8 w-8 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-400/40 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                <Sparkles className="h-4 w-4 text-indigo-400" />
              </div>
              <div className="text-left pr-1">
                <p className="text-[8px] sm:text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Creative</p>
                <p className="text-[10px] sm:text-xs font-black text-white">Designer</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 🔥 Signature Element: Adobe Premiere Pro-inspired Timeline Animation */}
      <div className="w-full mt-12 relative z-10">
        <div className="text-center mb-6">
          <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest mb-1">// LIVE WORKSPACE</p>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Interactive Creative Timeline</h3>
        </div>
        <PremiereTimeline />
      </div>

    </section>
  );
}
