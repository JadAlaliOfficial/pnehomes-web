"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import * as Property from '@/features/property/api'
import type { Property as PropertyType } from '@/features/property/model/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default function ComparePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [properties, setProperties] = useState<PropertyType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const propertyIds = searchParams.get('properties')
    if (!propertyIds) {
      router.push('/floor-plans')
      return
    }

    const ids = propertyIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    if (ids.length < 2) {
      router.push('/floor-plans')
      return
    }

    // Fetch properties by IDs
    const fetchProperties = async () => {
      try {
        const allProperties = await Property.list({ limit: 1000 })
        const selectedProperties = allProperties.filter(p => ids.includes(p.id))
        setProperties(selectedProperties)
      } catch (error) {
        console.error('Error fetching properties:', error)
        router.push('/floor-plans')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    )
  }

  if (properties.length < 2) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">No Properties to Compare</h1>
          <p className="text-gray-600 mb-6">Please select at least 2 properties to compare.</p>
          <Button onClick={() => router.push('/floor-plans')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Floor Plans
          </Button>
        </div>
      </div>
    )
  }

  const comparisonFeatures = [
    { key: 'price', label: 'Price', format: (value: string) => value ? `$${parseInt(value).toLocaleString()}` : 'Contact for price' },
    { key: 'beds', label: 'Bedrooms' },
    { key: 'baths', label: 'Bathrooms' },
    { key: 'garages', label: 'Garages' },
    { key: 'sqft', label: 'Square Feet', format: (value: string) => `${parseInt(value).toLocaleString()} sqft` },
    { key: 'community', label: 'Community', format: (value: string) => value.charAt(0).toUpperCase() + value.slice(1) },
    { key: 'status', label: 'Status' },
  ]

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push('/floor-plans')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Floor Plans
          </Button>
          <h1 className="text-3xl font-bold">Compare Properties</h1>
          <p className="text-gray-600">Side-by-side comparison of {properties.length} properties</p>
        </div>
      </div>

      {/* Property Images */}
      <div className={`grid gap-6 mb-8 ${properties.length === 2 ? 'grid-cols-2' : properties.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={property.gallery[0] ?? "/img/placeholder.jpg"}
                alt={property.title}
                fill
                className="object-cover"
                sizes={`${100 / properties.length}vw`}
              />
            </div>
            <CardContent className="p-4">
              <Link 
                href={`/property/${property.slug}`}
                className="font-semibold hover:text-blue-600 transition-colors"
              >
                {property.title}
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {property.status}
                </Badge>
                <Link 
                  href={`/property/${property.slug}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Property Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600 bg-gray-50">Feature</th>
                  {properties.map((property) => (
                    <th key={property.id} className="text-left p-4 font-medium bg-gray-50 min-w-[200px]">
                      <div className="truncate">{property.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="p-4 font-medium text-gray-700 border-r">
                      {feature.label}
                    </td>
                    {properties.map((property) => {
                      const value = property[feature.key as keyof PropertyType] as string
                      const displayValue = feature.format ? feature.format(value) : value
                      return (
                        <td key={property.id} className="p-4">
                          {displayValue || 'N/A'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Special Features Comparison */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Special Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-6 ${properties.length === 2 ? 'grid-cols-2' : properties.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {properties.map((property) => (
              <div key={property.id}>
                <h4 className="font-semibold mb-3 text-sm text-gray-700">
                  {property.title}
                </h4>
                <div className="space-y-2">
                  {property.Whats_special.badges.slice(0, 6).map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                {property.Whats_special.badges.length > 6 && (
                  <p className="text-xs text-gray-500 mt-2">
                    +{property.Whats_special.badges.length - 6} more features
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        {properties.map((property) => (
          <Button key={property.id} asChild>
            <Link href={`/property/${property.slug}`}>
              View {property.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}