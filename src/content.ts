import { Skill, Service, Project, TimelineItem, Testimonial, BlogArticle } from './types';
import { profile } from './profile';

/**
 * ============================================================================
 *               MOHAMMAD RIFAT - ADMIN PORTFOLIO CONTENT ENGINE
 * ============================================================================
 * 
 * This file serves as the administrative content file for the entire portfolio.
 * You can edit all text, numbers, links, list items, services, projects, and images
 * here, and the changes will automatically apply across all sections of the website.
 * 
 * TIPS FOR ASSET REPLACEMENT:
 * -----------------------------
 * 1. IMAGES: Place new images in the `/src/assets/images/` or `/public/assets/images/`
 *    directories, and update the paths below.
 * 2. VIDEOS: Place video background files inside `/public/assets/videos/` and link them here.
 * 3. SOCIALS & CONTACT: Modify the values under the `PERSONAL_INFO` object.
 * ============================================================================
 */

export const PERSONAL_INFO = {
  // General Information
  name: profile.name,
  title: profile.title,
  
  // Professions used for the animated typing effects
  professions: profile.title.split('|').map(s => s.trim()),
  
  // Biography & Introductions
  intro: profile.about,
  
  // CV / Resume PDF Link
  cvUrl: "#", // Replace with actual Google Drive/Dropbox CV link or local path (e.g. '/assets/MOHAMMAD_RIFAT_CV.pdf')
  
  // Main Profile Portrait Image
  avatar: profile.photo,
  
  // Contact Info
  email: profile.email,
  phone: profile.phone,
  whatsapp: `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`,
  location: profile.location,
  
  // Social Media Links (Ensure they match your profile handles)
  socials: {
    behance: "https://behance.net/mdrifatulriad",
    whatsapp: `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`,
    facebook: "https://www.facebook.com/md.rifatulislamriad.3",
    instagram: "https://instagram.com/mdrifatulriad",
    youtube: "https://www.youtube.com/@MdrifatulIslam3426/shorts"
  }
};

/**
 * Animated Counter Stats Section (Shown on About / Statistics layout)
 */
export const STATISTICS = [
  { value: 20, label: "Projects Completed", suffix: "+" },
  { value: 3, label: "Experience", suffix: " Months+" }
];

/**
 * Professional Skills & Proficiency Levels (0 to 100)
 */
export const SKILLS: Skill[] = profile.skills.map((skillName) => {
  let level = 90;
  let category: 'Adobe' | 'Design' | 'Video' | 'Marketing' | 'Tech' = 'Tech';
  
  if (skillName === "Graphic Design") {
    level = 98;
    category = "Design";
  } else if (skillName === "Video Editing") {
    level = 95;
    category = "Video";
  } else if (skillName === "Meta Marketing") {
    level = 90;
    category = "Marketing";
  } else if (skillName === "Generative AI Tools") {
    level = 95;
    category = "Tech";
  } else if (skillName === "Microsoft Word") {
    level = 95;
    category = "Tech";
  } else if (skillName === "Microsoft Excel") {
    level = 92;
    category = "Tech";
  }

  return {
    name: skillName,
    level,
    category
  };
});

/**
 * Creative Services Offered
 */
