'use client'


import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'


/** ---- TS: add Cognito to the Window type ---- */
declare global {
  interface Window {
    Cognito?: {
      prefill?: (values: Record<string, unknown>) => void
      mount?: (
        formId: string,
        selector: string
      ) => { prefill?: (values: Record<string, unknown>) => void }
    }
  }
}
/** -------------------------------------------- */


function CognitoEmbed() {
  const searchParams = useSearchParams()
  const messageParam = (searchParams.get('message') || '').trim()


  const containerId = useMemo(
    () => `cognito-form-${Math.random().toString(36).slice(2)}`,
    []
  )
  const containerRef = useRef<HTMLDivElement | null>(null)


  // Helper to apply prefill using the mount API (robust for React)
  const applyPrefill = () => {
    if (!messageParam) return
    try {
      // Target this specific embed container and form id "39"
      const api = window.Cognito?.mount?.('39', `#${containerId}`)
      // Nest Message inside Section (replace "Section" with your actual section name)
      api?.prefill?.({ Section: { Message: messageParam } })
      // Fallback: also try the global prefill (harmless if not needed)
      window.Cognito?.prefill?.({ Section: { Message: messageParam } })
    } catch {
      // no-op; we'll try again below if needed
    }
  }



  useEffect(() => {
    const container = containerRef.current
    if (!container) return


    // Avoid double-injecting on Fast Refresh / re-renders
    const existing = container.querySelector('script[data-cognito="seamless"]')
    if (existing) {
      applyPrefill()
      return
    }


    // Clear the container and inject the Seamless script *inside* it
    container.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://www.cognitoforms.com/f/seamless.js'
    script.setAttribute('data-cognito', 'seamless')
    script.setAttribute('data-key', 'pxHkG6m3FkeZ9HUuTLWtiA') // your org key
    script.setAttribute('data-form', '39')                    // your form id
    // Important: don't set async=true; we want predictable load order
    script.addEventListener('load', () => {
      // Call immediately when the loader is ready (during form load)
      applyPrefill()
      // Belt-and-suspenders retries in case the form stream is still attaching
      setTimeout(applyPrefill, 150)
      setTimeout(applyPrefill, 400)
    }, { once: true })


    container.appendChild(script)


    // Optional cleanup on unmount (keeps hot-reloads tidy)
    return () => {
      container.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId])


  // If the URL param changes via client-side navigation, reapply
  useEffect(() => {
    applyPrefill()
    // a second nudge shortly after to catch any late load
    const t = setTimeout(applyPrefill, 150)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageParam])


  return (
    <div
      id={containerId}
      ref={containerRef}
      style={{ border: 0, width: '100%' }}
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
