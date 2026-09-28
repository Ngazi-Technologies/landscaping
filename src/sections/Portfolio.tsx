import { projects } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { GlassButton } from '../components/GlassButton'
import { PortfolioCard } from '../components/PortfolioCard'
import { ScrollReveal } from '../components/ScrollReveal'

export function Portfolio() {
  return (
    <section id="work" className="portfolio" aria-labelledby="work-title">
      <div className="container portfolio__head">
        <div>
          <p className="eyebrow">Selected work</p>
          <AnimatedText as="h2" id="work-title" className="display display--xl" text={'Spaces that\nfeel inevitable.'} />
        </div>
        <ScrollReveal className="portfolio__intro" delay={0.15}>
          <p className="lede">
            Gardens, lawns and outdoor rooms designed to belong to their architecture — calm, balanced and made to mature beautifully.
          </p>
          {/* PLACEHOLDER — remove this note once real project photography is added in src/content/site.ts */}
          <p className="note">Imagery shown represents the styles of work we deliver. Our project gallery is being updated.</p>
        </ScrollReveal>
      </div>

      <div className="container portfolio__grid">
        {projects.map((p) => (
          <PortfolioCard key={p.id} project={p} />
        ))}
      </div>

      <ScrollReveal className="container portfolio__cta">
        <p>Have a space in mind?</p>
        <GlassButton href="#contact" icon>
          Start your project
        </GlassButton>
      </ScrollReveal>
    </section>
  )
}
