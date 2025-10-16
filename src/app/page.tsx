// src/app/page.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ServicesSelect } from "@/features/services/components/ServicesSelect"
import { homeLayoutApi } from "@/features/home/api"

export default function Home() {
  const headerNav = homeLayoutApi.getHeaderNav();
  
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-4 items-center max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to PNE Homes
          </h1>
          <p className="text-lg text-gray-600">
            Discover our quality home building services and explore what we have to offer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {headerNav.map((navItem) => (
            <Button key={navItem.slug} asChild size="lg" className="w-full">
              <Link href={`/${navItem.slug}`}>
                Go to {navItem.title}
              </Link>
            </Button>
          ))}
        </div>
        
        {/* Services Select Dropdown */}
        <div className="w-full max-w-xs mt-6">
          <ServicesSelect />
        </div>
      </div>
    </div>
  )
}
