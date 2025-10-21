"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { getAllServices } from "../api"
import type { Service } from "../model/types"

interface ServicesSelectProps {
  placeholder?: string
}

export function ServicesSelect({ placeholder = "Services" }: ServicesSelectProps) {
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
        console.error("Failed to load services:", error)
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
          <button disabled className="w-full px-2 py-2 bg-gray-200 text-gray-500 rounded">
            Loading services...
          </button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative text-sm font-medium transition-all duration-300 px-1 py-2
                 md:text-white md:hover:text-[color:var(--pne-accent)] md:hover:-translate-y-0.5
                 text-[color:var(--pne-brand)] hover:text-[color:var(--pne-brand-600)]
                 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px]
                 after:w-0 after:bg-[color:var(--pne-accent)]
                 after:transition-all after:duration-300 hover:after:w-full
                 md:after:hidden">
          {placeholder}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-xs">
        <DropdownMenuLabel>Services</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {services.map((service) => (
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
