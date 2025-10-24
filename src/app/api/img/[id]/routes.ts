import { NextRequest } from 'next/server'

function buildCandidates(id: string) {
  // Try thumbnail first (returns a real image), then raw download.
  return [
    `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
    `https://drive.google.com/uc?export=download&id=${id}`,
  ]
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const candidates = buildCandidates(id)

  let lastErr: Error | null = null
  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        // Cache on the server/CDN; tweak to your taste
        next: { revalidate: 3600 },
      })

      if (!res.ok) continue

      // Sometimes Drive returns HTML; guard that out.
      const ct = res.headers.get('content-type') || ''
      if (ct.includes('text/html')) continue

      // Stream body through, preserve type/length if present.
      return new Response(res.body, {
        status: 200,
        headers: {
          'content-type': ct || 'image/jpeg',
          'cache-control':
            'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
        },
      })
    } catch (e: any) {
      lastErr = e
    }
  }

  return new Response(lastErr?.message || 'Image not available', { status: 404 })
}
