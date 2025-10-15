"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { getBuildingOptionsSync } from '../api'

export default function BuildingOptions() {
  const router = useRouter()
  const data = getBuildingOptionsSync()

  const handleCardClick = (goTo: string) => {
    router.push(`/${goTo}`)
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Slogan - Very big font in the middle */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            {data.slogan}
          </h1>
        </div>

        {/* Title - Smaller font under slogan */}
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
            {data.title}
          </h2>
        </div>

        {/* Two cards next to each other */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.options.map((option) => (
            <Card
              key={option.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
              onClick={() => handleCardClick(option.go_to)}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
                  <Image
                    src={option.section_img}
                    alt={option.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {option.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}