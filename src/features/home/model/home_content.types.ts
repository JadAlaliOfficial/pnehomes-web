export interface HeroSection {
  icon: string;
  title: string;
  description: string | null;
}

export interface Hero {
  title: string;
  subtitle: string | null;
  sections: HeroSection[];
}

export interface ServiceLink {
  title: string;
  slug: string;
}

export interface Services {
  title: string;
  cover: string;
  description: string | null;
  links: ServiceLink[];
}

export interface LinkItem {
  title: string;
  cover: string;
}

export interface GridSection {
  video: string;
  logo: string;
  links: LinkItem[];
}

export interface FirstSection {
  video: string;
  "cover-for-mobile": string;
  logo: string;
  title: string;
  subtitle: string | null;
  "book-button": string | null;
}

export interface Testimonial {
  description: string;
  by: string;
}

export interface HomeContent {
  "first-section": FirstSection;
  hero: Hero;
  services: Services;
  "grid-section": GridSection;
  testimonials: Testimonial[];
  contact: string;
}