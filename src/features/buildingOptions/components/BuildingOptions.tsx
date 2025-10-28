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
    <div className="min-h-screen">
      {/* Hero Section with Cover Image */}
      {data.cover && (
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10">
            <Image src={data.cover} alt="Building Options" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
          </div>

          <div className="container mx-auto px-6 pt-20 pb-10 text-center">
            <h1 className="text-pne-brand mb-4 text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {data.title}
            </h1>
          </div>
        </section>
      )}

      {/* Slogan Section - Under Cover */}
      {data.cover && (
        <section className="bg-background py-8">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-pne-brand text-xl font-medium opacity-90 md:text-2xl lg:text-3xl">
              {data.slogan}
            </h2>
          </div>
        </section>
      )}

      <div className="bg-background px-4 py-16">
        <div className="mx-auto">
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

          {/* Two main option cards next to each other - Now Fully Responsive */}
          <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:max-w-4xl md:grid-cols-2 lg:max-w-6xl">
            {data.options.map(option => (
              <Card
                key={option.id}
                className="hover:border-primary/50 m-0 w-full cursor-pointer border-2 p-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => handleCardClick(option.id)}
              >
                <CardContent className="p-0">
                  {/* Image - Responsive Heights */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl sm:h-56 md:h-64 lg:h-80 xl:h-96">
                    <Image
                      src={option.section_img}
                      alt={option.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>

                  {/* Content - Responsive Padding */}
                  <div className="p-4 sm:p-6 md:p-8">
                    {/* Title - Responsive Text Size */}
                    <h3 className="text-foreground mb-2 text-lg font-semibold sm:mb-3 sm:text-xl md:text-2xl">
                      {option.title}
                    </h3>

                    {/* Description - Responsive Text Size */}
                    {option.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                        {option.description}
                      </p>
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
    </div>
  )
}
