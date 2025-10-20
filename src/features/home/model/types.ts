export interface SocialMediaItem {
  icon: string;
  url: string;
}

export interface HomeLayout {
  "header-logo": string;
  "header-nav": string[];
  "header-button": string | null;
  "header-phone": number | null;
  "footer-nav": string[];
  "footer-phone": number | null;
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