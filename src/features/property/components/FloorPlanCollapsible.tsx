'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

interface FloorPlan {
  img: string
  title: string
  Description?: string
}

export function FloorPlanCollapsible({ plan }: { plan: FloorPlan }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
        aria-expanded={isOpen}
      >
        <h3 className="font-medium">{plan.title}</h3>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="border-t">
          <div className="relative aspect-[4/3]">
            <Image
              src={plan.img}
              alt={plan.title}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 50vw, 100vw"
            />
          </div>
          {plan.Description && (
            <div className="p-4">
              <p className="text-muted-foreground text-sm">{plan.Description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
