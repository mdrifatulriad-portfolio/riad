import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Globe, 
  Play, 
  Film, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon,
  Youtube
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data';
import { ProjectCategory, Project } from '../types';

const CATEGORIES = ['All', 'Motion Graphics', 'Video Editing'] as const;
type FilterCategory = typeof CATEGORIES[number];

// Map static project IDs to fallback video URLs for seamless interaction
const STATIC_VIDEO_URLS: Record<string, string> = {
  p1: "https://youtube.com/shorts/3UAORW1Bq0A?feature=share",
  p4: "https://youtube.com/shorts/JHmWRNt6t4g?feature=share",
  p5: "https://youtube.com/shorts/3UAORW1Bq0A?feature=share",
  p7: "https://youtube.com/shorts/JHmWRNt6t4g?feature=share"
};

// Parse YouTube ID helper
const getYouTubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Check if a video is vertical (Shorts or 9:16 aspect ratio)
const isVerticalVideo = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.includes('shorts') || url.includes('/shorts/');
};

// Map projects to appropriate creative software tools (requested)
const getSoftwareUsed = (project: Project): string[] => {
  const softwares: string[] = [];
  const cat = project.category;
  
  if (cat === 'Video Editing' || project.tags.includes('editing') || project.tags.includes('video')) {
    softwares.push('Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve');
  } else if (cat === 'Motion Graphics' || project.tags.includes('motion') || project.tags.includes('vfx')) {
    softwares.push('Adobe After Effects', 'Adobe Premiere Pro', 'Adobe Illustrator');
  } else if (cat === 'Graphic Design' || project.tags.includes('branding') || project.tags.includes('poster')) {
    softwares.push('Adobe Photoshop', 'Adobe Illustrator', 'Canva');
  } else {
    softwares.push('Adobe Photoshop', 'Adobe Illustrator');
  }
  
  return [...new Set(softwares)];
};

// Generate high quality YouTube thumbnails dynamically
const getYouTubeThumbnail = (url: string): string => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80";
};

