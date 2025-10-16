"use client"

import { useComparison } from "@/contexts/ComparisonContext"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X } from "lucide-react"

export default function ComparisonFloatingButton() {
  const { selectedProperties, isDrawerOpen, setIsDrawerOpen } = useComparison()

  // Don't show the button if no properties are selected
  if (selectedProperties.length === 0) {
    return null
  }

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <Button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full h-14 w-14 p-0"
      >
        {isDrawerOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {selectedProperties.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedProperties.length}
              </span>
            )}
          </div>
        )}
      </Button>
    </div>
  )
}