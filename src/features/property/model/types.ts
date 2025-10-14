// src/app/features/property/model/types.ts

import { z } from "zod"

export const PropertyStatus = z.enum(["available", "sold", "comingSoon", "Now selling"])

const WhatsSpecialSchema = z.object({
  badges: z.array(z.string()),
  description: z.string()
})

const FactsFeatureSchema = z.object({
  title: z.string(),
  list: z.array(z.string())
})

const FloorPlanSchema = z.object({
  title: z.string(),
  img: z.string(),
  Description: z.string()
})

export const PropertySchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  status: PropertyStatus,
  price: z.string(),
  beds: z.string(),
  baths: z.string(),
  garages: z.string(),
  sqft: z.string(),
  gallery: z.array(z.string()).default([]),
  zillow_link: z.string().optional(),
  Whats_special: WhatsSpecialSchema,
  Facts_features: z.array(FactsFeatureSchema),
  floor_plans: z.array(FloorPlanSchema),
  next_property_slug: z.string(),
  prev_property_slug: z.string()
})

export type Property = z.infer<typeof PropertySchema>
export type WhatsSpecial = z.infer<typeof WhatsSpecialSchema>
export type FactsFeature = z.infer<typeof FactsFeatureSchema>
export type FloorPlan = z.infer<typeof FloorPlanSchema>
