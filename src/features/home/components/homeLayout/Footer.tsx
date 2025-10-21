"use client";

import Link from "next/link";
import { homeLayoutApi } from "@/features/home/api";
import {
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  Phone,
  ExternalLink,
} from "lucide-react";

// ✅ Extra icons from react-icons
import { FaXTwitter, FaTiktok, FaPinterest } from "react-icons/fa6";
import { SiZillow } from "react-icons/si";

/**
 * Footer mirrors a refined builder style:
 * - Deep brand footer, soft dividers, spaced columns
 * - Muted links that brighten on hover
 * - Round icon buttons with subtle bg hover
 */

const socialIcons = {
  facebook: Facebook,
  youtube: Youtube,
  x: FaXTwitter,
  linkedIn: Linkedin,
  instagram: Instagram,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  zillow: SiZillow,
};

export function Footer() {
  const footerConfig = homeLayoutApi.getFooter();

  const getRouteForIndex = (index: number, label: string) => {
    switch (index) {
      case 0:
        return "/about-us";
      case 1:
        return "/our-team";
      case 2:
        return "/events";
      case 3:
        return "/privacy-policy";
      default:
        return `/${label.toLowerCase().replace(/\s+/g, "-")}`;
    }
  };

  return (
    <footer className="bg-[color:var(--pne-footer)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col items-center gap-8 text-center">

          {/* Quick Links */}
          <div>
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
              {footerConfig.navigation.map((item: string, index: number) => (
                <li key={index}>
                  <Link
                    href={getRouteForIndex(index, item)}
                    className="inline-block text-gray-300 hover:text-white transition-colors text-lg
                               relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0
                               after:bg-[color:var(--pne-accent)] after:transition-all after:duration-300
                               hover:after:w-full"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company / Phone */}
          <div>
            {footerConfig.phone && (
              <div className="flex items-center justify-center text-[color:var(--pne-accent)] text-lg">
                <span>Call Us :</span>
                <Phone className="h-5 w-5 mx-2" />
                <a
                  href={`tel:${footerConfig.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {footerConfig.phone}
                </a>
              </div>
            )}
          </div>

          {/* Social */}
          <div>
            <div className="flex flex-wrap justify-center gap-3">
              {footerConfig.social.map(
                (social: { icon: string; url: string }) => {
                  const IconComponent =
                    socialIcons[social.icon as keyof typeof socialIcons] ||
                    ExternalLink;
                  return (
                    <a
                      key={social.icon}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.icon}`}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full
                                 bg-white/5 hover:bg-white/10 text-[color:var(--pne-accent)] hover:text-white
                                 ring-1 ring-white/10 hover:ring-white/20 transition"
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-5 pt-5 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} PNE Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
