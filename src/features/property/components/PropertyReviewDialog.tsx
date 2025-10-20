"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "../model/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

interface PropertyReviewDialogProps {
  property: Property
  children: React.ReactNode
}

export default function PropertyReviewDialog({ property, children }: PropertyReviewDialogProps) {
  const gallery = Array.isArray(property.gallery) && property.gallery.length > 0 
    ? property.gallery 
    : ["/img/placeholder.jpg"]

  const formatPrice = (price?: string) => {
    return price ? `$${parseInt(price).toLocaleString()}` : "Contact for price"
  }

  const formatSqft = (sqft?: string) => {
    return sqft ? `${parseInt(sqft).toLocaleString()} sqft` : ""
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold">{property.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 pt-0 overflow-y-auto">
          {/* Left side - Image Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {gallery.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {gallery.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
            
            {gallery.length > 1 && (
              <p className="text-sm text-muted-foreground text-center">
                {gallery.length} photos available
              </p>
            )}
          </div>

          {/* Right side - Property Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground opacity-60 capitalize">
                  {property.community}
                </div>
                
              </div>
              
              <div className="text-2xl font-bold">
                {formatPrice(property.price)}
              </div>
              
              <div className="text-sm text-muted-foreground">
                {property.beds} bd • {property.baths} ba • {formatSqft(property.sqft)}
                {property.garages && ` • ${property.garages} garage${parseInt(property.garages) === 1 ? "" : "s"}`}
              </div>
            </div>

            {/* Key Features */}
            {property.Whats_special?.badges && property.Whats_special.badges.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Key Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.Whats_special.badges.slice(0, 6).map((badge, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Description Preview */}
            {property.Whats_special?.description && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {property.Whats_special.description}
                </p>
              </div>
            )}

            {/* Facts & Features Preview */}
            {property.Facts_features && property.Facts_features.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Features
                </h3>
                <div className="space-y-2">
                  {property.Facts_features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{feature.title}</div>
                      {feature.list && feature.list.length > 0 && (
                        <div className="text-muted-foreground text-xs mt-1">
                          {feature.list.slice(0, 3).join(" • ")}
                          {feature.list.length > 3 && " • ..."}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show More Button */}
            <div className="pt-4 border-t">
              <Button asChild className="w-full" size="lg">
                <Link href={`/property/${property.slug}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Show More Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}