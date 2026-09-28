import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { scrollToTarget } from '../lib/motion'
import { Icon } from './Icon'

type Variant = 'primary' | 'glass' | 'light' | 'ghost'

type Common = { variant?: Variant; children: ReactNode; icon?: boolean; className?: string }

type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

/** Pill button. In-page anchors (#id) scroll smoothly through Lenis. */
export function GlassButton(props: LinkProps | ButtonProps) {
  const { variant = 'primary', children, icon = false, className = '', ...rest } = props
  const cls = `btn btn--${variant} ${className}`
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon">
          <Icon name="arrow" size={18} />
        </span>
      )}
    </>
  )

  if ('href' in rest && rest.href) {
    const { href, onClick, ...anchor } = rest as LinkProps
    return (
      <a
        {...anchor}
        href={href}
        className={cls}
        onClick={(e) => {
          onClick?.(e)
          if (href.startsWith('#') && !e.defaultPrevented) {
            e.preventDefault()
            scrollToTarget(href)
          }
        }}
      >
        {content}
      </a>
    )
  }
  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
      {content}
    </button>
  )
}
