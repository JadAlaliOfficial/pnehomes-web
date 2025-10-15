/**
 * Property File Repository
 * 
 * This module provides data access functions for property data stored in a JSON file.
 * It serves as the data layer abstraction that can be easily swapped with a CMS-based
 * repository in the future without changing the consuming code.
 */

// src/features/property/api/file.repository.ts
import raw from "../mock/properties.json" 
import { z } from "zod"
import { PropertySchema, type Property } from "../model/types"
import { applyFiltersAndSort, getTotalCount, type ListParams } from "../model/selectors"

/**
 * Parsed and validated property data from the JSON file
 * Uses Zod schema validation to ensure data integrity at runtime
 */
const Properties = z.array(PropertySchema).parse(raw)

/**
 * Retrieves a filtered, sorted, and paginated list of properties
 * 
 * @param params - Optional filtering, sorting, and pagination parameters
 * @returns Promise resolving to an array of Property objects matching the criteria
 * 
 * @example
 * // Get first 9 properties sorted by price (descending)
 * const properties = await list({ sortBy: 'price', sortOrder: 'desc', limit: 9 })
 * 
 * // Get properties in a specific community with minimum 3 bedrooms
 * const filtered = await list({ community: 'Downtown', beds: 3 })
 */
export async function list(params: ListParams = {}): Promise<Property[]> {
  return applyFiltersAndSort(Properties, params)
}

/**
 * Gets the total count of properties that match the given filter criteria
 * This is useful for pagination calculations and displaying result counts
 * 
 * @param params - Optional filtering parameters (same as list function)
 * @returns Promise resolving to the total number of properties matching the filters
 * 
 * @example
 * // Get total count of available properties under $500k
 * const count = await getTotalFilteredCount({ status: 'available', max: 500000 })
 */
export async function getTotalFilteredCount(params: ListParams = {}): Promise<number> {
  return getTotalCount(Properties, params)
}

/**
 * Retrieves a single property by its unique slug identifier
 * 
 * @param slug - The unique slug identifier for the property
 * @returns Promise resolving to the Property object if found, undefined otherwise
 * 
 * @example
 * // Get a specific property by slug
 * const property = await getBySlug('luxury-downtown-condo-123')
 */
export async function getBySlug(slug: string): Promise<Property | undefined> {
  return Properties.find(p => p.slug === slug)
}

/**
 * Retrieves all property slugs for generating static routes or sitemaps
 * Useful for Next.js static generation and SEO purposes
 * 
 * @returns Promise resolving to an array of all property slug strings
 * 
 * @example
 * // Generate static paths for all properties
 * const slugs = await allSlugs()
 * const paths = slugs.map(slug => ({ params: { slug } }))
 */
export async function allSlugs(): Promise<string[]> {
  return Properties.map(p => p.slug)
}

// Re-export the ListParams type for external consumption
export type { ListParams } from "../model/selectors"
