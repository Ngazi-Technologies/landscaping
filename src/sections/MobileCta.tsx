import { useEffect, useState } from 'react'
import { contact } from '../content/site'
import { Icon } from '../components/Icon'
import { ScrollTrigger, scrollToTarget } from '../lib/motion'

/** Thumb-reachable quote bar on small screens; appears after the hero, hides near the contact form. */
export function MobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let pastHero = false
    let atContact = false
    const update = () => setVisible(pastHero && !atContact)
    const a = ScrollTrigger.create({ trigger: '#about', start: 'top 40%', onToggle: (s) => ((pastHero = s.isActive || s.progress === 1), update()), end: 'max' })
    const b = ScrollTrigger.create({ trigger: '#contact', start: 'top 90%', end: 'max', onToggle: (s) => ((atContact = s.isActive), update()) })
    return () => {
      a.kill()
      b.kill()
    }
  }, [])

  return (
    <div className={`mobile-cta ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <a href={contact.phoneHref} className="mobile-cta__call" aria-label={`Call ${contact.phone}`} tabIndex={visible ? 0 : -1}>
        <Icon name="phone" size={20} />
      </a>
      <a
        href="#contact"
        className="mobile-cta__quote"
        tabIndex={visible ? 0 : -1}
        onClick={(e) => {
          e.preventDefault()
          scrollToTarget('#contact')
        }}
      >
        Get a Free Quote <Icon name="arrow" size={18} />
      </a>
    </div>
  )
}