export const SERVICES: Service[] = [
  {
    id: "s1",
    title: "Graphic Design",
    description: "Creating premium digital art, visual branding, custom YouTube thumbnails, and high-impact layouts designed to maximize visual appeal.",
    iconName: "Palette",
    features: ["Custom illustrations", "High-CTR Thumbnails", "Layout compositions", "Print-ready design systems"]
  },
  {
    id: "s2",
    title: "Video Editing",
    description: "High-end post-production, seamless motion integration, dynamic text animations, and professional color grading for videos.",
    iconName: "Video",
    features: ["Short-form content optimization", "Cinematic transitions", "Sound design & mastering", "Precise speed ramping"]
  },
  {
    id: "s4",
    title: "Meta Marketing",
    description: "Advanced social media advertising strategies tailored to scale reach, boost conversion ratios, and maximize campaign ROI across Facebook and Instagram.",
    iconName: "Infinity",
    features: ["Meta Ads optimization", "High-converting ad copies", "Retargeting frameworks", "Pixel configuration"]
  },
  {
    id: "s5",
    title: "Generative AI Tools",
    description: "Integrating powerful Generative AI models into production cycles to create assets, speed up draft reviews, and generate novel visual resources.",
    iconName: "Bot",
    features: ["Smart asset prompting", "Automated production pipelines", "Creative AI integrations", "Dynamic workflow scaling"]
  },
  {
    id: "ms-word",
    title: "Microsoft Word",
    description: "Designing polished, professionally formatted corporate templates, high-tier reports, clean documentation layouts, and interactive PDF forms.",
    iconName: "FileText",
    features: ["Custom document layouts", "Advanced style systems", "Automated dynamic fields", "Interactive digital forms"]
  },
  {
    id: "ms-excel",
    title: "Microsoft Excel",
    description: "Developing complex spreadsheets, data visualization models, advanced formulas, financial dashboards, and automated macro workflows.",
    iconName: "FileSpreadsheet",
    features: ["Advanced formula design", "Automated data sheets", "Interactive dashboards", "Pivot-table configurations"]
  }
];

/**
 * Filterable Portfolio Projects Grid
 * Supported Categories: 'Branding' | 'Thumbnail' | 'Poster' | 'Social Media' | 'Motion Graphics' | 'Video' | 'Graphic Design' | 'Video Editing' | 'Thumbnails'
 */
export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "p10",
    title: "ZAYEN Perfume | Luxury AI Commercial ✨ Long Lasting Fragrance | Cinematic Product Ad",
    category: "Video Editing",
    image: "https://img.youtube.com/vi/9_MiaDuYy2A/maxresdefault.jpg",
    description: "A premium cinematic showcase highlighting master-level pacing, dynamic transitions, precise speed ramping, and professional-grade color correction.",
    tags: ["Video Editing", "Cinematic", "Color Grading", "Transitions"],
    videoUrl: "https://youtu.be/9_MiaDuYy2A",
    behanceUrl: "https://behance.net/mdrifatulriad"
  },
  {
    id: "p11",
    title: "ZAYEN Perfume – Essence of Elegance | AI Generated Luxury Perfume Commercial",
    category: "Video Editing",
    image: "https://img.youtube.com/vi/ItoJWiWk3wk/maxresdefault.jpg",
    description: "A high-impact cinematic short demonstrating seamless vertical transitions, kinetic timing, and advanced sound design techniques.",
    tags: ["Transitions", "Vertical Video", "VFX", "Sound Design"],
    videoUrl: "https://youtube.com/shorts/ItoJWiWk3wk?feature=share",
    behanceUrl: "https://behance.net/mdrifatulriad"
  },
  {
    id: "p12",
    title: "Motion Graphics",
    category: "Motion Graphics",
    image: "https://img.youtube.com/vi/0wzNH5JYnKQ/maxresdefault.jpg",
    description: "An intensive vertical design project integrating heavy motion graphics, syncopated kinetic typography, and fluid high-speed VFX transitions.",
    tags: ["Motion Graphics", "Kinetic Typo", "VFX", "Sound Sync"],
    videoUrl: "https://youtube.com/shorts/0wzNH5JYnKQ?feature=share",
    behanceUrl: "https://behance.net/mdrifatulriad"
  },
  {
    id: "p15",
    title: "ডিগ্রি নয়, দক্ষতাই আপনাকে এগিয়ে নেবে!",
    category: "Video Editing",
    image: "https://img.youtube.com/vi/AaDE5QxflLs/maxresdefault.jpg",
    description: "A professional-grade cinematic visual showcase featuring advanced luminescent grading, sound space dynamics, and dynamic frame pacing.",
    tags: ["Video Editing", "Color Grading", "Cinematic", "Pacing"],
    videoUrl: "https://youtu.be/AaDE5QxflLs",
    behanceUrl: "https://behance.net/mdrifatulriad"
  }
];

