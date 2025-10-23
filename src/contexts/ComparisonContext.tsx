'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Property } from '@/features/property/model/types'

interface ComparisonContextType {
  selectedProperties: Property[]
  addToComparison: (property: Property) => void
  removeFromComparison: (propertyId: number) => void
  clearComparison: () => void
  isInComparison: (propertyId: number) => boolean
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const pathname = usePathname()

  // Clear comparison when navigating away from floor-plans page
  useEffect(() => {
    if (!pathname.startsWith('/floor-plans')) {
      setSelectedProperties([])
      setIsDrawerOpen(false)
    }
  }, [pathname])

  const addToComparison = (property: Property) => {
    setSelectedProperties(prev => {
      // Prevent duplicates and limit to 4 properties for comparison
      if (prev.find(p => p.id === property.id) || prev.length >= 4) {
        return prev
      }
      const newList = [...prev, property]
      // Don't auto-open drawer when first property is added (let user control via floating button)
      return newList
    })
  }

  const removeFromComparison = (propertyId: number) => {
    setSelectedProperties(prev => {
      const newList = prev.filter(p => p.id !== propertyId)
      // Auto-close drawer when no properties left
      if (newList.length === 0) {
        setIsDrawerOpen(false)
      }
      return newList
    })
  }

  const clearComparison = () => {
    setSelectedProperties([])
    setIsDrawerOpen(false)
  }

  const isInComparison = (propertyId: number) => {
    return selectedProperties.some(p => p.id === propertyId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        selectedProperties,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}
