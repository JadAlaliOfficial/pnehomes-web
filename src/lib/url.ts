/**
 * URL Parameter Utility Functions
 *
 * This module provides utility functions for safely handling and converting
 * URL parameters and query string values to appropriate data types.
 *
 * These utilities are particularly useful when working with Next.js router
 * query parameters, which can be strings, arrays, or undefined.
 */

// src/lib/url.ts

/**
 * Safely converts an unknown value to a number
 *
 * This function handles the common case of converting URL parameters
 * (which are always strings) to numbers while gracefully handling
 * invalid or missing values.
 *
 * @param v - The value to convert (typically from URL params or query strings)
 * @returns The numeric value if conversion is successful, undefined otherwise
 *
 * @example
 * // URL: /properties?page=2&limit=10&invalid=abc
 * const page = toNum(router.query.page)     // Returns: 2
 * const limit = toNum(router.query.limit)   // Returns: 10
 * const invalid = toNum(router.query.invalid) // Returns: undefined
 * const missing = toNum(router.query.missing) // Returns: undefined
 *
 * @example
 * // Safe usage with fallback values
 * const page = toNum(router.query.page) ?? 1
 * const limit = toNum(router.query.limit) ?? 9
 */
export function toNum(v: unknown) {
  // Handle null and undefined values
  if (v == null) return undefined

  // Attempt to convert to number
  const n = Number(v)

  // Return the number only if it's a valid finite number
  // This excludes NaN, Infinity, and -Infinity
  return Number.isFinite(n) ? n : undefined
}