/**
 * Professional Career & Education Milestones (Vertical Timeline layout)
 */
const workTimeline: TimelineItem[] = [
  {
    id: "t1",
    role: "Senior Graphic Designer & Video Editor",
    company: "Freelance / Remote Services",
    period: "2023 - Present",
    description: "Delivering high-end graphic designs, custom brand identities, and high-impact cinematic video edits for clients worldwide. Specialized in converting engagement into business value through professional visual assets.",
    type: "work"
  },
  {
    id: "t2",
    role: "Motion Graphics Designer & Digital Marketer",
    company: "Creative Studio Group",
    period: "2021 - 2023",
    description: "Engineered bespoke promotional ads, brand identity guidelines, and engaging motion videos. Developed digital marketing blueprints and customized asset systems that scaled organic click rates.",
    type: "work"
  },
  {
    id: "t3",
    role: "Graphic Designer",
    company: "Digital Arts Agency",
    period: "2019 - 2021",
    description: "Created professional vector assets, social media ad layout grids, YouTube thumbnails, and high-conversion collateral layouts.",
    type: "work"
  }
];

const educationTimeline: TimelineItem[] = profile.education.map((edu, idx) => ({
  id: `edu-${idx}`,
  role: `${edu.degree} (Result: ${edu.result})`,
  company: edu.institute,
  period: edu.year,
  description: `Pursued academic excellence at ${edu.institute}, achieving an outstanding grade score of "${edu.result}". Specializing in structured creative sciences and media operations.`,
  type: 'education' as const
}));

export const TIMELINE_ITEMS: TimelineItem[] = [...workTimeline, ...educationTimeline];

/**
 * Professional Client Testimonials (Auto Slider)
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test1",
    name: "Tahmid Hasan",
    role: "Marketing Manager",
    company: "Apex Media",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "MOHAMMAD RIFAT is incredible! He edited our product commercial and added stunning motion graphics that exceeded our expectations. Our click-through rates shot up immediately. A true visionary designer.",
    rating: 5
  },
  {
    id: "test2",
    name: "Jessica Turner",
    role: "Creative Director",
    company: "Zenith Brands",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: "Our brand guidelines needed a major overhaul, and Rifat delivered an elegant, high-end design system that defines premium luxury. Highly communicative and incredibly creative.",
    rating: 5
  },
  {
    id: "test3",
    name: "Al-Amin Hossain",
    role: "Founder & YouTuber",
    company: "TechPulse Channel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    text: "Rifat is our go-to designer for high-stakes thumbnails and promo video cuts. He understands visual hook geometry and knows exactly how to capture an audience in a split second.",
    rating: 5
  }
];

/**
 * Editorial Blog Articles (Cards)
 */
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "b1",
    title: "The Perfect Video Edit: Timing, Easing, and Emotional Impact",
    category: "Video Editing",
    date: "July 24, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
    snippet: "Uncover how to synchronize sound cues with color grading and dynamic cuts to construct stories that grab and sustain user engagement."
  },
  {
    id: "b2",
    title: "Crafting High-Converting YouTube Thumbnails in Photoshop",
    category: "Graphic Design",
    date: "June 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    snippet: "Analyzing color contrast, depth layer masks, facial saturation adjustments, and bold text layouts that drive optimal click-through rates."
  },
  {
    id: "b3",
    title: "Sleek Kinetic Typography: Elevating Motion Design in After Effects",
    category: "Motion Graphics",
    date: "May 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
    snippet: "Learn how to use keyframe charts, expression elasticities, and camera tracking to produce professional text animations."
  }
];
