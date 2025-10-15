"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllServices } from "../api"
import type { Service } from "../model/types"

export function ServicesSelect() {
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
      <Select disabled>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Loading services..." />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select onValueChange={handleServiceSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent>
        {services.map((service) => (
          <SelectItem key={service.id} value={service.slug}>
            {service.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}