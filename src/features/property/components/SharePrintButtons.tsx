// src/components/SharePrintButtons.tsx
"use client"

import { useState } from "react"

type Props = {
  title: string
  text?: string
  className?: string
}

export default function SharePrintButtons({ title, text, className }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shareData = { title, text, url: window.location.href }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // user canceled or share failed — fall through to clipboard
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } else {
        // Legacy fallback
        // eslint-disable-next-line no-alert
        window.prompt("Copy this link:", shareData.url)
      }
    } catch {
      // eslint-disable-next-line no-alert
      window.prompt("Copy this link:", shareData.url)
    }
  }

  function handlePrint() {
    try { window.print() } catch {}
  }

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 w-full"
        aria-label="Share this property"
      >
        <span aria-hidden>🔗</span>
        <span className="ml-2">{copied ? "Link copied!" : "Share"}</span>
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 w-full"
        aria-label="Print this page"
      >
        <span aria-hidden>🖨️</span>
        <span className="ml-2">Print</span>
      </button>
    </div>
  )
}
