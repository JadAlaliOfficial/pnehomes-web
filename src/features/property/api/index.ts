/**
 * Property API Entry Point (HTTP-backed)
 *
 * Switches the repository from file-based to HTTP-based.
 * If you later move to a different data source (e.g., a CMS SDK),
 * you can point this export to another repository module.
 */

export * from './http.repository'
