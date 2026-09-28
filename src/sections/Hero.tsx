import { useRef } from 'react'
import { brand, images } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { GlassButton } from '../components/GlassButton'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { gsap, useScrollScene, EASE_CINEMATIC } from '../lib/motion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useScrollScene(ref, ({ motion }, root) => {
    if (!motion) return
    const media = root.querySelector('.hero__media')
    const img = root.querySelector('.hero__media .media__img')

    // Entrance: the landscape settles into place while the copy rises.
    gsap.fromTo(img, { scale: 1.22 }, { scale: 1.06, duration: 2.8, ease: EASE_CINEMATIC })
    gsap.from(root.querySelectorAll('.hero__eyebrow, .hero__lede, .hero__actions > *, .hero__meta > *'), {
      y: 30,
      opacity: 0,
      duration: 1.4,
      stagger: 0.1,
      delay: 0.7,
      ease: EASE_CINEMATIC,
    })

    // Scroll: image drifts slower than the page, copy lifts away, light dims.
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
    })
    tl.to(media, { yPercent: 22 }, 0)
      .to(root.querySelector('.hero__content'), { yPercent: -18, opacity: 0 }, 0)
      .to(root.querySelector('.hero__veil'), { opacity: 1 }, 0)
      .to(root.querySelector('.hero__meta'), { opacity: 0, y: -40 }, 0)
  })

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <ImageWithFallback image={images.hero} priority sizes="100vw" className="hero__image" />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content container">
        <p className="hero__eyebrow eyebrow eyebrow--light">{brand.tagline}</p>
        <AnimatedText as="h1" id="hero-title" trigger="load" delay={0.25} className="hero__title display" text={'Landscapes crafted\nto be lived in.'} />
        <p className="hero__lede">
          We design, build and care for gardens and outdoor spaces with patience, precision and a deep respect for nature.
        </p>
        <div className="hero__actions">
          <GlassButton href="#contact" variant="light" icon>
            Get a Free Quote
          </GlassButton>
          <GlassButton href="#work" variant="glass">
            Explore Our Work
          </GlassButton>
        </div>
      </div>

      <div className="hero__meta container" aria-hidden="true">
        <span className="hero__scroll">
          <span className="hero__scroll-line" />
          Scroll to explore
        </span>
        <span className="hero__chips">
          <span>Design</span>
          <span>Build</span>
          <span>Care</span>
        </span>
      </div>
    </section>
  )
}
