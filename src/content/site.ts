/**
 * Central content configuration.
 *
 * Everything a non-developer would want to change lives here: brand details,
 * contact info, service copy and imagery. Values marked `PLACEHOLDER` must be
 * replaced with real company information before launch.
 *
 * Imagery: temporary photography is sourced from Unsplash (https://unsplash.com/license —
 * free for commercial use, no permission needed). Swap any `src` for a local file
 * (e.g. "/images/projects/courtyard.jpg" placed in /public) or another permitted URL.
 */

export type SiteImage = {
  src: string
  alt: string
  /** Optional focal point for object-position, e.g. "50% 30%". */
  focus?: string
}

const unsplash = (id: string, alt: string, focus?: string): SiteImage => ({
  src: `https://images.unsplash.com/${id}`,
  alt,
  focus,
})

export const brand = {
  name: 'Perfect Edge Landscapes',
  shortName: 'Perfect Edge',
  tagline: 'Landscape design, build & care',
  description:
    'Landscape design, garden installation and ongoing care for homes and outdoor spaces — crafted with patience, precision and respect for nature.',
  siteUrl: 'https://www.example.com', // PLACEHOLDER — production URL (used for SEO metadata)
}

export const contact = {
  phone: '+61 452 642 233',
  phoneHref: 'tel:+61452642233',
  email: 'perfectedgelandscapessydney@gmail.com',
  location: 'Liverpool & South-West Sydney, NSW, Australia',
  serviceArea: 'Serving homes and businesses across South-West Sydney',
  hours: 'Open 24 hours',
  /**
   * International format, digits only (e.g. '61452642233'). Leave empty to hide WhatsApp.
   * Hidden until the business confirms a WhatsApp number.
   */
  whatsapp: '',
  /**
   * Optional form endpoint (Formspree, Netlify, your own API…). Receives a JSON POST.
   * When empty, the form falls back to opening the visitor's email client.
   */
  formEndpoint: '',
  /** Only listed networks are rendered. Leave `href` empty to hide. */
  social: [
    { label: 'Instagram', href: '' },
    { label: 'Facebook', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'Pinterest', href: '' },
  ],
}

export const images = {
  hero: unsplash('photo-1558904541-efa843a96f01', 'A manicured garden with sculpted hedges and a lush green lawn', '50% 60%'),
  aboutPrimary: unsplash('photo-1585320806297-9794b3e4eeae', 'A stone path winding through layered garden planting'),
  aboutSecondary: unsplash('photo-1466692476868-aef1dfb1e735', 'Hands planting a young seedling in rich soil'),
  servicesBackdrop: unsplash('photo-1441974231531-c6227db76b6e', 'Sunlight filtering through a canopy of trees'),
  whyBackdrop: unsplash('photo-1500382017468-9049fed747ef', 'Soft light over open green landscape'),
  finalCta: unsplash('photo-1600585154340-be6161a56a0c', 'A modern home framed by a landscaped garden at dusk'),
}

export type Service = {
  id: string
  title: string
  description: string
  icon: IconName
  image: SiteImage
}

export type IconName =
  | 'design'
  | 'install'
  | 'lawn'
  | 'maintain'
  | 'water'
  | 'tree'
  | 'living'
  | 'consult'

export const services: Service[] = [
  {
    id: 'landscape-design',
    title: 'Landscape Design',
    description: 'Considered plans that balance structure, planting and the way you want to live outdoors.',
    icon: 'design',
    image: unsplash('photo-1613490493576-7fde63acd811', 'Contemporary landscape design surrounding a modern residence'),
  },
  {
    id: 'garden-installation',
    title: 'Garden Installation',
    description: 'From soil preparation to the final plant — built carefully, and built to last.',
    icon: 'install',
    image: unsplash('photo-1416879595882-3373a0480b5b', 'Young plants prepared for garden installation'),
  },
  {
    id: 'lawn-care',
    title: 'Lawn Care',
    description: 'Healthy, even lawns through proper mowing, feeding, aeration and seasonal treatment.',
    icon: 'lawn',
    image: unsplash('photo-1598902108854-10e335adac99', 'A healthy, freshly maintained green lawn'),
  },
  {
    id: 'garden-maintenance',
    title: 'Garden Maintenance',
    description: 'Scheduled care that keeps every bed, border and hedge looking its best year-round.',
    icon: 'maintain',
    image: unsplash('photo-1591857177580-dc82b9ac4e1e', 'A gardener tending to garden beds'),
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    description: 'Efficient watering systems designed around your plants, soil and local climate.',
    icon: 'water',
    image: unsplash('photo-1592150621744-aca64f48394a', 'Water droplets on fresh green foliage'),
  },
  {
    id: 'tree-plant-care',
    title: 'Tree & Plant Care',
    description: 'Pruning, shaping and plant health care that respects how each species grows.',
    icon: 'tree',
    image: unsplash('photo-1523348837708-15d4a09cfac2', 'Close view of healthy plants and foliage'),
  },
  {
    id: 'outdoor-living',
    title: 'Outdoor Living Spaces',
    description: 'Patios, terraces, pathways and lighting that extend your home into the garden.',
    icon: 'living',
    image: unsplash('photo-1600210492486-724fe5c67fb0', 'An outdoor living area with seating surrounded by greenery'),
  },
  {
    id: 'consultation',
    title: 'Landscaping Consultation',
    description: 'An expert walk-through of your space, with honest advice and clear next steps.',
    icon: 'consult',
    image: unsplash('photo-1470058869958-2a77ade41c02', 'A flourishing garden in soft natural light'),
  },
]

