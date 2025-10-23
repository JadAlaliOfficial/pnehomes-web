import { BuildingOptionsFileRepository } from './file.repository'
import { BuildingOptionsData, BuildingOption, Article, ArticlesSection } from '../model/types'

// Create a singleton instance of the repository
const buildingOptionsRepository = new BuildingOptionsFileRepository()

/**
 * Get all building options data
 * @returns Promise<BuildingOptionsData>
 */
export const getBuildingOptions = async (): Promise<BuildingOptionsData> => {
  return buildingOptionsRepository.getBuildingOptions()
}

/**
 * Get building options synchronously
 * @returns BuildingOptionsData
 */
export const getBuildingOptionsSync = (): BuildingOptionsData => {
  return buildingOptionsRepository.getBuildingOptionsSync()
}

/**
 * Get all articles
 * @returns Promise<Article[]>
 */
export const getArticles = async (): Promise<Article[]> => {
  return buildingOptionsRepository.getArticles()
}

/**
 * Get articles synchronously
 * @returns Article[]
 */
export const getArticlesSync = (): Article[] => {
  return buildingOptionsRepository.getArticlesSync()
}

/**
 * Get article by slug
 * @param slug - The article slug
 * @returns Promise<Article | undefined>
 */
export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  return buildingOptionsRepository.getArticleBySlug(slug)
}

/**
 * Get article by slug synchronously
 * @param slug - The article slug
 * @returns Article | undefined
 */
export const getArticleBySlugSync = (slug: string): Article | undefined => {
  return buildingOptionsRepository.getArticleBySlugSync(slug)
}

// Export types for convenience
export type { BuildingOptionsData, BuildingOption, Article, ArticlesSection }

// Export repository class for advanced usage
export { BuildingOptionsFileRepository }
