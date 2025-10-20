export interface ButtonLink {
  title: string;
  slug: string;
}

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
  slug: string;
  cover: string;
}

export interface Links {
  video: string;
  links: LinkItem[];
}

export interface Testimonial {
  description: string;
  by: string;
}

export interface Contact {
  title: string;
  slug: string;
}

export interface HomeContent {
  video: string;
  logo: string;
  title: string;
  subtitle: string;
  "book-button": ButtonLink;
  hero: Hero;
  services: Services;
  links: Links;
  testimonials: Testimonial[];
  contact: Contact;
}