'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { getAllServices } from '../api'
import type { Service } from '../model/types'

interface ServicesSelectProps {
  placeholder?: string
}

export function ServicesSelect({ placeholder = 'Services' }: ServicesSelectProps) {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await getAllServices()
        if (response.success) {
          setServices(response.data)
        }
      } catch (error) {
        console.error('Failed to load services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const handleServiceSelect = (slug: string) => {
    router.push(`/services/${slug}`)
  }

  if (loading) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button disabled className="w-full rounded bg-gray-200 px-2 py-2 text-gray-500">
            Loading services...
          </button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative px-1 py-2 text-sm font-medium text-[color:var(--pne-brand)] transition-all duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[color:var(--pne-accent)] after:transition-all after:duration-300 hover:text-[color:var(--pne-brand-600)] hover:after:w-full md:text-white md:after:hidden md:hover:-translate-y-0.5 md:hover:text-[color:var(--pne-accent)]">
          {placeholder}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-xs">
        <DropdownMenuLabel>Services</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {services.map(service => (
          <DropdownMenuItem
            key={service.id}
            onSelect={() => handleServiceSelect(service.slug)}
            className="cursor-pointer"
          >
            {service.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
