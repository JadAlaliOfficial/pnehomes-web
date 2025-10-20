export interface HeroSection {
  icon: string;
  title: string;
  description: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  sections: HeroSection[];
}

export interface ServiceLink {
  title: string;
  slug: string;
}

export interface Services {
  title: string;
  description: string;
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
  logo: string;
  title: string;
  subtitle: string;
  "book-button": string;
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