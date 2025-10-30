'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Content {
  title: string
  message: string
}

interface RequestTourButtonProps {
  content: Content
  className?: string
}

export default function RequestTourButton({ content, className }: RequestTourButtonProps) {
  const router = useRouter()

  const handleRequestTour = () => {
    const encodedMessage = encodeURIComponent(content.message)
    router.push(`/contact?message=${encodedMessage}`)
  }

  return (
    <Button size="lg" className={className} onClick={handleRequestTour}>
      {content.title}
    </Button>
  )
}
