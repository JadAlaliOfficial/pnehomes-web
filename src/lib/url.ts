// src/lib/url.ts

export function toNum(v: unknown) {
  if (v == null) return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}