// Generate embedded YouTube URL with configurable autoplay
const getYouTubeEmbedUrl = (url: string, autoplay: boolean = true): string => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=0&controls=1&rel=0&playsinline=1&modestbranding=1` : "";
};

const YOUTUBE_TITLE_CACHE: Record<string, string> = {
  "9_MiaDuYy2A": "ZAYEN Perfume | Luxury AI Commercial ✨ Long Lasting Fragrance | Cinematic Product Ad",
  "ItoJWiWk3wk": "ZAYEN Perfume – Essence of Elegance | AI Generated Luxury Perfume Commercial",
  "0wzNH5JYnKQ": "Motion Graphics",
  "AaDE5QxflLs": "ডিগ্রি নয়, দক্ষতাই আপনাকে এগিয়ে নেবে!",
  "aQfVRPXepMI": "সুক্কানি খেজুর এ্যাড",
  "JHmWRNt6t4g": "ঘরের হাটে এখন সবই প্রাকৃতিক | 100% Organic Food | Ghorer Hut",
  "3UAORW1Bq0A": "Motion Graphics Showreel"
};

const fetchYouTubeTitle = async (videoUrl: string): Promise<string | null> => {
  const ytId = getYouTubeId(videoUrl);
  if (!ytId) return null;
  if (YOUTUBE_TITLE_CACHE[ytId]) {
    return YOUTUBE_TITLE_CACHE[ytId];
  }
  try {
    const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ytId}`);
    if (response.ok) {
      const data = await response.json();
      if (data && data.title) {
        YOUTUBE_TITLE_CACHE[ytId] = data.title;
        return data.title;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch YouTube title dynamically, falling back:", error);
  }
  return null;
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Fetch dynamic videos and merge them with portfolio
  useEffect(() => {
    let isMounted = true;

    const processAndSetProjects = async (dynamicVideos: Array<{ title: string; youtube: string }> = []) => {
      // Map static projects and inject video URLs, keeping only projects with actual video content
      const initialStatic = PORTFOLIO_PROJECTS
        .map(proj => {
          const videoUrl = STATIC_VIDEO_URLS[proj.id] || proj.videoUrl;
          let category: ProjectCategory = 'Video Editing';
          if (videoUrl) {
            category = isVerticalVideo(videoUrl) ? 'Motion Graphics' : 'Video Editing';
          }
          return {
            ...proj,
            videoUrl,
            category
          };
        })
        .filter(proj => proj.videoUrl);

      // Deduplicate dynamic videos by youtube URL/ID to prevent duplicate cards
      const seenVideoIds = new Set<string>();
      const uniqueDynamicVideos = dynamicVideos.filter(video => {
        const ytId = getYouTubeId(video.youtube);
        if (!ytId) return false;
        if (ytId === '3UAORW1Bq0A') return false; // Exclude "Motion Graphics Show Reel"
        if (seenVideoIds.has(ytId)) return false;
        seenVideoIds.add(ytId);
        return true;
      });

      // Map dynamic videos loaded from videos.json
      const dynamicProjects = uniqueDynamicVideos.map((video, index) => {
        const isShort = isVerticalVideo(video.youtube);
        const category: ProjectCategory = isShort ? 'Motion Graphics' : 'Video Editing';

        return {
          id: `dynamic-video-${index}`,
          title: video.title,
          category,
          image: getYouTubeThumbnail(video.youtube),
          description: `A custom post-production commercial showcase highlighting high-fidelity visuals, master color grading, and dynamic sound synchronization. Perfect for modern media optimization.`,
          tags: isShort 
            ? ["Transitions", "Vertical Video", "VFX", "Sound Design"] 
            : ["Video Editing", "Post Production", "VFX"],
          videoUrl: video.youtube,
          behanceUrl: "https://behance.net/mdrifatulriad"
        };
      });

      // Deduplicate static projects that have the same YouTube ID as any dynamic videos
      const initialStaticFiltered = initialStatic.filter(staticProj => {
        const staticYtId = getYouTubeId(staticProj.videoUrl);
        if (!staticYtId) return true;
        if (staticYtId === '3UAORW1Bq0A') return false; // Exclude "Motion Graphics Show Reel"
        return !seenVideoIds.has(staticYtId);
      });

      // Merge dynamic showreels at the top for premium visibility
      const merged = [...dynamicProjects, ...initialStaticFiltered];

      // Perform initial filter for duplicate titles or URLs (before dynamic titles resolve)
      const initialSeenTitles = new Set<string>();
      const initialSeenIds = new Set<string>();
      const uniqueInitial = merged.filter(p => {
        const ytId = getYouTubeId(p.videoUrl);
        const titleNormalized = p.title.trim().toLowerCase();
        if (ytId) {
          if (initialSeenIds.has(ytId)) return false;
          initialSeenIds.add(ytId);
        }
        if (initialSeenTitles.has(titleNormalized)) return false;
        initialSeenTitles.add(titleNormalized);
        return true;
      });

      if (isMounted) {
        setProjects(uniqueInitial);
      }

      // Resolve actual YouTube titles dynamically
      const resolved = await Promise.all(
        uniqueInitial.map(async (proj) => {
          if (proj.videoUrl) {
            const ytTitle = await fetchYouTubeTitle(proj.videoUrl);
            if (ytTitle) {
              return { ...proj, title: ytTitle };
            }
          }
          return proj;
        })
      );

      // Perform a final deduplication pass in case resolved YouTube titles are now duplicates of each other
      const finalSeenTitles = new Set<string>();
      const finalSeenIds = new Set<string>();
      const finalUnique = resolved.filter(p => {
        const ytId = getYouTubeId(p.videoUrl);
        const titleNormalized = p.title.trim().toLowerCase();
        if (ytId) {
          if (finalSeenIds.has(ytId)) return false;
          finalSeenIds.add(ytId);
        }
        if (finalSeenTitles.has(titleNormalized)) return false;
        finalSeenTitles.add(titleNormalized);
        return true;
      });

      if (isMounted) {
        setProjects(finalUnique);
      }
    };

    fetch('/videos.json')
      .then((res) => {
        if (!res.ok) throw new Error('No videos.json found');
        return res.json();
      })
      .then((dynamicVideos: Array<{ title: string; youtube: string }>) => {
        processAndSetProjects(dynamicVideos);
      })
      .catch((err) => {
        console.warn("Could not load dynamic videos, using static only:", err);
        processAndSetProjects([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter items matching active filter category
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  // Modal navigation handlers
  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedProjectIndex === null || filteredProjects.length <= 1) return;
    setSelectedProjectIndex((selectedProjectIndex + 1) % filteredProjects.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedProjectIndex === null || filteredProjects.length <= 1) return;
    setSelectedProjectIndex((selectedProjectIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedProjectIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectIndex, filteredProjects]);

  const activeProject = selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null;

  return (
    <section id="portfolio" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background radial soft light atmospheric bloom */}
      <div className="absolute bottom-1/4 left-1/10 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest mb-2">// CREATIVE WORK</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Interactive Portfolio</h2>
            <p className="text-gray-400 text-sm mt-3 max-w-lg">
              Explore my collection of graphic designs and high-fidelity video projects. Click any project card to launch a premium cinematic preview.
            </p>
            <div className="mt-4 h-1 w-16 bg-blue-500 rounded-full" />
          </div>

          {/* Filter Navigation Row */}
          <div className="flex flex-wrap gap-2 bg-gray-950/40 p-1.5 rounded-2xl border border-gray-800/25 max-w-full shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedProjectIndex(null); // Reset lightbox active item index
                }}
                className={`px-3.5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Filtering Grid */}
        <motion.div 
          layout
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isVideo = !!project.videoUrl;
              const isVertVideo = isVideo && isVerticalVideo(project.videoUrl);
              const isRegVideo = isVideo && !isVerticalVideo(project.videoUrl);
              const isPremiumVideo = isRegVideo || isVertVideo;

              return (
                <motion.div
                  key={project.id}
                  layout
                  data-cursor="play"
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.95 },
                    show: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { type: 'spring', stiffness: 100, damping: 20 }
                    }
                  }}
                  whileHover={{ scale: 1.025, y: -4 }}
                  onClick={() => setSelectedProjectIndex(index)}
                  onMouseEnter={() => {
                    if (isVideo) {
                      setHoveredProjectId(project.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isVideo) {
                      setHoveredProjectId(null);
                    }
                  }}
                  className="group relative aspect-[16/10] w-full bg-gray-950/60 backdrop-blur-md border border-white/15 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.45)] rounded-3xl overflow-hidden shadow-2xl cursor-pointer select-none transition-all duration-500"
                >
                  {/* Glowing background blur layer for premium cards */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />

                  {/* Thumbnail Cover (Zoom Effect on hover) */}
                  <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 brightness-112 contrast-108 group-hover:brightness-122"
                    />

                    {/* Hover Video Preview */}
                    {hoveredProjectId === project.id && isVideo && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
                      >
                        {getYouTubeId(project.videoUrl) ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(project.videoUrl)}?autoplay=1&mute=1&controls=0&loop=0&rel=0&playsinline=1&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
                            title={project.title}
                            className="w-full h-full absolute inset-0 border-0 pointer-events-none scale-[1.35] object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                          />
                        ) : (
                          <video
                            src={project.videoUrl}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-[1.05]"
                          />
                        )}
                      </motion.div>
                    )}

                    {/* Dark gradient vignette layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/25 to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-[6]" />
                  </div>

                  {/* Soft transparent overlay for premium video cards (fully sharp and clear) */}
                  {isPremiumVideo && (
                    <div className="absolute inset-0 bg-gray-950/15 z-10 transition-all duration-500 group-hover:bg-transparent" />
                  )}

                  {/* Large Center Play Button for premium video cards */}
                  {isPremiumVideo && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        {/* Pulse rings */}
                        <span className="absolute inline-flex h-16 w-16 rounded-full bg-blue-500/30 opacity-75 animate-ping" />
                        <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-500/15 opacity-50 animate-pulse" />
                        
                        {/* Center Button */}
                        <div className="relative h-14 w-14 rounded-full bg-blue-600/90 border border-white/20 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110 group-hover:bg-blue-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-500">
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Indicator Overlay for static images */}
                  {!isVideo && (
                    <div className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-gray-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 shadow-xl group-hover:scale-110 transition-all">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                  )}

                  {/* Hover Accent Glow */}
                  {!isPremiumVideo && (
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  )}

                  {/* Card Content (Anchored at Bottom) */}
                  <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end text-left transition-all duration-300 p-4 sm:p-5 bg-gradient-to-t from-gray-950 via-gray-950/85 to-transparent">
                    {/* Category Tag */}
                    <span className="inline-flex max-w-max px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-extrabold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors text-base sm:text-lg line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Description (Slides & Fades up on hover) */}
                    <p className="text-xs text-gray-400 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                      {project.description}
                    </p>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[9px] font-mono font-bold uppercase tracking-wider bg-gray-950/80 text-gray-400 border border-white/5 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* High precision luxury glass highlight border */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-3xl group-hover:border-blue-500/20 transition-all" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Videos Button */}
        <motion.div 
          className="flex justify-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.a
            href="https://www.youtube.com/@MdrifatulIslam3426/shorts"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-400 text-white font-extrabold text-xs tracking-widest uppercase px-8 py-4.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-500/20 active:scale-98 cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.04, y: -2 }}
          >
            {/* Glossy light effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Youtube className="h-4.5 w-4.5 text-white" />
            <span>View All Videos</span>
            <ExternalLink className="h-3.5 w-3.5 text-red-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* 
        ========================================================================
        PREMIUM CINEMATIC LIGHTBOX / DETAIL MODAL
        ========================================================================
      */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProjectIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-950/95 backdrop-blur-xl select-none"
          >
            {/* Soft background light source */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none" />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-gray-900/60 border border-white/10 rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch lg:min-h-[580px]"
            >
              
              {/* Media Content Area (Left/Top) */}
              <div className="w-full lg:w-[58%] bg-black flex items-center justify-center relative overflow-hidden p-2 sm:p-4 min-h-[300px] xs:min-h-[380px] sm:min-h-[460px] lg:min-h-0">
                {activeProject.videoUrl ? (
                  isVerticalVideo(activeProject.videoUrl) ? (
                    /* 9:16 Responsive Vertical Video Player Frame */
                    <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative bg-gray-950">
                      {getYouTubeId(activeProject.videoUrl) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(activeProject.videoUrl)}
                          title={activeProject.title}
                          className="w-full h-full absolute inset-0 border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={activeProject.videoUrl}
                          controls
                          autoPlay
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    /* 16:9 Responsive Video Player Frame */
                    <div className="w-full max-w-[90%] lg:max-w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.25)] relative bg-gray-950">
                      {getYouTubeId(activeProject.videoUrl) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(activeProject.videoUrl, activeProject.id !== 'p10')}
                          title={activeProject.title}
                          className="w-full h-full absolute inset-0 border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={activeProject.videoUrl}
                          controls
                          autoPlay={activeProject.id !== 'p10'}
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )
                ) : (
                  /* Standard Image Display */
                  <div className="w-full h-full flex items-center justify-center max-h-[400px] sm:max-h-[500px] lg:max-h-none overflow-hidden">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[320px] sm:max-h-[440px] lg:max-h-[540px] object-contain rounded-2xl border border-white/5"
                    />
                  </div>
                )}

                {/* Left/Right floating preview buttons on media window for desktop */}
                {filteredProjects.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-950/80 backdrop-blur-md border border-white/10 hover:border-blue-500/50 hover:text-blue-400 text-white flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                      title="Previous Project"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-950/80 backdrop-blur-md border border-white/10 hover:border-blue-500/50 hover:text-blue-400 text-white flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
                      title="Next Project"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Text & Meta Information Panel (Right/Bottom) */}
              <div className="w-full lg:w-[42%] bg-gray-950/40 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 text-left relative">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProjectIndex(null)}
                  className="absolute top-6 right-6 h-10 w-10 rounded-full bg-gray-900 border border-white/10 hover:border-red-500/50 text-gray-400 hover:text-red-400 flex items-center justify-center transition-all duration-300 hover:rotate-90 shadow-lg cursor-pointer z-20"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Primary Meta Content Block */}
                <div className="pr-10 lg:pr-4">
                  {/* Category Eyebrow badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
                    {activeProject.videoUrl ? <Film className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                    <span>{activeProject.category}</span>
                  </span>

                  {/* Heading Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug mb-4">
                    {activeProject.title}
                  </h3>

                  {/* Detailed Description paragraph */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-medium">
                    {activeProject.description}
                  </p>

                  {/* Software Used (requested) */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest mb-3">Software Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {getSoftwareUsed(activeProject).map((software, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] sm:text-xs font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-xl shadow-sm hover:border-blue-500/40 hover:text-white transition-colors"
                        >
                          {software}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Custom Tags Section */}
                  <div className="mb-8">
                    <h4 className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest mb-3">Core Assets & Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] sm:text-xs font-mono bg-gray-900 border border-white/5 text-gray-300 px-3 py-1 rounded-xl shadow-sm hover:border-blue-500/20 hover:text-white transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Call-to-actions */}
                <div className="flex flex-wrap gap-3.5 pt-6 border-t border-white/10 mt-6 shrink-0">
                  <a
                    href={activeProject.behanceUrl || activeProject.liveUrl || "https://behance.net/mdrifatulriad"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/15 cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Full Project
                  </a>
                  {activeProject.liveUrl && activeProject.behanceUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-gray-300 bg-gray-900/90 hover:bg-gray-800 border border-white/10 py-3.5 rounded-xl transition-all hover:text-white hover:scale-[1.02] cursor-pointer"
                    >
                      <Globe className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
