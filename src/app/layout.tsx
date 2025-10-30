import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/features/home/components/homeLayout/Header'
import { Footer } from '@/features/home/components/homeLayout/Footer'
import { ComparisonProvider } from '@/contexts/ComparisonContext'
import ComparisonDrawer from '@/components/ComparisonDrawer'
import ComparisonFloatingButton from '@/components/ComparisonFloatingButton'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PNE Homes - Quality Home Builders',
  description: 'Building quality homes with exceptional craftsmanship and attention to detail.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col text-[color:var(--pne-text)] antialiased`}
        suppressHydrationWarning={true}
      >
        <ComparisonProvider>
          {/* Fixed, transparent header positioned above main content */}
          <Header />
          <main className="relative flex-1">{children}</main>
          <div className="relative z-30">
            <Footer />
          </div>
          <ComparisonDrawer />
          <ComparisonFloatingButton />
        </ComparisonProvider>
      </body>
    </html>
  )
}
