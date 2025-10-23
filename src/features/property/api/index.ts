/**
 * Property API Entry Point
 *
 * This module serves as the main entry point for all property-related API functions.
 * It implements a repository pattern that allows for easy switching between different
 * data sources without affecting the consuming code.
 *
 * Current Implementation: File-based repository using JSON data
 * Future Implementation: HTTP-based repository connecting to a CMS
 *
 * Migration Strategy:
 * When ready to switch to a CMS, simply change the export statement below
 * from "./file.repository" to "./http.repository" and all consuming code
 * will automatically use the new data source.
 */

// src/features/property/api/index.ts

// Current: Export file-based repository functions for development/testing
// Later, switch to CMS by changing this export to: export * from "./http.repository"
export * from './file.repository'
