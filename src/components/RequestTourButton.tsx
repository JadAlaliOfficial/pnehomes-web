'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { communitiesAPI } from '@/features/communities/api'

interface RequestTourButtonProps {
  communityName: string
  className?: string
}

export default function RequestTourButton({ communityName, className }: RequestTourButtonProps) {
  const router = useRouter()
  const [messageTemplate, setMessageTemplate] = useState<string>('')

  useEffect(() => {
    async function loadMessageTemplate() {
      try {
        const template = await communitiesAPI.getContactMessage()
        setMessageTemplate(template)
      } catch (error) {
        console.error('Failed to load message template:', error)
        // Fallback to default message
        setMessageTemplate(
          'I would like to request a tour of {title}. Please contact me to schedule a visit.'
        )
      }
    }

    loadMessageTemplate()
  }, [])

  const handleRequestTour = () => {
    const message = messageTemplate.replace('{title}', communityName)
    const encodedMessage = encodeURIComponent(message)
    router.push(`/contact?message=${encodedMessage}`)
  }

  return (
    <Button size="lg" className={className} onClick={handleRequestTour}>
      Request a Tour
    </Button>
  )
}
