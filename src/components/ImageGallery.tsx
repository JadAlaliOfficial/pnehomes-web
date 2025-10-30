'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/style.css'
import { Badge } from '@/components/ui/badge'
import type React from 'react'

interface ImageGalleryProps {
  images: string[]
  title: string
  maxVisibleImages?: number
}

type PsItem = {
  original: string
  thumb: string
  w: number
  h: number
  alt: string
}

/** --- helpers to keep refs typed (no `any`) --- */
type PswpRef = React.MutableRefObject<HTMLElement | null> | ((el: HTMLElement | null) => void)
const adaptRef = <T extends HTMLElement>(r: PswpRef): React.Ref<T> =>
  r as unknown as React.Ref<T>
/** ------------------------------------------- */

const normalizeGoogleUrl = (u: string): string => {
  const m1 = u.match(/https?:\/\/lh3\.googleusercontent\.com\/d\/([^/?#]+)/i)
  if (m1?.[1]) return `https://lh3.googleusercontent.com/d/${m1[1]}=s0`

  const m2 = u.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/i)
  if (m2?.[1]) return `https://drive.google.com/uc?export=view&id=${m2[1]}`

  return u
}

const toNextImageUrl = (src: string, w = 3840, q = 90) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`

const toThumb = (u: string): string => {
  const m = u.match(/https?:\/\/lh3\.googleusercontent\.com\/d\/([^/?#]+)/i)
  if (m?.[1]) return `https://lh3.googleusercontent.com/d/${m[1]}=w400`
  return u
}

// keep this outside the component to avoid re-creating on each render
const galleryOptions = {
  wheelToZoom: true,
  zoom: true,
  pswpModule: () => import('photoswipe'),
}

export default function ImageGallery({
  images,
  title,
  maxVisibleImages = 3,
}: ImageGalleryProps) {
  const items: PsItem[] = useMemo(
    () =>
      images.map((src) => {
        const normalized = normalizeGoogleUrl(src)
        return {
          original: toNextImageUrl(normalized),
          thumb: toThumb(src),
          w: 1600,
          h: 900,
          alt: title,
        }
      }),
    [images, title]
  )

  const visible = items.slice(0, maxVisibleImages)
  const hidden = items.slice(maxVisibleImages)
  const remaining = Math.max(0, images.length - maxVisibleImages)

  return (
    <Gallery withCaption options={galleryOptions}>
      {/* Pre-register hidden slides so lightbox can navigate to them */}
      {hidden.map((it, i) => (
        <Item
          key={`hidden-${i}`}
          original={it.original}
          thumbnail={it.thumb}
          width={it.w}
          height={it.h}
          caption={it.alt}
        >
          {({ ref }) => (
            <span ref={adaptRef<HTMLSpanElement>(ref as PswpRef)} style={{ display: 'none' }} />
          )}
        </Item>
      ))}

      <div>
        {/* Main image */}
        {visible[0] && (
          <Item
            original={visible[0].original}
            thumbnail={visible[0].thumb}
            width={visible[0].w}
            height={visible[0].h}
            caption={visible[0].alt}
          >
            {({ ref, open }) => (
              <div
                ref={adaptRef<HTMLDivElement>(ref as PswpRef)}
                className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg"
                onClick={open}
              >
                <Image
                  src={images[0]}
                  alt={title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(min-width:1024px) 66vw, 100vw"
                  priority
                />
              </div>
            )}
          </Item>
        )}

        {/* Thumbnails */}
        {visible.length > 1 && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {visible.slice(1).map((it, i, arr) => (
              <Item
                key={`thumb-${i}`}
                original={it.original}
                thumbnail={it.thumb}
                width={it.w}
                height={it.h}
                caption={it.alt}
              >
                {({ ref, open }) => (
                  <div
                    ref={adaptRef<HTMLDivElement>(ref as PswpRef)}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-md"
                    onClick={open}
                  >
                    <Image
                      src={images[i + 1]}
                      alt={`${title} photo ${i + 2}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(min-width:1024px) 16vw, 25vw"
                    />
                    {i === arr.length - 1 && remaining > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 font-semibold text-black"
                        >
                          +{remaining} more
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </Item>
            ))}
          </div>
        )}
      </div>
    </Gallery>
  )
}
