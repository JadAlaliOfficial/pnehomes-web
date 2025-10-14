// src/features/property/model/selectors.ts

import type { Property } from "./types"

export type ListParams = {
  beds?: number
  baths?: number
  min?: number
  max?: number
  sort?: "newest" | "priceAsc" | "priceDesc" | "sqftDesc"
  status?: "available" | "sold" | "comingSoon" | "Now selling"
}

export function applyFiltersAndSort(items: Property[], params: ListParams = {}) {
  let out = [...items]

  if (params.status) out = out.filter(p => p.status === params.status)
  if (params.beds) out = out.filter(p => parseInt(p.beds) >= params.beds!)
  if (params.baths) out = out.filter(p => parseFloat(p.baths) >= params.baths!)
  if (params.min) out = out.filter(p => parseInt(p.price) >= params.min!)
  if (params.max) out = out.filter(p => parseInt(p.price) <= params.max!)

  switch (params.sort) {
    case "priceAsc":  out.sort((a,b)=> parseInt(a.price) - parseInt(b.price)); break
    case "priceDesc": out.sort((a,b)=> parseInt(b.price) - parseInt(a.price)); break
    case "sqftDesc":  out.sort((a,b)=> parseInt(b.sqft) - parseInt(a.sqft)); break
    default:
      // Default sort by id since publishedAt is no longer available
      out.sort((a,b) => b.id - a.id)
  }

  return out
}
