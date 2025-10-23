import { BuildingOptionsData, Article } from '../model/types'
import buildingOptionsData from '../mock/buildingOptions.json'

export class BuildingOptionsFileRepository {
  /**
   * Get all building options data
   * @returns Promise<BuildingOptionsData>
   */
  async getBuildingOptions(): Promise<BuildingOptionsData> {
    // Simulate async operation (in case you want to add delay or error handling later)
    return Promise.resolve(buildingOptionsData as BuildingOptionsData)
  }

  /**
   * Get building options synchronously
   * @returns BuildingOptionsData
   */
  getBuildingOptionsSync(): BuildingOptionsData {
    return buildingOptionsData as BuildingOptionsData
  }

  /**
   * Get all articles
   * @returns Promise<Article[]>
   */
  async getArticles(): Promise<Article[]> {
    const data = buildingOptionsData as BuildingOptionsData
    return Promise.resolve(data.articles.articles)
  }

  /**
   * Get articles synchronously
   * @returns Article[]
   */
  getArticlesSync(): Article[] {
    const data = buildingOptionsData as BuildingOptionsData
    return data.articles.articles
  }

  /**
   * Get article by slug
   * @param slug - The article slug
   * @returns Promise<Article | undefined>
   */
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const data = buildingOptionsData as BuildingOptionsData
    return Promise.resolve(data.articles.articles.find(article => article.slug === slug))
  }

  /**
   * Get article by slug synchronously
   * @param slug - The article slug
   * @returns Article | undefined
   */
  getArticleBySlugSync(slug: string): Article | undefined {
    const data = buildingOptionsData as BuildingOptionsData
    return data.articles.articles.find(article => article.slug === slug)
  }
}
