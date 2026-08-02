import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Briefcase, GraduationCap, CheckCircle, Flame, MapPin, User, Calendar, Palette, Video, Megaphone, Sparkles } from 'lucide-react';
import { STATISTICS, PERSONAL_INFO, profile } from '../data';

interface AboutProps {
  darkMode?: boolean;
}

export default function About({ darkMode = true }: AboutProps) {
  const [activeTab, setActiveTab] = useState<'facts' | 'education'>('facts');
  
  return (
    <section id="about" className="relative mt-36 sm:mt-44 md:mt-48 lg:mt-56 py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 h-80 w-80 rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-mono text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest mb-2">// INSIGHTS</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">About My Creative Journey</h2>
          <div className="mt-4 h-1 w-16 bg-blue-500 rounded-full" />
        </div>

        {/* About Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Bio narrative and counters */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Bridging the boundary of creative luxury and strategic visual direction.
            </h3>
            
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
              I am MOHAMMAD RIFAT, a passionate Graphic Designer, Video Editor, and Digital Marketer. I enjoy transforming creative ideas into visually engaging designs and high-quality videos that leave a lasting impression. My goal is to create modern, professional, and impactful digital experiences while continuously improving my skills and exploring new creative possibilities.
            </p>

            {/* Core Skills List */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {["Graphic Designer", "Video Editor", "Meta Marketer", "Generative AI Tools"].map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-bold tracking-wide shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Statistics Animated Tickers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {STATISTICS.map((stat, i) => (
                <StatCounter 
                  key={i} 
                  value={stat.value} 
                  label={stat.label} 
                  suffix={stat.suffix} 
                />
              ))}
            </div>
          </div>

          {/* Right Block: Interactive Tabs (Facts, Education, Credentials) */}
          <div className="col-span-1 lg:col-span-5 bg-white dark:bg-gray-900/50 backdrop-blur-md border border-slate-200 dark:border-gray-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-none">
            {/* Tab selection buttons */}
            <div className="flex gap-2 bg-slate-100 dark:bg-gray-950/60 p-1.5 rounded-2xl mb-8 border border-slate-200/50 dark:border-gray-800/20">
              {(['facts', 'education'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab === 'facts' ? 'Overview' : 'Education'}
                </button>
              ))}
            </div>

            {/* Tab Contents with animations */}
            <div className="min-h-[250px] flex flex-col justify-start">
              {activeTab === 'facts' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 text-left"
                >
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quick Facts</h4>
                  <div className="flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25">
                      <MapPin className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500">Location</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">{PERSONAL_INFO.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25">
                      <User className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500">Status</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">Available for select contracts</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25">
                      <Flame className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500">Core Focus</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">Visual Identities & Motion Assets</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25">
                      <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500">Timezone</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">GMT+6 (BST / Dhaka)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-left"
                >
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Academic Highlights</h4>
                  
                  {profile.education.map((edu, idx) => (
                    <div key={idx} className="relative border-l border-slate-200 dark:border-gray-800 pl-5 ml-2.5">
                      <div className={`absolute -left-[6px] top-1.5 h-3 w-3 rounded-full shadow-lg ${
                        idx === 0 ? 'bg-blue-500 shadow-blue-500/50' : idx === 1 ? 'bg-indigo-500 shadow-indigo-500/50' : 'bg-sky-500 shadow-sky-500/50'
                      }`} />
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-mono font-bold tracking-wider">{edu.year}</p>
                        <span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded">Result: {edu.result}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-1">{edu.degree}</h5>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{edu.institute}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

        </div>

        {/* Modern Creative Journey Timeline (requested) */}
        <CreativeTimeline darkMode={darkMode} />

      </div>
    </section>
  );
}

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function CreativeTimeline({ darkMode = true }: { darkMode?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const milestones: TimelineMilestone[] = [
    {
      year: "2021",
      title: "Freelance Graphic Designer",
      description: "Began my professional journey by designing luxury branding assets, premium social media posters, and high-CTR YouTube thumbnails.",
      icon: <Palette className="h-4 w-4 text-blue-500 dark:text-blue-400" />
    },
    {
      year: "2022",
      title: "Cinematic Video Editing & VFX",
      description: "Advanced into professional video editing and VFX. Crafted complex timelines, color grading, sound design, and custom transitions for high-fidelity brand commercials.",
      icon: <Video className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
    },
    {
      year: "2023",
      title: "Meta Marketing & Creative Strategist",
      description: "Blended creative design with meta-marketing strategies. Engineered high-converting Facebook and Instagram ad campaigns with data-driven visuals.",
      icon: <Megaphone className="h-4 w-4 text-purple-500 dark:text-purple-400" />
    },
    {
      year: "2024 - Present",
      title: "Generative AI Pioneer",
      description: "Integrated state-of-the-art Generative AI workflows (Midjourney, Stable Diffusion, RunWay) into standard creative pipelines to deploy visual campaigns.",
      icon: <Sparkles className="h-4 w-4 text-sky-500 dark:text-sky-400" />
    }
  ];

  return (
    <div ref={containerRef} className="mt-24 pt-10 border-t border-slate-200 dark:border-gray-800/20">
      <div className="flex flex-col items-start text-left mb-14">
        <span className="text-xs font-mono text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest mb-2">// MILESTONES</span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">My Creative Journey</h3>
      </div>

      <div className="relative border-l border-slate-200 dark:border-gray-800/60 ml-3 md:ml-4 space-y-12 text-left">
        {milestones.map((milestone, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative pl-8 md:pl-10 group"
          >
            {/* Pulsing point icon */}
            <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-lg bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
              {milestone.icon}
            </div>

            {/* Date Badge */}
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-black uppercase tracking-wider mb-2.5">
              {milestone.year}
            </span>

            {/* Title */}
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
              {milestone.title}
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              {milestone.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Sub-component: StatCounter which counts up when in-view
function StatCounter({ value, label, suffix }: { value: number; label: string; suffix: string; key?: any }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200; // ms
    const incrementTime = 30; // ms
    const steps = Math.floor(duration / incrementTime);
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center sm:items-start p-4.5 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/20 rounded-2xl text-center sm:text-left shadow-lg dark:shadow-none select-none"
    >
      <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-500 tracking-tight tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 mt-2 leading-tight">
        {label}
      </span>
    </div>
  );
}
