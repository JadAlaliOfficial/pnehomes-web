'use client'

import { Suspense, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

/** ---- TS: add Cognito to the Window type ---- */
declare global {
  interface Window {
    Cognito?: {
      prefill?: (values: Record<string, unknown>) => void
    }
  }
}
/** -------------------------------------------- */

function CognitoEmbed() {
  const searchParams = useSearchParams()
  const messageParam = searchParams.get('message') || ''

  // CSS-safe id (no colons), stable for the component's lifetime
  const containerId = useMemo(
    () => `cog-iframe-${Math.random().toString(36).slice(2)}`,
    []
  )

  useEffect(() => {
    const iframeSrc = 'https://www.cognitoforms.com/f/iframe.js'

    const loadScriptAndPrefill = () => {
      // Load iframe script if not already loaded
      let script = document.querySelector<HTMLScriptElement>(`script[src="${iframeSrc}"]`)
      
      const prefillForm = () => {
        // Wait for Cognito to be available on window
        if (typeof window !== 'undefined' && window.Cognito && window.Cognito.prefill && messageParam) {
          // Try common field names - update based on your actual field name from Developer Mode
          try {
            // Attempt 1: Simple field name
            window.Cognito.prefill({ Message: messageParam })
          } catch (e) {
            console.error('Prefill failed:', e)
          }
        }
      }

      if (!script) {
        script = document.createElement('script')
        script.src = iframeSrc
        script.async = true
        script.addEventListener('load', () => {
          // Multiple delays to ensure iframe is fully loaded
          setTimeout(prefillForm, 200)
          setTimeout(prefillForm, 500)
          setTimeout(prefillForm, 1000)
        }, { once: true })
        document.body.appendChild(script)
      } else {
        // Script already exists, just prefill with delays
        setTimeout(prefillForm, 200)
        setTimeout(prefillForm, 500)
        setTimeout(prefillForm, 1000)
      }
    }

    loadScriptAndPrefill()

    return () => {
      // Cleanup if needed
    }
  }, [containerId, messageParam])

  return (
    <iframe
      id={containerId}
      src="https://www.cognitoforms.com/f/pxHkG6m3FkeZ9HUuTLWtiA/39"
      allow="payment"
      style={{ border: 0, width: '100%' }}
      height="594"
      title="Contact Form"
    />
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <div className="bg-background min-h-screen">
        {/* Hero */}
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10 bg-[color:var(--pne-brand)]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 text-center">
            <h1 className="text-white mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight uppercase">
              Contact Us
            </h1>
          </div>
        </section>

        <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white p-4 sm:p-6 lg:p-8 shadow-lg dark:bg-gray-800">
              <CognitoEmbed />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
