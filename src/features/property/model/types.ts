// src/app/features/property/model/types.ts

import { z } from "zod"

export const PropertyStatus = z.enum(["available", "sold", "comingSoon"])

export const PropertySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  status: PropertyStatus,
  price: z.number().nullable().default(null),
  beds: z.number().int(),
  baths: z.number().int(),
  sqft: z.number().int(),
  city: z.string(),
  gallery: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  publishedAt: z.string().datetime().optional()
})

export type Property = z.infer<typeof PropertySchema>
