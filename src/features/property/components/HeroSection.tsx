// src/floor-plans/HeroSection.tsx
'use client'

import { useEffect, useState } from 'react'

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
    <section className="relative isolate">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage: isLoaded ? `url(${coverImage})` : 'none',
          backgroundColor: '#f3f4f6', // Fallback color while loading
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
      </div>

      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
            {pageTitle}
          </h1>
        </div>
      </div>
    </section>
  )
}
