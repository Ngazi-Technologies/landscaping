import { useRef } from 'react'
import type { SiteImage } from '../content/site'
import { gsap, useScrollScene, EASE_CINEMATIC } from '../lib/motion'
import { ImageWithFallback } from './ImageWithFallback'

type Props = {
  image: SiteImage
  sizes?: string
  ratio?: string
  className?: string
  /** Parallax travel as a percentage of the image height. */
  speed?: number
  /** Reveal the frame with a rising rounded mask when it enters the viewport. */
  reveal?: 'none' | 'up' | 'center'
  overlay?: 'none' | 'bottom' | 'full' | 'soft'
  priority?: boolean
}

/**
 * Rounded frame whose image drifts at a different speed from the page,
 * creating depth. Optional masked reveal on first entry.
 */
export function ParallaxImage({ image, sizes, ratio, className = '', speed = 10, reveal = 'up', overlay = 'none', priority }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useScrollScene(ref, ({ motion }) => {
    if (!motion) return
    const frame = ref.current!
    const inner = frame.querySelector('.parallax__inner')

    if (speed) {
      const travel = () => (frame.offsetHeight * speed) / 100
      gsap.fromTo(
        inner,
        { y: () => -travel() },
        {
          y: () => travel(),
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        },
      )
    }

    if (reveal !== 'none') {
      const r = parseFloat(getComputedStyle(frame).borderTopLeftRadius) || 28
      const from = reveal === 'up' ? `inset(100% 0% 0% 0% round ${r}px)` : `inset(14% 14% 14% 14% round ${r}px)`
      gsap.fromTo(
        frame,
        { clipPath: from },
        {
          clipPath: `inset(0% 0% 0% 0% round ${r}px)`,
          clearProps: 'clipPath',
          duration: 1.6,
          ease: EASE_CINEMATIC,
          scrollTrigger: { trigger: frame, start: 'top 88%', once: true },
        },
      )
      gsap.from(frame.querySelector('.media__img'), {
        scale: 1.25,
        duration: 2,
        ease: EASE_CINEMATIC,
        scrollTrigger: { trigger: frame, start: 'top 88%', once: true },
      })
    }
  })

  return (
    <div ref={ref} className={`parallax ${className}`} style={{ aspectRatio: ratio }}>
      <div className="parallax__inner" style={{ ['--pspeed' as string]: `${speed}%` }}>
        <ImageWithFallback image={image} sizes={sizes} overlay={overlay} priority={priority} className="parallax__media" />
      </div>
    </div>
  )
}
