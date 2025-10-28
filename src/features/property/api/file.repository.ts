/**
 * Property File Repository
 *
 * This module provides data access functions for property data stored in a JSON file.
 * It serves as the data layer abstraction that can be easily swapped with a CMS-based
 * repository in the future without changing the consuming code.
 */

// src/features/property/api/file.repository.ts
import raw from '../mock/properties.json'
import { z } from 'zod'
import { PropertySchema, type Property, type Contact, type PropertyData } from '../model/types'
import {
  applyFiltersAndSort,
  getTotalCount,
  getUniqueCommunities,
  type ListParams,
} from '../model/selectors'

/**
 * Parsed and validated property data from the JSON file
 * Uses Zod schema validation to ensure data integrity at runtime
 */
const PropertyDataSchema = z.object({
  title: z.string(),
  cover: z.string(),
  properties: z.array(PropertySchema),
  contact: z.object({
    title: z.string(),
    message: z.string(),
  }),
})

const PropertyDataParsed = PropertyDataSchema.parse(raw)
const Properties = PropertyDataParsed.properties

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
 * const count = await getTotalFilteredCount({ max: 500000 })
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

/**
 * Gets all unique communities from the properties for dropdown filtering
 *
 * @returns Promise resolving to an array of unique community names, sorted alphabetically
 *
 * @example
 * // Get all available communities for filter dropdown
 * const communities = await getCommunities()
 */
export async function getCommunities(): Promise<string[]> {
  return getUniqueCommunities(Properties)
}

/**
 * Gets the cover image URL for the floor plans page
 *
 * @returns Promise resolving to the cover image URL string
 *
 * @example
 * // Get the cover image for the floor plans page
 * const coverImage = await getCoverImage()
 */
export async function getCoverImage(): Promise<string> {
  return PropertyDataParsed.cover
}

/**
 * Gets the page title for the floor plans page
 *
 * @returns Promise resolving to the page title string
 *
 * @example
 * // Get the page title for the floor plans page
 * const title = await getPageTitle()
 */
export async function getPageTitle(): Promise<string> {
  return PropertyDataParsed.title
}

/**
 * Gets the contact information including title and message template
 *
 * @returns Promise resolving to the Contact object with title and message
 *
 * @example
 * // Get contact information
 * const contact = await getContactInfo()
 * const message = contact.message.replace('{propertyTitle}', 'Sample Property')
 */
export async function getContactInfo(): Promise<Contact> {
  return PropertyDataParsed.contact
}

// Re-export the ListParams type for external consumption
export type { ListParams } from '../model/selectors'
