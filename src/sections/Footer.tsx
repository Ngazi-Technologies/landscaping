import { brand, contact, navLinks, services } from '../content/site'
import type { MouseEvent } from 'react'
import { Icon } from '../components/Icon'
import { scrollToTarget } from '../lib/motion'

export function Footer() {
  const socials = contact.social.filter((s) => s.href)
  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault()
    scrollToTarget(href)
  }
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="nav__mark"><Icon name="leaf" size={18} /></span>
          <p className="footer__name">{brand.name}</p>
          <p className="footer__desc">{brand.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="footer__label">Explore</p>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={go(l.href)}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="footer__label">Services</p>
          <ul>
            {services.slice(0, 6).map((s) => (
              <li key={s.id}><a href="#services" onClick={go('#services')}>{s.title}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer__label">Get in touch</p>
          <ul>
            <li><a href={contact.phoneHref}>{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li>{contact.location}</li>
            {socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
        <a href="#top" onClick={go('#top')}>Back to top ↑</a>
      </div>
    </footer>
  )
}
