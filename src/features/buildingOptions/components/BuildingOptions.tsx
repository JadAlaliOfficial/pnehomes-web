'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { getBuildingOptionsSync } from '../api'

export default function BuildingOptions() {
  const router = useRouter()
  const data = getBuildingOptionsSync()

  const handleCardClick = (optionId: number) => {
    if (optionId === 1) {
      router.push('/contact/own_land')
    } else {
      // Handle other options as needed
      router.push('/communities')
    }
  }

  const handleArticleClick = (slug: string) => {
    router.push(`/articles/${slug}`)
  }

  return (
    <div className="bg-background min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Cover Image */}
        {data.cover && (
          <div className="relative mb-12 h-64 w-full overflow-hidden rounded-xl md:h-96 lg:h-[400px]">
            <Image
              src={data.cover}
              alt="Building Options Cover"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
              priority
            />
            {/* Overlay with slogan */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="px-4 text-center text-white">
                <h1 className="mb-4 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
                  {data.slogan}
                </h1>
                <h2 className="text-xl font-medium opacity-90 md:text-2xl lg:text-3xl">
                  {data.title}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for when no cover image */}
        {!data.cover && (
          <>
            {/* Slogan - Very big font in the middle */}
            <div className="mb-8 text-center">
              <h1 className="text-foreground text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
                {data.slogan}
              </h1>
            </div>

            {/* Title - Smaller font under slogan */}
            <div className="mb-16 text-center">
              <h2 className="text-muted-foreground text-xl font-medium md:text-2xl lg:text-3xl">
                {data.title}
              </h2>
            </div>
          </>
        )}

        {/* Two main option cards next to each other */}
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {data.options.map(option => (
            <Card
              key={option.id}
              className="hover:border-primary/50 cursor-pointer border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handleCardClick(option.id)}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
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
                  <h3 className="text-foreground mb-3 text-xl font-semibold">{option.title}</h3>

                  {/* Description */}
                  {option.description && (
                    <p className="text-muted-foreground leading-relaxed">{option.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Articles Section */}
        {data.articles && data.articles.articles && data.articles.articles.length > 0 && (
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h3 className="text-foreground mb-2 text-2xl font-bold md:text-3xl">
                Featured Articles
              </h3>
              <p className="text-muted-foreground">
                Discover more about our building process and expertise
              </p>
            </div>

            {/* Article cards - smaller cards in a grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.articles.articles.map(article => (
                <Card
                  key={article.id}
                  className="hover:border-primary/50 cursor-pointer border transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => handleArticleClick(article.slug)}
                >
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
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
                      <h4 className="text-foreground mb-2 line-clamp-2 text-lg font-semibold">
                        {article.title}
                      </h4>

                      {/* Description */}
                      {article.description && (
                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                          {article.description}
                        </p>
                      )}
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
