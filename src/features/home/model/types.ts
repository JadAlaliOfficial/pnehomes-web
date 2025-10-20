export interface SocialMediaItem {
  icon: string;
  url: string;
}

export interface HomeLayout {
  "header-logo": string;
  "header-nav": string[];
  "header-button": string;
  "header-phone": number;
  "footer-nav": string[];
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