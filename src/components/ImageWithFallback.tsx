import { useState, type CSSProperties } from 'react'
import type { SiteImage } from '../content/site'

type Props = {
  image: SiteImage
  /** `sizes` attribute – describe the rendered width so the browser picks the right file. */
  sizes?: string
  /** Aspect ratio reserved before load to prevent layout shift, e.g. "4 / 5". Omit when the parent sizes the image. */
  ratio?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  overlay?: 'none' | 'bottom' | 'full' | 'soft'
  style?: CSSProperties
}

const WIDTHS = [480, 768, 1080, 1440, 1920, 2560]

function buildSources(src: string) {
  if (!src.startsWith('https://images.unsplash.com/')) return { src, srcSet: undefined }
  const url = (w: number) => `${src}?auto=format&fit=crop&q=72&w=${w}`
  return { src: url(1440), srcSet: WIDTHS.map((w) => `${url(w)} ${w}w`).join(', ') }
}

/**
 * Responsive image with a soft loading state, graceful fallback, optional overlay
 * and no layout shift. Works with local (/public) and permitted remote images.
 */
export function ImageWithFallback({
  image,
  sizes = '100vw',
  ratio,
  priority = false,
  className = '',
  imgClassName = '',
  overlay = 'none',
  style,
}: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const { src, srcSet } = buildSources(image.src)

  return (
    <div
      className={`media media--${state} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
      data-overlay={overlay}
    >
      {state !== 'error' ? (
        <img
          className={`media__img ${imgClassName}`}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ objectPosition: image.focus }}
          ref={(el) => {
            // Handle images already cached before React attached listeners.
            if (el?.complete && el.naturalWidth > 0 && state === 'loading') setState('loaded')
          }}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      ) : (
        <div className="media__fallback" role="img" aria-label={image.alt}>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path
              d="M24 40c0-12 6-20 16-24-2 12-8 20-16 24Zm0 0C24 30 19 22 9 18c1 10 6 18 15 22Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
