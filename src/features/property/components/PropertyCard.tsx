// src/features/property/components/PropertyCard.tsx

import Link from "next/link"
import Image from "next/image"
import type { Property } from "../model/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import PropertyReviewDialog from "./PropertyReviewDialog"

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[4/3]">
        <Image
          src={p.gallery[0] ?? "/img/placeholder.jpg"}
          alt={p.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        {/* Review Button Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <PropertyReviewDialog property={p}>
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-black shadow-lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick Review
            </Button>
          </PropertyReviewDialog>
        </div>
      </div>
      <CardContent className="p-4">
        <Link href={`/property/${p.slug}`} className="font-semibold hover:underline">
          {p.title}
        </Link>
        <div className="text-sm mt-1 opacity-60 capitalize">
          {p.community}
        </div>
        <div className="text-sm mt-1 opacity-80">
          {p.beds} bd • {p.baths} ba • {parseInt(p.sqft).toLocaleString()} sqft
        </div>
        <div className="mt-2 font-medium">
          {p.price ? `$${parseInt(p.price).toLocaleString()}` : "Contact for price"}
        </div>
        <div className="mt-1 text-xs uppercase tracking-wide opacity-70">{p.status}</div>
        
        {/* Alternative Review Button - Always Visible */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <PropertyReviewDialog property={p}>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Quick Review
            </Button>
          </PropertyReviewDialog>
        </div>
      </CardContent>
    </Card>
  )
}
