import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { brand, navLinks } from '../content/site'
import { GlassButton } from '../components/GlassButton'
import { Icon } from '../components/Icon'
import { ScrollTrigger, scrollToTarget, setScrollLocked } from '../lib/motion'

export function Nav() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setSolid(y > window.innerHeight * 0.75)
        setHidden(y > window.innerHeight && self.direction === 1)
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href)
  }

  return (
    <header
      ref={ref}
      className={`nav ${solid ? 'nav--solid' : ''} ${hidden && !open ? 'nav--hidden' : ''} ${open ? 'nav--open' : ''}`}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="nav__bar">
        <a href="#top" className="nav__brand" onClick={go('#top')} aria-label={`${brand.name} — back to top`}>
          <span className="nav__mark">
            <Icon name="leaf" size={18} />
          </span>
          <span className="nav__name">{brand.name}</span>
        </a>

        <nav aria-label="Primary" className="nav__links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <GlassButton href="#contact" variant={solid ? 'primary' : 'light'} className="nav__cta">
          Get a Free Quote
        </GlassButton>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ ['--i' as string]: i }}>
                <a href={l.href} onClick={go(l.href)}>
                  <span className="nav__sheet-num">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <GlassButton href="#contact" onClick={() => setOpen(false)} icon className="nav__sheet-cta">
          Get a Free Quote
        </GlassButton>
      </div>
    </header>
  )
}
