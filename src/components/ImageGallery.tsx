"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"

interface ImageGalleryProps {
  images: string[]
  title: string
  maxVisibleImages?: number
}

export default function ImageGallery({ images, title, maxVisibleImages = 3 }: ImageGalleryProps) {
  const [open, setOpen] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [, setCurrent] = useState(0)
  const visibleImages = images.slice(0, maxVisibleImages)
  const remainingCount = images.length - maxVisibleImages

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        {/* Main image */}
        <DialogTrigger asChild>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg cursor-pointer group">
            <Image
              src={visibleImages[0]}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(min-width:1024px) 66vw, 100vw"
              priority
            />
          </div>
        </DialogTrigger>

        {/* Thumbnails (if more than 1) */}
        {visibleImages.length > 1 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {visibleImages.slice(1).map((src, i) => (
              <DialogTrigger key={i} asChild>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md cursor-pointer group">
                  <Image
                    src={src}
                    alt={`${title} photo ${i + 2}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(min-width:1024px) 16vw, 25vw"
                  />
                  {/* Badge overlay on the last visible image if there are more images */}
                  {i === visibleImages.slice(1).length - 1 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-white/90 text-black font-semibold">
                        +{remainingCount} more
                      </Badge>
                    </div>
                  )}
                </div>
              </DialogTrigger>
            ))}
          </div>
        )}
      </div>

      <DialogContent className="max-w-4xl w-full p-0">
        <DialogTitle className="sr-only">{title} Image Gallery</DialogTitle>
        <div className="relative w-full">
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {images.map((src, i) => (
          <CarouselItem key={i}>
            <div className="relative aspect-[16/9] w-full bg-black">
              <Image
                src={src}
                alt={`${title} photo ${i + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  </div>
</DialogContent>

    </Dialog>
  )
}