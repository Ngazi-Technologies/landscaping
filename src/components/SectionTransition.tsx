import { useRef, type ReactNode } from 'react'
import { gsap, useScrollScene } from '../lib/motion'

type Props = {
  id?: string
  className?: string
  children: ReactNode
  /** Background tone of the incoming section. */
  tone?: 'cream' | 'sand' | 'forest'
  labelledBy?: string
}

/**
 * A section that slides up over the previous one with rounded shoulders,
 * gently widening into place — so sections feel layered rather than stacked.
 */
export function SectionTransition({ id, className = '', children, tone = 'cream', labelledBy }: Props) {
  const ref = useRef<HTMLElement>(null)

  useScrollScene(ref, ({ motion }) => {
    if (!motion) return
    const el = ref.current!
    gsap.fromTo(
      el.querySelector('.stage__surface'),
      { scaleX: 0.94, y: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: true },
      },
    )
  })

  return (
    <section ref={ref} id={id} className={`stage stage--${tone} ${className}`} aria-labelledby={labelledBy}>
      <div className="stage__surface" aria-hidden="true" />
      <div className="stage__content">{children}</div>
    </section>
  )
}
