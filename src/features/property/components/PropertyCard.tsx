// src/features/property/components/PropertyCard.tsx

import Link from "next/link"
import Image from "next/image"
import type { Property } from "../model/types"

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={p.gallery[0] ?? "/img/placeholder.jpg"}
          alt={p.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <Link href={`/property/${p.slug}`} className="font-semibold hover:underline">
          {p.title}
        </Link>
        <div className="text-sm mt-1 opacity-80">
          {p.beds} bd • {p.baths} ba • {p.sqft.toLocaleString()} sqft • {p.city}
        </div>
        <div className="mt-2 font-medium">
          {p.price ? `$${p.price.toLocaleString()}` : "Contact for price"}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide opacity-70">{p.status}</div>
      </div>
    </div>
  )
}
