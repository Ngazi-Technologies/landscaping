import { useRef } from 'react'
import { processSteps } from '../content/site'
import { gsap, ScrollTrigger, useScrollScene, EASE_CINEMATIC } from '../lib/motion'
import { ImageWithFallback } from './ImageWithFallback'

/**
 * Desktop: the section pins while each stage wipes in over the last, and the
 * step list lights up in sequence. Mobile: a vertical, image-led timeline
 * whose rail fills as you scroll.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null)

  useScrollScene(ref, ({ motion, desktop }, root) => {
    const steps = Array.from(root.querySelectorAll<HTMLElement>('.step'))
    const setActive = (idx: number) => steps.forEach((s, i) => s.classList.toggle('is-active', i === idx))
    setActive(0)

    if (!motion) {
      steps.forEach((s) => s.classList.add('is-active'))
      return
    }

    if (desktop) {
      const imgs = gsap.utils.toArray<HTMLElement>('.process__img', root)
      const nums = gsap.utils.toArray<HTMLElement>('.process__numeral span', root)
      const n = imgs.length
      gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(nums.slice(1), { yPercent: 100 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.querySelector('.process__pin'),
          start: 'top top',
          end: () => `+=${window.innerHeight * (n - 1) * 0.85}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.3, max: 0.8 }, ease: 'power2.inOut', delay: 0.05 },
          onUpdate: (self) => setActive(Math.round(self.progress * (n - 1))),
        },
      })
      tl.fromTo(root.querySelector('.process__rail-fill'), { scaleY: 0 }, { scaleY: 1, duration: n - 1 }, 0)
      imgs.forEach((img, i) => {
        if (i === 0) return
        const at = i - 1
        tl.to(img, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, at)
          .fromTo(img.querySelector('.media__img'), { scale: 1.2 }, { scale: 1, duration: 1 }, at)
          .to(imgs[i - 1].querySelector('.media__img'), { scale: 0.92, duration: 1 }, at)
          .to(nums[i - 1], { yPercent: -100, duration: 0.5 }, at + 0.25)
          .to(nums[i], { yPercent: 0, duration: 0.5 }, at + 0.25)
      })
      return
    }

    // Mobile
    gsap.fromTo(
      root.querySelector('.process__rail-fill'),
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.querySelector('.process__steps'), start: 'top 70%', end: 'bottom 70%', scrub: true },
      },
    )
    steps.forEach((step, i) => {
      gsap.from(step.querySelector('.step__media'), {
        clipPath: 'inset(0% 0% 100% 0% round 24px)',
        duration: 1.4,
        ease: EASE_CINEMATIC,
        scrollTrigger: { trigger: step, start: 'top 85%', once: true },
      })
      gsap.from(step.querySelectorAll('.step__num, .step__title, .step__text'), {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          once: true,
        },
      })
      const onEnter = () => setActive(i)
      ScrollTrigger.create({ trigger: step, start: 'top 60%', end: 'bottom 60%', onEnter, onEnterBack: onEnter })
    })
  })

  return (
    <div ref={ref} className="process">
      <div className="process__pin">
        <div className="process__visual" aria-hidden="true">
          {processSteps.map((s, i) => (
            <div className="process__img" key={s.id} style={{ zIndex: i + 1 }}>
              <ImageWithFallback image={s.image} sizes="(min-width: 960px) 50vw, 1px" overlay="soft" />
            </div>
          ))}
          <div className="process__numeral">
            {processSteps.map((s, i) => (
              <span key={s.id}>{String(i + 1).padStart(2, '0')}</span>
            ))}
          </div>
        </div>

        <div className="process__list">
          <span className="process__rail" aria-hidden="true">
            <span className="process__rail-fill" />
          </span>
          <ol className="process__steps">
            {processSteps.map((s, i) => (
              <li className="step" key={s.id}>
                <div className="step__media">
                  <ImageWithFallback image={s.image} sizes="(min-width: 960px) 1px, 90vw" ratio="4 / 3" overlay="soft" />
                </div>
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="step__copy">
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
