export type ProjectCategory = 'Branding' | 'Thumbnail' | 'Poster' | 'Social Media' | 'Motion Graphics' | 'Video' | 'Graphic Design' | 'Video Editing' | 'Thumbnails';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  behanceUrl?: string;
  videoUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Design' | 'Video' | 'Marketing' | 'Tech' | 'Adobe';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name
  features: string[];
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number; // 1 to 5
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
}
