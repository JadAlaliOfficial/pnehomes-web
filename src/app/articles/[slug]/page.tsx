'use client'

import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import { use } from 'react'
import { getArticleBySlugSync, getBuildingOptionsSync } from '@/features/buildingOptions/api'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
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
    <div className="bg-background min-h-screen px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Articles Cover Image */}
        {buildingOptionsData.articles.cover && (
          <div className="relative mb-8 h-48 w-full overflow-hidden rounded-xl md:h-64 lg:h-80">
            <Image
              src={buildingOptionsData.articles.cover}
              alt="Articles Cover"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="px-4 text-center text-white">
                <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">Featured Articles</h2>
              </div>
            </div>
          </div>
        )}

        {/* Article Title */}
        <div className="mb-8 text-center">
          <h1 className="text-foreground text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          {/* Article Description */}
          {article.description && (
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              {article.description}
            </p>
          )}
        </div>

        {/* Article Image */}
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl md:h-96 lg:h-[500px]">
          <Image
            src={article.img}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-foreground text-lg leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleBackClick}
            className="bg-primary hover:bg-primary/90 inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors duration-200"
          >
            ← Back to Building Options
          </button>
        </div>
      </div>
    </div>
  )
}
