import { brand, contact, images, services } from '../content/site'

/** schema.org LocalBusiness data generated from the content config. */
export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'https://en.wikipedia.org/wiki/Landscaping',
    name: brand.name,
    description: brand.description,
    url: brand.siteUrl,
    image: `${images.hero.src}?w=1200&q=80&auto=format`,
    telephone: contact.phone,
    email: contact.email,
    address: { '@type': 'PostalAddress', addressLocality: contact.location },
    areaServed: contact.serviceArea,
    sameAs: contact.social.filter((s) => s.href).map((s) => s.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Landscaping services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.description } })),
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
