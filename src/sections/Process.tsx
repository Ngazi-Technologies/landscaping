import { processSteps } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { ProcessTimeline } from '../components/ProcessTimeline'
import { ScrollReveal } from '../components/ScrollReveal'

export function Process() {
  return (
    <section id="process" className="process-section" aria-labelledby="process-title">
      <div className="container process-section__head">
        <p className="eyebrow">Our process</p>
        <AnimatedText as="h2" id="process-title" className="display display--lg" text={'From first idea\nto living landscape.'} />
        <ScrollReveal as="ol" className="process-flow" stagger={0.08} aria-label="Process overview">
          {processSteps.map((s, i) => (
            <li key={s.id}>
              <span>{s.title}</span>
              {i < processSteps.length - 1 && <span className="process-flow__arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ScrollReveal>
      </div>
      <ProcessTimeline />
    </section>
  )
}
