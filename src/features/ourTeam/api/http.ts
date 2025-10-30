// src/repository/http.ts

/**
 * Very small HTTP helper around fetch with timeout & JSON parsing.
 * You can replace this later with axios or your preferred client.
 */

export class HttpError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export async function getJson<T>(
  url: string,
  init: RequestInit = {},
  timeoutMs = 10000
): Promise<T> {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { Accept: 'application/json', ...(init.headers || {}) },
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new HttpError(
        `GET ${url} failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`,
        res.status
      )
    }
    // Some backends send text/plain with JSON; try/catch to handle both
    const text = await res.text()
    return JSON.parse(text) as T
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new HttpError(`GET ${url} aborted after ${timeoutMs}ms`)
    }
    throw err
  } finally {
    clearTimeout(t)
  }
}