export const processSteps = [
  {
    id: 'consult',
    title: 'Consult',
    summary: 'We visit, listen and understand your space, your style and how you want to use it.',
    image: unsplash('photo-1605276374104-dee2a0ed3cd6', 'A garden space ready to be assessed'),
  },
  {
    id: 'design',
    title: 'Design',
    summary: 'A tailored concept: layout, planting palette, materials and a transparent quote.',
    image: unsplash('photo-1558293842-c0fd3db86157', 'Detailed garden planting composition'),
  },
  {
    id: 'build',
    title: 'Build',
    summary: 'Our team prepares the ground and builds with care, keeping you informed throughout.',
    image: unsplash('photo-1611843467160-25afb8df1074', 'Landscape construction and hardscaping detail'),
  },
  {
    id: 'transform',
    title: 'Transform',
    summary: 'Planting, finishing and the final details that bring the whole space to life.',
    image: unsplash('photo-1580587771525-78b9dba3b914', 'A completed landscape surrounding a home'),
  },
  {
    id: 'maintain',
    title: 'Maintain',
    summary: 'Ongoing care so your landscape keeps maturing beautifully, season after season.',
    image: unsplash('photo-1621873495884-845a939892d1', 'A well-maintained garden with neat planting'),
  },
]

export type Project = {
  id: string
  title: string
  category: string
  image: SiteImage
  /**
   * Only provide `before` for genuine, documented project photography.
   * When present, the card renders an interactive before / after comparison.
   */
  before?: SiteImage
  layout: 'feature' | 'tall' | 'wide' | 'square'
}

/**
 * PLACEHOLDER — representative imagery showing the styles of work offered.
 * Replace with real completed projects (titles, locations, photos) when available.
 */
export const projects: Project[] = [
  {
    id: 'modern-residence',
    title: 'Modern Residence Garden',
    category: 'Landscape Design',
    layout: 'feature',
    image: unsplash('photo-1600596542815-ffad4c1539a9', 'A modern home with a sculpted front landscape at twilight'),
  },
  {
    id: 'garden-path',
    title: 'Layered Planting',
    category: 'Garden Installation',
    layout: 'tall',
    image: unsplash('photo-1628624747186-a941c476b7ef', 'A lush garden with layered planting'),
  },
  {
    id: 'family-lawn',
    title: 'Family Lawn & Borders',
    category: 'Lawn Care',
    layout: 'square',
    image: unsplash('photo-1564013799919-ab600027ffc6', 'A family home with a broad lawn and planted borders'),
  },
  {
    id: 'poolside',
    title: 'Poolside Retreat',
    category: 'Outdoor Living',
    layout: 'wide',
    image: unsplash('photo-1600607687939-ce8a6c25118c', 'A calm poolside terrace surrounded by greenery'),
  },
  {
    id: 'courtyard',
    title: 'Courtyard Entrance',
    category: 'Outdoor Architecture',
    layout: 'square',
    image: unsplash('photo-1600566753190-17f0baa2a6c3', 'An architectural home entrance with landscaped courtyard'),
  },
  {
    id: 'garden-bloom',
    title: 'Seasonal Blooms',
    category: 'Garden Maintenance',
    layout: 'tall',
    image: unsplash('photo-1617850687395-620757feb1f3', 'A garden in bloom with colourful seasonal planting'),
  },
]

export const strengths = [
  {
    title: 'Quality workmanship',
    body: 'Proper preparation, quality materials and techniques that hold up for years — not just on day one.',
    icon: 'install' as IconName,
  },
  {
    title: 'Professional service',
    body: 'Clear communication, transparent quotes and a team that respects your home and your time.',
    icon: 'consult' as IconName,
  },
  {
    title: 'Attention to detail',
    body: 'Clean edges, balanced planting and finishing touches that make a space feel complete.',
    icon: 'design' as IconName,
  },
  {
    title: 'Reliable maintenance',
    body: 'Consistent, scheduled care so your landscape keeps looking the way it was designed to.',
    icon: 'maintain' as IconName,
  },
  {
    title: 'Sustainable landscaping',
    body: 'Water-wise irrigation, suitable plant choices and practices that work with nature, not against it.',
    icon: 'tree' as IconName,
  },
]

export type Testimonial = {
  quote: string
  name: string
  context?: string // e.g. "Garden Installation · Suburb"
}

/**
 * Add genuine client testimonials here (with permission). While empty, the
 * section shows an elegant invitation instead of fabricated reviews.
 */
export const testimonials: Testimonial[] = []

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]
