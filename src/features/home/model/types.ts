export interface NavigationItem {
  title: string;
  slug: string;
}

export interface SocialMediaItem {
  icon: string;
  url: string;
}

export interface HomeLayout {
  "header-logo": string;
  "header-nav": NavigationItem[];
  "header-button": string;
  "header-phone": number;
  "footer-nav": NavigationItem[];
  "footer-phone": number;
  "footer-social": SocialMediaItem[];
}

export type SocialMediaIcon = 
  | "facebook"
  | "youtube" 
  | "x"
  | "linkedIn"
  | "instagram"
  | "tiktok"
  | "pinterest"
  | "zillow";