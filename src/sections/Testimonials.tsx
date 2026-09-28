import { testimonials } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { GlassButton } from '../components/GlassButton'
import { GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import { ScrollReveal } from '../components/ScrollReveal'

/** Renders real testimonials from content/site.ts. Shows a tasteful invitation while none exist. */
export function Testimonials() {
  const has = testimonials.length > 0
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <p className="eyebrow">Client stories</p>
        <AnimatedText as="h2" id="testimonials-title" className="display display--md" text="In their words." />

        {has ? (
          <ScrollReveal as="ul" className="testimonials__list" stagger={0.1}>
            {testimonials.map((t) => (
              <li key={t.name}>
                <GlassCard as="figure" className="quote-card">
                  <Icon name="quote" className="quote-card__mark" size={28} />
                  <blockquote>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption>
                    <span className="quote-card__name">{t.name}</span>
                    {t.context && <span className="quote-card__ctx">{t.context}</span>}
                  </figcaption>
                </GlassCard>
              </li>
            ))}
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <GlassCard className="testimonials__empty">
              <Icon name="quote" size={32} className="quote-card__mark" />
              <p className="testimonials__empty-text">
                We are gathering stories from the people whose gardens we've shaped. Worked with us recently? We'd love to hear from you.
              </p>
              <GlassButton href="#contact" variant="ghost" icon>
                Share your experience
              </GlassButton>
            </GlassCard>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
