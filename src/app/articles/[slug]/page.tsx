"use client"

import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import { use } from 'react'
import { getArticleBySlugSync } from '@/features/buildingOptions/api'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const router = useRouter()
  const { slug } = use(params)
  const article = getArticleBySlugSync(slug)

  if (!article) {
    notFound()
  }

  const handleBackClick = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Article Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Article Image */}
        <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-xl mb-8">
          <Image
            src={article.img}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-lg leading-relaxed text-foreground whitespace-pre-line">
            {article.content}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
          >
            ← Back to Building Options
          </button>
        </div>
      </div>
    </div>
  )
}