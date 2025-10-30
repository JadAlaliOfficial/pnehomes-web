// src/floor-plans/HeroSection.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface HeroSectionProps {
  coverImage: string
  pageTitle: string
}

export default function HeroSection({ coverImage, pageTitle }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative isolate overflow-hidden h-[60vh]">
      {/* Parallax background image container - limited to hero section */}
      <div className="fixed inset-0 -z-10 bg-gray-100">
        {isLoaded && (
          <Image
            src={coverImage}
            alt={pageTitle}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            style={{
              transform: 'translateZ(0)', // Force hardware acceleration
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10 z-10" />
      </div>

      <div className="relative flex h-full items-center justify-center py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl drop-shadow-lg">
            {pageTitle}
          </h1>
        </div>
      </div>
    </section>
  )
}
