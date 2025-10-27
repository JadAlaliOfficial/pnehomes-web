// NOTE: no 'use client' here — this is a Server Component
import { homeContentApi } from '@/features/home/api/new.home_content.api'
import HomePageClient from '../features/home/components/home-page-client'

export default async function HomePage() {
  const content = await homeContentApi.getContent()
  return <HomePageClient content={content} />
}
