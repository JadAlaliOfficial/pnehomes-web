// src/features/property/model/selectors.ts

import type { Property } from "./types"

export type ListParams = {
  community?: string
  price?: number
  beds?: number
  baths?: number
  garages?: number
  min?: number
  max?: number
  status?: "available" | "sold" | "comingSoon" | "Now selling"
  page?: number
  limit?: number
  sortBy?: "sqft" | "price" | "id"
  sortOrder?: "asc" | "desc"
}

export function applyFiltersAndSort(items: Property[], params: ListParams = {}) {
  let out = [...items]

  // Community filter - case-insensitive comparison
  if (params.community) {
    const searchCommunity = params.community.toLowerCase().trim()
    out = out.filter(p => p.community.toLowerCase().includes(searchCommunity))
  }

  // Price filter - equal to or below specified value
  if (params.price) {
    out = out.filter(p => parseInt(p.price) <= params.price!)
  }

  if (params.status) out = out.filter(p => p.status === params.status)
  if (params.beds) out = out.filter(p => parseInt(p.beds) >= params.beds!)
  if (params.baths) out = out.filter(p => parseFloat(p.baths) >= params.baths!)
  
  // Garages filter - equal to or above specified value
  if (params.garages) out = out.filter(p => parseInt(p.garages) >= params.garages!)
  
  if (params.min) out = out.filter(p => parseInt(p.price) >= params.min!)
  if (params.max) out = out.filter(p => parseInt(p.price) <= params.max!)

  // Sorting
  const sortBy = params.sortBy || "sqft"
  const sortOrder = params.sortOrder || "desc"
  
  out.sort((a, b) => {
    let aValue: number
    let bValue: number
    
    switch (sortBy) {
      case "sqft":
        aValue = parseInt(a.sqft)
        bValue = parseInt(b.sqft)
        break
      case "price":
        aValue = parseInt(a.price)
        bValue = parseInt(b.price)
        break
      case "id":
      default:
        aValue = a.id
        bValue = b.id
        break
    }
    
    return sortOrder === "desc" ? bValue - aValue : aValue - bValue
  })

  // Pagination
  const page = params.page || 1
  const limit = params.limit || 9
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  return out.slice(startIndex, endIndex)
}

export function getTotalCount(items: Property[], params: ListParams = {}) {
  let out = [...items]

  // Apply the same filters as applyFiltersAndSort but without sorting and pagination
  if (params.community) {
    const searchCommunity = params.community.toLowerCase().trim()
    out = out.filter(p => p.community.toLowerCase().includes(searchCommunity))
  }

  if (params.price) {
    out = out.filter(p => parseInt(p.price) <= params.price!)
  }

  if (params.status) out = out.filter(p => p.status === params.status)
  if (params.beds) out = out.filter(p => parseInt(p.beds) >= params.beds!)
  if (params.baths) out = out.filter(p => parseFloat(p.baths) >= params.baths!)
  if (params.garages) out = out.filter(p => parseInt(p.garages) >= params.garages!)
  if (params.min) out = out.filter(p => parseInt(p.price) >= params.min!)
  if (params.max) out = out.filter(p => parseInt(p.price) <= params.max!)

  return out.length
}
