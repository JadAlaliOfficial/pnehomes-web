'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { GalleryImage } from '../model/types'

interface GalleryContentProps {
  images: GalleryImage[]
  albumTitle?: string
}

interface ImageState {
  [key: number]: 'virtual' | 'real'
}

interface TransitionState {
  [key: number]: boolean
}

export default function GalleryContent({ images, albumTitle }: GalleryContentProps) {
  const [imageStates, setImageStates] = useState<ImageState>({})
  const [isTransitioning, setIsTransitioning] = useState<TransitionState>({})

  const toggleImage = (index: number) => {
    setIsTransitioning(prev => ({ ...prev, [index]: true }))
    
    setTimeout(() => {
      setImageStates(prev => ({
        ...prev,
        [index]: prev[index] === 'real' ? 'virtual' : 'real',
      }))
      
      setTimeout(() => {
        setIsTransitioning(prev => ({ ...prev, [index]: false }))
      }, 50)
    }, 200)
  }

  const getCurrentImage = (image: GalleryImage, index: number) => {
    const state = imageStates[index] || 'virtual'
    return state === 'real' && image.real_img ? image.real_img : image.virtual_img
  }

  const getToggleLabel = (image: GalleryImage, index: number) => {
    const state = imageStates[index] || 'virtual'
    return state === 'real' ? 'View Virtual Image' : 'View Real Image'
  }

  const hasRealImage = (image: GalleryImage) => {
    return image.real_img && image.real_img.trim() !== ''
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image, index) => (
        <Card
          key={index}
          className="group overflow-hidden border-0 p-0 shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={getCurrentImage(image, index)}
                alt={
                  albumTitle ? `${albumTitle} - Image ${index + 1}` : `Gallery image ${index + 1}`
                }
                fill
                className={`object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${
                  isTransitioning[index] ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />

              {/* Overlay for images with both virtual and real versions */}
              {hasRealImage(image) && (
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                      onClick={() => toggleImage(index)}
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-black shadow-lg hover:bg-white transform transition-all duration-200 hover:scale-105"
                      disabled={isTransitioning[index]}
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
