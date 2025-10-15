"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { GalleryImage } from "../model/types"

interface GalleryContentProps {
  images: GalleryImage[]
}

interface ImageState {
  [key: number]: "virtual" | "real"
}

export default function GalleryContent({ images }: GalleryContentProps) {
  const [imageStates, setImageStates] = useState<ImageState>({})

  const toggleImage = (index: number) => {
    setImageStates(prev => ({
      ...prev,
      [index]: prev[index] === "real" ? "virtual" : "real"
    }))
  }

  const getCurrentImage = (image: GalleryImage, index: number) => {
    const state = imageStates[index] || "virtual"
    return state === "real" && image.real_img ? image.real_img : image.virtual_img
  }

  const getToggleLabel = (image: GalleryImage, index: number) => {
    const state = imageStates[index] || "virtual"
    return state === "real" ? "View Virtual Image" : "View Real Image"
  }

  const hasRealImage = (image: GalleryImage) => {
    return image.real_img && image.real_img.trim() !== ""
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image, index) => (
        <Card key={index} className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 p-0">
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={getCurrentImage(image, index)}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              
              {/* Overlay for images with both virtual and real versions */}
              {hasRealImage(image) && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => toggleImage(index)}
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-black hover:bg-white shadow-lg"
                    >
                      {getToggleLabel(image, index)}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}