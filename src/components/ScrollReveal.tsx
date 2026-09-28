import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useScrollScene } from '../lib/motion'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Animate direct children one after another instead of the wrapper as a whole. */
  stagger?: number
  y?: number
  delay?: number
  start?: string
  id?: string
}

/** Fade-and-rise reveal on scroll. Content is fully visible without JS or with reduced motion. */
export function ScrollReveal({ children, as: Tag = 'div', className = '', stagger, y = 40, delay = 0, start = 'top 85%', id }: Props) {
  const ref = useRef<HTMLElement>(null)

  useScrollScene(ref, ({ motion }) => {
    if (!motion) return
    const el = ref.current!
    const targets = stagger ? Array.from(el.children) : el
    gsap.from(targets, {
      y,
      opacity: 0,
      duration: 1.2,
      delay,
      stagger: stagger ?? 0,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start, once: true },
    })
  })

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  )
}
