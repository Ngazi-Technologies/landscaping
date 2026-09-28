import { Fragment, useRef, type ElementType } from 'react'
import { gsap, useScrollScene, EASE_CINEMATIC } from '../lib/motion'

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** 'load' plays immediately (hero), 'scroll' plays when the text enters the viewport. */
  trigger?: 'load' | 'scroll'
  delay?: number
  stagger?: number
  id?: string
}

/**
 * Editorial word-by-word reveal: each word rises from behind a mask.
 * Text stays as real, selectable, screen-reader-friendly text.
 */
export function AnimatedText({ text, as: Tag = 'h2', className = '', trigger = 'scroll', delay = 0, stagger = 0.06, id }: Props) {
  const ref = useRef<HTMLElement>(null)

  useScrollScene(ref, ({ motion }) => {
    if (!motion) return
    const words = ref.current!.querySelectorAll('.word__inner')
    gsap.from(words, {
      yPercent: 110,
      rotate: 3,
      opacity: 0,
      duration: 1.3,
      ease: EASE_CINEMATIC,
      stagger,
      delay,
      scrollTrigger: trigger === 'scroll' ? { trigger: ref.current, start: 'top 85%', once: true } : undefined,
    })
  })

  const lines = text.split('\n')
  return (
    <Tag ref={ref} id={id} className={`animated-text ${className}`}>
      {lines.map((line, li) => (
        <span className="line" key={li}>
          {line.split(' ').map((w, wi) => (
            <Fragment key={wi}>
              <span className="word">
                <span className="word__inner">{w}</span>
              </span>{' '}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  )
}
