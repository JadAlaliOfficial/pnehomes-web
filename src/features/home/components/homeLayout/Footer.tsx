"use client";

import Link from "next/link";
import { homeLayoutApi } from "@/features/home/api";
import { 
  Facebook, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Phone,
  ExternalLink
} from "lucide-react";

const socialIcons = {
  facebook: Facebook,
  youtube: Youtube,
  x: Twitter,
  linkedIn: Linkedin,
  instagram: Instagram,
  tiktok: ExternalLink,
  pinterest: ExternalLink,
  zillow: ExternalLink,
};

export function Footer() {
  const footerConfig = homeLayoutApi.getFooter();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">PNE Homes</h3>
            <p className="text-gray-300 mb-4">
              Building quality homes with exceptional craftsmanship and attention to detail.
            </p>
            <div className="flex items-center text-gray-300">
              <Phone className="h-4 w-4 mr-2" />
              <a 
                href={`tel:${footerConfig.phone}`}
                className="hover:text-white transition-colors"
              >
                {footerConfig.phone}
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerConfig.navigation.map((item, index) => {
                // Map footer navigation items to specific routes based on index
                const getRouteForIndex = (index: number) => {
                  switch (index) {
                    case 0: return "/about-us"; // About us
                    case 1: return "/our-team"; // Our Team
                    case 2: return "/events"; // Events
                    case 3: return "/privacy-policy"; // Privacy Policy
                    default: return `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                  }
                };

                return (
                  <li key={index}>
                    <Link
                      href={getRouteForIndex(index)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              {footerConfig.social.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || ExternalLink;
                return (
                  <a
                    key={social.icon}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                    aria-label={`Follow us on ${social.icon}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PNE Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}