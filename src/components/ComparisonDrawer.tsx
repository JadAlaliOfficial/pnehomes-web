"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, ArrowRight } from 'lucide-react'
import { useComparison } from '@/contexts/ComparisonContext'

export default function ComparisonDrawer() {
  const router = useRouter()
  const { 
    selectedProperties, 
    removeFromComparison, 
    clearComparison, 
    isDrawerOpen, 
    setIsDrawerOpen 
  } = useComparison()

  const handleCompare = () => {
    if (selectedProperties.length >= 2) {
      const propertyIds = selectedProperties.map(p => p.id).join(',')
      router.push(`/compare?properties=${propertyIds}`)
    }
  }

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Compare Properties ({selectedProperties.length})
            {selectedProperties.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearComparison}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {selectedProperties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No properties selected</p>
              <p className="text-sm text-gray-400">
                Click "Add to Compare" on property cards to start comparing
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedProperties.map((property) => (
                <Card key={property.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromComparison(property.id)}
                    className="absolute top-2 right-2 z-10 h-6 w-6 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={property.gallery[0] ?? "/img/placeholder.jpg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/property/${property.slug}`}
                          className="font-medium text-sm hover:text-blue-600 line-clamp-2"
                        >
                          {property.title}
                        </Link>
                        <p className="text-xs text-gray-500 capitalize mt-1">
                          {property.community}
                        </p>
                        <div className="text-xs text-gray-600 mt-1">
                          {property.beds} bd • {property.baths} ba • {parseInt(property.sqft).toLocaleString()} sqft
                        </div>
                        <div className="text-sm font-medium text-green-600 mt-1">
                          {property.price ? `$${parseInt(property.price).toLocaleString()}` : "Contact for price"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {selectedProperties.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-2">
              {selectedProperties.length < 2 && (
                <p className="text-xs text-gray-500 text-center">
                  Add at least 2 properties to compare
                </p>
              )}
              <Button
                onClick={handleCompare}
                disabled={selectedProperties.length < 2}
                className="w-full"
                size="lg"
              >
                Compare Properties ({selectedProperties.length})
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}