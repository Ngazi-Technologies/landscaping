import type { Service } from '../content/site'
import { GlassCard } from './GlassCard'
import { Icon } from './Icon'
import { ImageWithFallback } from './ImageWithFallback'
import { scrollToTarget } from '../lib/motion'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <GlassCard as="article" interactive tone="dark" className="service-card" aria-labelledby={`svc-${service.id}`}>
      <div className="service-card__media">
        <ImageWithFallback
          image={service.image}
          sizes="(min-width: 1200px) 22vw, (min-width: 960px) 30vw, 80vw"
          className="service-card__img"
          overlay="bottom"
        />
        <span className="service-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="service-card__body">
        <span className="service-card__icon">
          <Icon name={service.icon} />
        </span>
        <h3 id={`svc-${service.id}`} className="service-card__title">
          {service.title}
        </h3>
        <p className="service-card__text">{service.description}</p>
        <a
          href="#contact"
          className="service-card__link"
          onClick={(e) => {
            e.preventDefault()
            scrollToTarget('#contact')
            const select = document.querySelector<HTMLSelectElement>('#field-service')
            if (select) select.value = service.title
          }}
        >
          Enquire <span className="visually-hidden">about {service.title}</span>
          <Icon name="arrowUpRight" size={16} />
        </a>
      </div>
    </GlassCard>
  )
}
