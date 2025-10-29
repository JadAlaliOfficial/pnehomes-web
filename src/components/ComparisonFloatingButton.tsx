'use client'

import { useComparison } from '@/contexts/ComparisonContext'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'

export default function ComparisonFloatingButton() {
  const { selectedProperties, isDrawerOpen, setIsDrawerOpen } = useComparison()
  const pathname = usePathname()

  // Only show the button on specific routes: /floor-plans, /property/[slug], and /compare
  const allowedRoutes = ['/floor-plans', '/property/', '/compare']
  const isOnAllowedRoute = allowedRoutes.some(route => pathname.startsWith(route))
  
  // Don't show the button if not on allowed routes
  if (!isOnAllowedRoute) {
    return null
  }

  // Don't show the button if no properties are selected
  if (selectedProperties.length === 0) {
    return null
  }

  return (
    <div className="fixed top-1/2 right-4 z-50 -translate-y-1/2">
      <Button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        size="lg"
        className="h-14 w-14 rounded-full bg-pne-accent hover:bg-pne-brand p-0 text-white shadow-lg "
      >
        {isDrawerOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <Plus className="h-6 w-6" />
            {selectedProperties.length > 0 && (
              <span className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {selectedProperties.length}
              </span>
            )}
          </div>
        )}
      </Button>
    </div>
  )
}
