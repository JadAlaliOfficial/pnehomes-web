'use client'

import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import { use } from 'react'
import { getArticleBySlugSync, getBuildingOptionsSync } from '@/features/buildingOptions/api'
import { Button } from '@/components/ui/button'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const router = useRouter()
  const { slug } = use(params)
  const article = getArticleBySlugSync(slug)
  const buildingOptionsData = getBuildingOptionsSync()

  if (!article) {
    notFound()
  }

  const handleBackClick = () => {
    router.back()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with Cover Image */}
      {buildingOptionsData.cover && (
        <section className="relative isolate">
          {/* Background image (fixed) */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
            style={{ backgroundImage: `url(${buildingOptionsData.cover})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />

          {/* Centered content */}
          <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 text-center">
            <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {article.title}
            </h1>
          </div>
        </section>
      )}

      <section className="bg-background px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6 lg:pb-8">
        <div className="mx-auto max-w-7xl">

        {/* Article Title and Description */}
        <header className="mb-6 sm:mb-8 lg:mb-10 text-center px-2 sm:px-4">
          {article.description && (
            <p className="text-muted-foreground mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto">
              {article.description}
            </p>
          )}
        </header>

        {/* Article Main Image */}
        <figure className="relative mb-6 sm:mb-8 lg:mb-10 h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] w-full overflow-hidden rounded-lg sm:rounded-xl">
          <Image
            src={article.img}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
            priority
          />
        </figure>

        {/* Article Content */}
        <article 
          className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none mx-auto text-foreground leading-relaxed px-2 sm:px-4 lg:px-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Back Button */}
        <footer className="mt-8 sm:mt-10 lg:mt-12 flex justify-center px-2 sm:px-4">
          <Button
            type="button"
            onClick={handleBackClick}
            className="bg-pne-accent hover:bg-pne-brand text-white text-sm sm:text-base lg:text-lg font-medium shadow-md w-full sm:w-auto"
            size="lg"
            aria-label="Back to Building Options"
          >
            ← Back to Building Options
          </Button>
        </footer>
        </div>
      </section>
    </main>
  )
}
