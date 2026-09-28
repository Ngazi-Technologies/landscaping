import { useState, type FormEvent } from 'react'
import { brand, contact, services } from '../content/site'
import { AnimatedText } from '../components/AnimatedText'
import { GlassCard } from '../components/GlassCard'
import { Icon } from '../components/Icon'
import { ScrollReveal } from '../components/ScrollReveal'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>
type Status = { kind: 'idle' | 'sending' | 'sent' | 'error'; text?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const socials = contact.social.filter((s) => s.href)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    if (data.company_website) return // honeypot

    const next: Errors = {}
    if (!data.name?.trim()) next.name = 'Please tell us your name.'
    if (!EMAIL_RE.test(data.email ?? '')) next.email = 'Please enter a valid email address.'
    if ((data.message ?? '').trim().length < 10) next.message = 'A few words about your project helps us prepare.'
    setErrors(next)
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }

    const payload = { name: data.name, email: data.email, phone: data.phone, service: data.service, message: data.message }

    if (contact.formEndpoint) {
      setStatus({ kind: 'sending' })
      try {
        const res = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(String(res.status))
        form.reset()
        setStatus({ kind: 'sent', text: "Thank you — we've received your request and will be in touch shortly." })
      } catch {
        setStatus({ kind: 'error', text: `Something went wrong. Please try again or email us at ${contact.email}.` })
      }
      return
    }

    // No endpoint configured: hand off to the visitor's email client.
    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone && `Phone: ${payload.phone}`,
      payload.service && `Service: ${payload.service}`,
      '',
      payload.message,
    ]
      .filter((l) => l !== undefined && l !== '')
      .join('\n')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Quote request — ${payload.service || 'Landscaping'}`)}&body=${encodeURIComponent(body)}`
    setStatus({ kind: 'sent', text: 'Your email app should open with your request ready to send.' })
  }

  const field = (name: keyof Errors) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `err-${name}` : undefined,
  })

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">Contact</p>
          <AnimatedText as="h2" id="contact-title" className="display display--lg" text={'Request your\nfree quote.'} />
          <ScrollReveal as="p" className="lede">
            Share a few details about your space and what you have in mind. We'll respond to arrange a consultation.
          </ScrollReveal>

          <ScrollReveal as="ul" className="contact__details" stagger={0.08}>
            <li>
              <a href={contact.phoneHref}>
                <span className="contact__icon"><Icon name="phone" size={20} /></span>
                <span><small>Phone</small>{contact.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>
                <span className="contact__icon"><Icon name="mail" size={20} /></span>
                <span><small>Email</small>{contact.email}</span>
              </a>
            </li>
            {contact.whatsapp && (
              <li>
                <a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hello ${brand.shortName}, I'd like a landscaping quote.`)}`} target="_blank" rel="noopener noreferrer">
                  <span className="contact__icon"><Icon name="whatsapp" size={20} /></span>
                  <span><small>WhatsApp</small>Message us directly<span className="visually-hidden"> (opens in a new tab)</span></span>
                </a>
              </li>
            )}
            <li>
              <div>
                <span className="contact__icon"><Icon name="pin" size={20} /></span>
                <span><small>Location</small>{contact.location}<em>{contact.serviceArea}</em></span>
              </div>
            </li>
            <li>
              <div>
                <span className="contact__icon"><Icon name="clock" size={20} /></span>
                <span><small>Hours</small>{contact.hours}</span>
              </div>
            </li>
          </ScrollReveal>

          {socials.length > 0 && (
            <ul className="contact__social" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>

        <ScrollReveal y={60}>
          <GlassCard className="contact__card">
            <form className="form" noValidate onSubmit={onSubmit} aria-describedby="form-status">
              <div className="form__row">
                <div className="form__field">
                  <label htmlFor="field-name">Full name</label>
                  <input id="field-name" name="name" autoComplete="name" required {...field('name')} />
                  {errors.name && <span className="form__error" id="err-name">{errors.name}</span>}
                </div>
                <div className="form__field">
                  <label htmlFor="field-phone">Phone <span className="form__opt">(optional)</span></label>
                  <input id="field-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
                </div>
              </div>
              <div className="form__field">
                <label htmlFor="field-email">Email</label>
                <input id="field-email" name="email" type="email" autoComplete="email" required {...field('email')} />
                {errors.email && <span className="form__error" id="err-email">{errors.email}</span>}
              </div>
              <div className="form__field">
                <label htmlFor="field-service">Service of interest</label>
                <div className="form__select">
                  <select id="field-service" name="service" defaultValue="">
                    <option value="">Not sure yet</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form__field">
                <label htmlFor="field-message">Tell us about your space</label>
                <textarea id="field-message" name="message" rows={5} required placeholder="Size, current state, ideas, timing…" {...field('message')} />
                {errors.message && <span className="form__error" id="err-message">{errors.message}</span>}
              </div>
              <div className="form__hp" aria-hidden="true">
                <label htmlFor="field-hp">Leave this field empty</label>
                <input id="field-hp" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>
              <button className="btn btn--primary form__submit" type="submit" disabled={status.kind === 'sending'}>
                <span className="btn__label">{status.kind === 'sending' ? 'Sending…' : 'Get a Free Quote'}</span>
                <span className="btn__icon"><Icon name="arrow" size={18} /></span>
              </button>
              <p id="form-status" className={`form__status form__status--${status.kind}`} role="status" aria-live="polite">
                {status.text}
              </p>
            </form>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
