// src/components/SharePrintButtons.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

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
        window.prompt("Copy this link:", shareData.url)
      }
    } catch {
      window.prompt("Copy this link:", shareData.url)
    }
  }

  function handlePrint() {
    try { window.print() } catch {}
  }

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      <div className="w-full">
      <Button
        type="button"
        variant="outline"
        onClick={handleShare}
        className="w-full"
        aria-label="Share this property"
      >
        <span aria-hidden>🔗</span>
        <span className="ml-2">{copied ? "Link copied!" : "Share"}</span>
      </Button>
      </div>
      <div className="w-full">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrint}
          className="w-full"
          aria-label="Print this page"
        >
          <span aria-hidden>🖨️</span>
          <span className="ml-2">Print</span>
        </Button>
      </div>
    </div>
  )
}
