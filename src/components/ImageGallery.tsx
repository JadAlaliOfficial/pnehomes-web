'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Download from 'yet-another-react-lightbox/plugins/download'
import { Badge } from '@/components/ui/badge'

interface ImageGalleryProps {
  images: string[]
  title: string
  maxVisibleImages?: number
}

export default function ImageGallery({ images, title, maxVisibleImages = 3 }: ImageGalleryProps) {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleImages = images.slice(0, maxVisibleImages)
  const remainingCount = images.length - maxVisibleImages

  const slides = images.map((src) => ({ src }))

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  return (
    <div>
      <div>
        {/* Main image */}
        <div 
          className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={visibleImages[0]}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(min-width:1024px) 66vw, 100vw"
            priority
          />
        </div>

        {/* Thumbnails (if more than 1) */}
        {visibleImages.length > 1 && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {visibleImages.slice(1).map((src, i) => (
              <div 
                key={i} 
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-md"
                onClick={() => openLightbox(i + 1)}
              >
                <Image
                  src={src}
                  alt={`${title} photo ${i + 2}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(min-width:1024px) 16vw, 25vw"
                />
                {/* Badge overlay on the last visible image if there are more images */}
                {i === visibleImages.slice(1).length - 1 && remainingCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Badge variant="secondary" className="bg-white/90 font-semibold text-black">
                      +{remainingCount} more
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={slides}
        plugins={[Zoom, Fullscreen, Download]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true
        }}
        download={{
          download: ({ slide }) => {
            const link = document.createElement('a')
            link.href = slide.src
            link.download = slide.alt || 'image'
            link.click()
          }
        }}
      />
    </div>
  )
}
