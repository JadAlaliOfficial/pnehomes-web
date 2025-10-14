// src/features/property/api/file.repository.ts
import raw from "../mock/properties.json" 
import { z } from "zod"
import { PropertySchema, type Property } from "../model/types"
import { applyFiltersAndSort, getTotalCount, type ListParams } from "../model/selectors"

const Properties = z.array(PropertySchema).parse(raw)

export async function list(params: ListParams = {}): Promise<Property[]> {
  return applyFiltersAndSort(Properties, params)
}

export async function getTotalFilteredCount(params: ListParams = {}): Promise<number> {
  return getTotalCount(Properties, params)
}

export async function getBySlug(slug: string): Promise<Property | undefined> {
  return Properties.find(p => p.slug === slug)
}

export async function allSlugs(): Promise<string[]> {
  return Properties.map(p => p.slug)
}

export type { ListParams } from "../model/selectors"
