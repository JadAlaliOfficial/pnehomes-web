export interface BuildingOption {
  id: number;
  go_to: string;
  title: string;
  description: string;
  section_img: string;
}

export interface BuildingOptionsData {
  slogan: string;
  title: string;
  options: BuildingOption[];
}