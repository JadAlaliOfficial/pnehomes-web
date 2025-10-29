// Lightweight HTTP client with JSON + typed errors
export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public payload?: unknown
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export interface RequestOptions extends RequestInit {
  timeoutMs?: number
}

function isAbortError(e: unknown): boolean {
  // Covers both DOMException AbortError and fetch polyfills that set a name
  return (
    (e instanceof DOMException && e.name === 'AbortError') ||
    (typeof e === 'object' &&
      e !== null &&
      (e as { name?: unknown }).name === 'AbortError')
  )
}

export async function httpGetJson<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { timeoutMs = 15000, ...rest } = options
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      ...rest,
      signal: controller.signal,
      cache: 'no-store',         // Disable Next.js caching
      next: { revalidate: 0 },   // Force revalidation on every request
    })

    const contentType = res.headers.get('content-type') ?? ''
    const isJson = contentType.includes('application/json')
    const body = (isJson ? await res.json() : await res.text()) as unknown

    if (!res.ok) {
      throw new HttpError(`GET ${url} failed with ${res.status}`, res.status, body)
    }
    return body as T
  } catch (err: unknown) {
    if (isAbortError(err)) {
      throw new HttpError(`GET ${url} timed out`, 408)
    }
    if (err instanceof HttpError) throw err

    const msg = err instanceof Error ? err.message : String(err)
    throw new HttpError(`GET ${url} failed: ${msg}`, 500)
  } finally {
    clearTimeout(id)
  }
}
