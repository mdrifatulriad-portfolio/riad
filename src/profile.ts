import avatarImg from './assets/images/regenerated_image_1785308381313.png';

export interface EducationItem {
  year: string;
  degree: string;
  institute: string;
  result: string;
}

export interface Profile {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  photo: string;
  about: string;
  education: EducationItem[];
  skills: string[];
  languages: string[];
}

export const profile: Profile = {
  name: "MOHAMMAD RIFAT",
  title: "Graphic Designer | Video Editor | Motion Graphics Designer | Digital Marketer",
  phone: "+8801700814379",
  email: "mdrifatulriad@gmail.com",
  location: "Salgaon, Sadar, Brahmanbaria, Bangladesh",
  photo: avatarImg,
  about: "Creative and dedicated Graphic Designer & Video Editor with a passion for visual storytelling and modern design.",
  education: [
    {
      year: "2026",
      degree: "Dowra Hadith (Completed)",
      institute: "Jamia Islamia Younusia, Brahmanbaria",
      result: "A"
    },
    {
      year: "2026",
      degree: "Alim",
      institute: "Jamia Islamia Younusia, Brahmanbaria",
      result: "A"
    },
    {
      year: "2025",
      degree: "Dakhil (SSC Equivalent)",
      institute: "Jamia Islamia Younusia, Brahmanbaria",
      result: "A"
    }
  ],
  skills: [
    "Graphic Design",
    "Video Editing",
    "Meta Marketing",
    "Generative AI Tools",
    "Microsoft Word",
    "Microsoft Excel"
  ],
  languages: [
    "Bangla",
    "English"
  ]
};
