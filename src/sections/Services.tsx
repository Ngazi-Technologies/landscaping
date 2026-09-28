import { useRef } from 'react'
import { images, services } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { ScrollReveal } from '../components/ScrollReveal'
import { ServiceCard } from '../components/ServiceCard'
import { gsap, useScrollScene, EASE_CINEMATIC } from '../lib/motion'

export function Services() {
  const ref = useRef<HTMLElement>(null)

  useScrollScene(ref, ({ motion, desktop }, root) => {
    if (!motion) return
    const cards = gsap.utils.toArray<HTMLElement>('.service-card', root)

    gsap.fromTo(
      root.querySelector('.services__backdrop'),
      { yPercent: -8, scale: 1.1 },
      { yPercent: 8, scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } },
    )

    if (desktop) {
      gsap.from(cards, {
        y: 90,
        opacity: 0,
        rotationX: 8,
        transformOrigin: '50% 100%',
        duration: 1.4,
        ease: EASE_CINEMATIC,
        stagger: { each: 0.08, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: root.querySelector('.services__grid'), start: 'top 80%', once: true },
      })
      // Alternate columns drift at slightly different speeds for depth.
      cards.forEach((card, i) => {
        if (i % 2 === 0) return
        gsap.fromTo(
          card.parentElement,
          { y: 40 },
          { y: -40, ease: 'none', scrollTrigger: { trigger: root.querySelector('.services__grid'), start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    } else {
      gsap.from(cards, {
        opacity: 0,
        x: 60,
        duration: 1.2,
        stagger: 0.1,
        ease: EASE_CINEMATIC,
        scrollTrigger: { trigger: root.querySelector('.services__grid'), start: 'top 85%', once: true },
      })
    }
  })

  return (
    <section ref={ref} id="services" className="services" aria-labelledby="services-title">
      <div className="services__bg" aria-hidden="true">
        <ImageWithFallback image={images.servicesBackdrop} className="services__backdrop" sizes="100vw" />
      </div>

      <div className="container services__head">
        <div>
          <p className="eyebrow eyebrow--light">Services</p>
          <AnimatedText as="h2" id="services-title" className="display display--lg" text={'Everything your\nlandscape needs.'} />
        </div>
        <ScrollReveal as="p" className="lede services__lede" delay={0.2}>
          Eight specialist services, delivered with the same care — whether you are starting from bare soil or refining a garden you already love.
        </ScrollReveal>
      </div>

      <ul className="container services__grid" aria-label="Our services">
        {services.map((s, i) => (
          <li key={s.id} className="services__cell">
            <ServiceCard service={s} index={i} />
          </li>
        ))}
      </ul>
      <p className="services__hint container" aria-hidden="true">
        Swipe to explore →
      </p>
    </section>
  )
}
