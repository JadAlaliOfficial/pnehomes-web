export interface BuildingOption {
  id: number
  title: string
  description?: string | null
  section_img: string
}

export interface Article {
  id: number
  slug: string
  title: string
  description?: string | null
  img: string
  content: string
}

export interface ArticlesSection {
  cover?: string | null
  articles: Article[]
}

export interface BuildingOptionsData {
  cover: string
  slogan: string
  title: string
  options: BuildingOption[]
  articles: ArticlesSection
}
