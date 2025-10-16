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
            {headerConfig.navigation.map((item) => {
              // Special handling for Services - use ServicesSelect component
              if (item.slug === "services") {
                return (
                  <div key={item.slug} className="min-w-[120px]">
                    <ServicesSelect />
                  </div>
                );
              }
              
              // Regular navigation links
              return (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Contact & CTA */}
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${headerConfig.phone}`}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline text-sm font-medium">
                {headerConfig.phone}
              </span>
            </a>
            <Button size="sm">
              {headerConfig.button}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}