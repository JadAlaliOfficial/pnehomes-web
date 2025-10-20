"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { homeLayoutApi } from "@/features/home/api";
import { ServicesSelect } from "@/features/services/components/ServicesSelect";
import { Phone } from "lucide-react";

export function Header() {
  const headerConfig = homeLayoutApi.getHeader();
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={headerConfig.logo}
                alt="PNE Homes Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {headerConfig.navigation.map((item, index) => {
              // Map navigation items to specific routes based on index
              const getRouteForIndex = (index: number) => {
                switch (index) {
                  case 0: return "/"; // Home
                  case 1: return "/floor-plans"; // Floor Plans
                  case 2: return "/gallery"; // Gallery
                  case 3: return "/communities"; // Communities
                  case 4: return "/building-options"; // Building Options (keep original route)
                  case 6: return "/contact"; // Contact Us -> /contact
                  default: return `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                }
              };

              // Special handling for Services (Building Options) - use ServicesSelect component
              if (index === 5) {
                return (
                  <div key={index} className="min-w-[120px]">
                    <ServicesSelect placeholder={item} />
                  </div>
                );
              }
              
              // Regular navigation links
              return (
                <Link
                  key={index}
                  href={getRouteForIndex(index)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          {/* Contact & CTA */}
          <div className="flex items-center space-x-4">
            {headerConfig.phone && (
              <a
                href={`tel:${headerConfig.phone}`}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline text-sm font-medium">
                  {headerConfig.phone}
                </span>
              </a>
            )}
            {headerConfig.button && (
              <Link href="/contact">
                <Button size="sm">
                  {headerConfig.button}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}