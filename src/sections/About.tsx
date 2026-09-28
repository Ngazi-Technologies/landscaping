import { images, processSteps, services } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { GlassCard } from '../components/GlassCard'
import { ParallaxImage } from '../components/ParallaxImage'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionTransition } from '../components/SectionTransition'

// Figures are derived from the site content itself — nothing invented.
const facts = [
  { value: String(services.length).padStart(2, '0'), label: 'Specialist services' },
  { value: String(processSteps.length).padStart(2, '0'), label: 'Stage clear process' },
  { value: '1:1', label: 'On-site consultation to understand your space' },
]

export function About() {
  return (
    <SectionTransition id="about" tone="cream" className="about" labelledBy="about-title">
      <div className="container about__grid">
        <div className="about__intro">
          <p className="eyebrow">Our approach</p>
          <AnimatedText as="h2" id="about-title" className="display display--lg" text={'Every great garden\nbegins with listening.'} />
          <ScrollReveal className="about__copy" stagger={0.12}>
            <p className="lede">
              We treat every outdoor space as a long-term living composition — shaped around the architecture, the light, the soil and the
              people who will enjoy it.
            </p>
            <p>
              From the first conversation to seasonal care years later, our focus stays the same: thoughtful design, honest craftsmanship and
              landscapes that grow more beautiful with time.
            </p>
          </ScrollReveal>
        </div>

        <div className="about__visual">
          <ParallaxImage image={images.aboutPrimary} className="about__img-main organic" sizes="(min-width: 960px) 40vw, 90vw" speed={10} />
          <ParallaxImage image={images.aboutSecondary} className="about__img-accent" sizes="(min-width: 960px) 18vw, 45vw" speed={16} reveal="center" />
          <GlassCard className="about__badge">
            <span className="about__badge-title">Design · Build · Care</span>
            <span className="about__badge-sub">One considered process</span>
          </GlassCard>
        </div>
      </div>

      <ScrollReveal as="ul" className="container about__facts" stagger={0.12}>
        {facts.map((f) => (
          <li key={f.label} className="fact">
            <span className="fact__value">{f.value}</span>
            <span className="fact__label">{f.label}</span>
          </li>
        ))}
      </ScrollReveal>
    </SectionTransition>
  )
}
