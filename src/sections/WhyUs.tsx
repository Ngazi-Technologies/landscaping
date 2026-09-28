import { images, strengths } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import { ParallaxImage } from '../components/ParallaxImage'
import { ScrollReveal } from '../components/ScrollReveal'

export function WhyUs() {
  return (
    <section className="why" aria-labelledby="why-title">
      <ParallaxImage image={images.whyBackdrop} className="why__bg" sizes="100vw" speed={12} reveal="none" overlay="full" />
      <div className="container why__inner">
        <div className="why__head">
          <p className="eyebrow eyebrow--light">Why choose us</p>
          <AnimatedText as="h2" id="why-title" className="display display--lg" text={'Craft you can see.\nCare you can feel.'} />
        </div>
        <ScrollReveal as="ul" className="why__grid" stagger={0.1} y={60}>
          {strengths.map((s, i) => (
            <li key={s.title} className={`why__cell why__cell--${i}`}>
              <GlassCard interactive tone="dark" className="why-card">
                <span className="why-card__icon">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="why-card__title">{s.title}</h3>
                <p className="why-card__text">{s.body}</p>
              </GlassCard>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
