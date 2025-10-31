/**
 * CSS Class Utility Functions
 *
 * This module provides utility functions for working with CSS classes,
 * particularly for combining and merging Tailwind CSS classes efficiently.
 *
 * The main function `cn` combines the power of clsx for conditional classes
 * and tailwind-merge for resolving conflicting Tailwind utilities.
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges CSS class names with Tailwind CSS conflict resolution
 *
 * This utility function combines multiple class values and intelligently
 * merges conflicting Tailwind CSS classes, ensuring the last conflicting
 * class takes precedence.
 *
 * Features:
 * - Handles conditional classes (via clsx)
 * - Resolves Tailwind CSS conflicts (via tailwind-merge)
 * - Supports strings, objects, arrays, and conditional expressions
 * - Removes duplicate classes
 * - Optimizes the final class string
 *
 * @param inputs - Variable number of class values to combine
 * @returns A single optimized class string
 *
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500', 'text-white')
 * // Returns: "px-4 py-2 bg-blue-500 text-white"
 *
 * @example
 * // Conditional classes
 * cn('btn', {
 *   'btn-primary': isPrimary,
 *   'btn-disabled': isDisabled
 * })
 *
 * @example
 * // Tailwind conflict resolution
 * cn('px-4 px-6', 'py-2 py-4')
 * // Returns: "px-6 py-4" (later classes override earlier ones)
 *
 * @example
 * // Complex component styling
 * cn(
 *   'base-button-styles',
 *   variant === 'primary' && 'bg-blue-500 hover:bg-blue-600',
 *   variant === 'secondary' && 'bg-gray-500 hover:bg-gray-600',
 *   size === 'sm' && 'px-3 py-1 text-sm',
 *   size === 'lg' && 'px-6 py-3 text-lg',
 *   disabled && 'opacity-50 cursor-not-allowed',
 *   className // Allow external class overrides
 * )
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Replaces placeholders in a message template with actual values
 *
 * This utility function replaces common placeholders like {title}, {community},
 * {name}, etc. with their corresponding values from the provided data object.
 *
 * @param template - The message template containing placeholders
 * @param data - Object containing the replacement values
 * @returns The message with placeholders replaced
 *
 * @example
 * replacePlaceholders(
 *   "I'm interested in {community} community",
 *   { community: "Beulah Park" }
 * )
 * // Returns: "I'm interested in Beulah Park community"
 *
 * @example
 * replacePlaceholders(
 *   "Contact me about {title} in {community}",
 *   { title: "Modern Home", community: "Edgewater" }
 * )
 * // Returns: "Contact me about Modern Home in Edgewater"
 */
export function replacePlaceholders(
  template: string,
  data: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key]?.toString() || match
  })
}
