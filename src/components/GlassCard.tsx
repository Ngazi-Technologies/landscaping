import { useEffect, useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { gsap } from '../lib/motion'

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  children: ReactNode
  /** Subtle 3D tilt + light that follows the cursor (fine pointers only). */
  interactive?: boolean
  tone?: 'light' | 'dark'
}

/**
 * iOS-inspired glass surface: translucent fill, backdrop blur, hairline border,
 * inner highlight and layered soft shadow. Restrained by design.
 */
export function GlassCard({ as: Tag = 'div', children, interactive = false, tone = 'light', className = '', ...rest }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !interactive) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    gsap.set(el, { transformPerspective: 1000 })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      ry((x - 0.5) * 5)
      rx((0.5 - y) * 5)
    }
    const leave = () => {
      rx(0)
      ry(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [interactive])

  return (
    <Tag ref={ref} className={`glass glass--${tone} ${interactive ? 'glass--interactive' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
