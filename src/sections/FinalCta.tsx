import { useRef } from 'react'
import { images } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { GlassButton } from '../components/GlassButton'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { gsap, useScrollScene } from '../lib/motion'

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)

  useScrollScene(ref, ({ motion, desktop }, root) => {
    if (!motion) return
    const frame = root.querySelector('.final__frame')
    const inset = desktop ? '8% 10% 8% 10%' : '4% 5% 4% 5%'
    gsap
      .timeline({ scrollTrigger: { trigger: root, start: 'top 90%', end: 'center center', scrub: true } })
      .fromTo(frame, { clipPath: `inset(${inset} round 48px)` }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' }, 0)
      .fromTo(root.querySelector('.final__frame .media__img'), { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)
  })

  return (
    <section ref={ref} className="final" aria-labelledby="final-title">
      <div className="final__frame">
        <ImageWithFallback image={images.finalCta} sizes="100vw" overlay="full" className="final__media" />
        <div className="final__content container">
          <AnimatedText as="h2" id="final-title" className="display display--xl" text={"Let's create\nsomething beautiful."} />
          <p className="lede">Tell us about your space. We'll arrange a consultation and a clear, no-obligation quote.</p>
          <GlassButton href="#contact" variant="light" icon>
            Get a Free Quote
          </GlassButton>
        </div>
      </div>
    </section>
  )
}
