"use client"

import { Button } from "@/components/ui/button"

interface RequestTourButtonProps {
  communityName: string
  className?: string
}

export default function RequestTourButton({ communityName, className }: RequestTourButtonProps) {
  const handleRequestTour = () => {
    // TODO: Implement tour request functionality
    alert(`Tour request for ${communityName} - functionality coming soon!`)
  }

  return (
    <Button 
      size="lg" 
      className={className}
      onClick={handleRequestTour}
    >
      Request a Tour
    </Button>
  )
}