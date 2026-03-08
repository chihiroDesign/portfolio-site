export interface Project {
  id: string;
  title: string;
  category: string | string[];
  description: string;
  thumbnail: string;
  images?: string[];
  videoUrl?: string;
  tags?: string[];
  year?: number;
  client?: string;
  tools?: string[];
  order?: number;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  socialLinks: SocialLink[];
  skills: string[];
  awards: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}
