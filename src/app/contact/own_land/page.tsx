'use client'

import { useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Type definition for Cognito Forms API
interface CognitoWindow extends Window {
  Cognito?: {
    prefill: (data: Record<string, unknown>) => void
  }
}

export default function OwnLandContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <OwnLandContactForm />
    </Suspense>
  )
}

function OwnLandContactForm() {
  const searchParams = useSearchParams()
  const messageParam = searchParams.get('message') || ''
  const containerRef = useRef<HTMLDivElement>(null)
  const injectedRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Inject the embed script exactly once, and place it where we want the form to render
    if (!injectedRef.current) {
      const script = document.createElement('script')
      script.src = 'https://www.cognitoforms.com/f/seamless.js'
      script.async = true
      script.setAttribute('data-key', 'pxHkG6m3FkeZ9HUuTLWtiA')
      script.setAttribute('data-form', '40')

      // Append the script *inside* the container so the form renders there
      containerRef.current.appendChild(script)
      injectedRef.current = true
    }

    // If a message is present, try to prefill once Cognito is available
    if (messageParam) {
      const start = Date.now()
      const timer = setInterval(() => {
        const w = window as CognitoWindow
        if (w.Cognito && typeof w.Cognito.prefill === 'function') {
          w.Cognito.prefill({ Message: messageParam })
          clearInterval(timer)
        }
        // stop trying after 5s
        if (Date.now() - start > 5000) clearInterval(timer)
      }, 100)
      return () => clearInterval(timer)
    }
  }, [messageParam])

  return (
    <div className="bg-background min-h-screen">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[color:var(--pne-brand)]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 text-center">
          <h1 className="text-white mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight uppercase">
            Contact Us - Own Land
          </h1>
        </div>
      </section>

      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-4 sm:p-6 lg:p-8 shadow-lg dark:bg-gray-800">
            {/* Place the script here via ref so the form renders in this card */}
            <div id="cognito-form-container" ref={containerRef} />
          </div>
        </div>
      </div>
    </div>
  )
}
