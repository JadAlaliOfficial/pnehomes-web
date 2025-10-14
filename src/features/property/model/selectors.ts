// src/features/property/model/selectors.ts

import type { Property } from "./types"

export type ListParams = {
  beds?: number
  baths?: number
  min?: number
  max?: number
  sort?: "newest" | "priceAsc" | "priceDesc" | "sqftDesc"
  city?: string
  status?: "available" | "sold" | "comingSoon"
}

export function applyFiltersAndSort(items: Property[], params: ListParams = {}) {
  let out = [...items]

  if (params.status) out = out.filter(p => p.status === params.status)
  if (params.city) out = out.filter(p => p.city === params.city)
  if (params.beds) out = out.filter(p => p.beds >= params.beds!)
  if (params.baths) out = out.filter(p => p.baths >= params.baths!)
  if (params.min) out = out.filter(p => (p.price ?? 0) >= params.min!)
  if (params.max) out = out.filter(p => (p.price ?? Infinity) <= params.max!)

  switch (params.sort) {
    case "priceAsc":  out.sort((a,b)=>(a.price ?? 0)-(b.price ?? 0)); break
    case "priceDesc": out.sort((a,b)=>(b.price ?? 0)-(a.price ?? 0)); break
    case "sqftDesc":  out.sort((a,b)=> b.sqft - a.sqft); break
    default:
      out.sort(
        (a,b) =>
          new Date(b.publishedAt ?? 0).getTime() -
          new Date(a.publishedAt ?? 0).getTime()
      )
  }

  return out
}
