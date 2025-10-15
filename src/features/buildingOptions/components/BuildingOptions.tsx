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

  const handleArticleClick = (slug: string) => {
    router.push(`/articles/${slug}`)
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

        {/* Two main option cards next to each other */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
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

        {/* Articles Section */}
        {data.articles && data.articles.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Featured Articles
              </h3>
              <p className="text-muted-foreground">
                Discover more about our building process and expertise
              </p>
            </div>

            {/* Article cards - smaller cards in a grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.articles.map((article) => (
                <Card
                  key={article.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border hover:border-primary/50"
                  onClick={() => handleArticleClick(article.slug)}
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                      <Image
                        src={article.img}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h4 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}