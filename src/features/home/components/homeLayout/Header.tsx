'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { homeLayoutApi } from '@/features/home/api'
import { ServicesSelect } from '@/features/services/components/ServicesSelect'
import { Phone, Menu, X } from 'lucide-react'

/**
 * NOTES
 * - Mobile-first design: menu button on left, logo on right
 * - Transparent header positioned above main content
 * - Desktop: full width with padding, white nav links with hover effects
 * - Phone number as button, active link highlighting
 * - Mobile fixes: overlay for outside click, close on meaningful scroll, close on link click
 */

export function Header() {
  const headerConfig = homeLayoutApi.getHeader()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  // Remember scrollY when menu opens to avoid closing from tiny layout jitters
  const openStartY = useRef(0)

  // Capture starting scroll position when opening
  useEffect(() => {
    if (open) openStartY.current = window.scrollY
  }, [open])

  // Close only on meaningful scroll; also keep "scrolled" visual state
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 6)

      // Only close if user actually moved ~30px since opening
      if (open && Math.abs(y - openStartY.current) > 30) {
        setOpen(false)
      }
    }

    // Initialize once for visual state
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Outside click (desktop helpful); mobile uses overlay for reliability
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node) && open) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [open])

  // Map navigation items to routes based on index
  const getRouteForIndex = (index: number, label: string) => {
    switch (index) {
      case 0:
        return '/' // Home
      case 1:
        return '/floor-plans'
      case 2:
        return '/gallery'
      case 3:
        return '/communities'
      case 4:
        return '/building-options'
      case 6:
        return '/contact'
      default:
        return `/${label.toLowerCase().replace(/\s+/g, '-')}`
    }
  }

  const isActiveLink = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  const NavLink = ({
    href,
    children,
    onClick,
    isMobile = false,
  }: {
    href: string
    children: React.ReactNode
    onClick?: () => void
    isMobile?: boolean
  }) => {
    const isActive = isActiveLink(href)

    return (
      <Link
        href={href}
        onClick={onClick}
        className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 ${
          isMobile
            ? `text-[color:var(--pne-brand)] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-[color:var(--pne-accent)] after:transition-all after:duration-300 hover:text-[color:var(--pne-brand-600)] hover:after:w-full ${isActive ? 'text-[color:var(--pne-accent)] after:w-full' : ''}`
            : `text-white hover:-translate-y-0.5 hover:text-[color:var(--pne-accent)] ${isActive ? '-translate-y-0.5 text-[color:var(--pne-accent)]' : ''}`
        }`}
      >
        {children}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile overlay to enable outside-click close */}
      <button
        type="button"
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-opacity md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      <header
        ref={headerRef}
        className="absolute top-0 right-0 left-0 z-50 bg-transparent"
        aria-label="Site Header"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Mobile: Menu button on left, Logo on right */}
            <div className="flex w-full items-center justify-between md:hidden">
              <button
                type="button"
                aria-label="Toggle Navigation"
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white"
                onClick={() => setOpen(s => !s)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <div className="flex-shrink-0">
                <Link href="/" aria-label="PNE Homes">
                  <Image
                    src={headerConfig.logo}
                    alt="PNE Homes Logo"
                    width={320} // aspect ratio with height
                    height={80}
                    priority
                    className="h-auto w-28 object-contain md:w-36 lg:w-48"
                    sizes="(min-width: 1024px) 12rem, (min-width: 768px) 9rem, 7rem"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop: Logo on left */}
            <div className="hidden flex-shrink-0 md:block">
              <Link href="/" aria-label="PNE Homes">
                <Image
                  src={headerConfig.logo}
                  alt="PNE Homes Logo"
                  width={320}
                  height={80}
                  priority
                  className="h-auto w-28 object-contain md:w-36 lg:w-48"
                  sizes="(min-width: 1024px) 12rem, (min-width: 768px) 9rem, 7rem"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-3 md:flex lg:gap-6 xl:gap-8">
              {headerConfig.navigation.map((item: string, index: number) => {
                if (index === 5) {
                  // "Services" drop/select
                  return (
                    <div key={index}>
                      <ServicesSelect placeholder={item} />
                    </div>
                  )
                }
                return (
                  <NavLink key={index} href={getRouteForIndex(index, item)}>
                    {item}
                  </NavLink>
                )
              })}
            </nav>

            {/* Desktop: Contact + CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              {headerConfig.phone && (
                <Button
                  asChild
                  size="sm"
                  className="rounded-md border border-transparent bg-[color:var(--pne-accent)] text-white shadow-sm transition-all hover:shadow hover:brightness-110 active:brightness-95"
                >
                  <a href={`tel:${headerConfig.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    <span>{headerConfig.phone}</span>
                  </a>
                </Button>
              )}
              {headerConfig.button && (
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="rounded-md border border-transparent bg-[color:var(--pne-accent)] text-white shadow-sm transition-all hover:shadow hover:brightness-110 active:brightness-95"
                  >
                    {headerConfig.button}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Panel */}
        <div
          id="mobile-nav"
          className={`overflow-hidden bg-white transition-[max-height] duration-300 ease-in-out md:hidden ${open ? 'max-h-screen' : 'max-h-0'}`}
        >
          <div className="space-y-3 px-4 py-4">
            {headerConfig.navigation.map((item: string, index: number) => {
              if (index === 5) {
                return (
                  <div key={index} className="border-b border-gray-200 py-2 last:border-b-0">
                    <ServicesSelect placeholder={item} />
                  </div>
                )
              }
              return (
                <div key={index} className="border-b border-gray-200 py-2 last:border-b-0">
                  <NavLink
                    href={getRouteForIndex(index, item)}
                    onClick={() => setOpen(false)} // close on link click
                    isMobile={true}
                  >
                    {item}
                  </NavLink>
                </div>
              )
            })}
          </div>
        </div>
      </header>
    </>
  )
}
