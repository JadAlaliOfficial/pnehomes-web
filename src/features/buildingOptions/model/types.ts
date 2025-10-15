export interface BuildingOption {
  id: number;
  go_to: string;
  title: string;
  description: string;
  section_img: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  img: string;
  content: string;
}

export interface BuildingOptionsData {
  slogan: string;
  title: string;
  options: BuildingOption[];
  articles: Article[];
}