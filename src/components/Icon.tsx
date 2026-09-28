import type { IconName } from '../content/site'

type Name = IconName | 'arrow' | 'arrowUpRight' | 'phone' | 'mail' | 'pin' | 'whatsapp' | 'clock' | 'quote' | 'menu' | 'close' | 'leaf'

const paths: Record<Name, string> = {
  design: 'M4 20h16M6 16l9.5-9.5a2.1 2.1 0 0 1 3 3L9 19H6v-3ZM13.5 8.5l2 2',
  install: 'M12 21v-7m0 0c0-4 3-7 7-7 0 4-3 7-7 7Zm0 0C12 10 9 7 5 7c0 4 3 7 7 7ZM7 21h10',
  lawn: 'M3 20h18M5 20c0-4 1-7 2-9m2 9c0-5 1-9 3-12m2 12c0-4 1-8 3-10m2 10c0-3 .5-5 1.5-7',
  maintain: 'M14.5 4.5l5 5M4 20l7.5-7.5m1.5-7l6 6-2 2-6-6 2-2ZM4 20l1.5-4.5L9 19l-5 1Z',
  water: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Zm-2.5 11.5a2.5 2.5 0 0 0 2.5 2.5',
  tree: 'M12 21v-6m0 0 3-3m-3 3-3-3m3 3c-4.4 0-7-2.7-7-6.2C5 5.5 8 3 12 3s7 2.5 7 5.8c0 3.5-2.6 6.2-7 6.2Z',
  living: 'M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M3 11h18v5H3v-5Zm2 5v3m14-3v3M12 3v3',
  consult: 'M5 18l-1.5 3L8 19.5A8.5 8.5 0 1 0 5 18Zm3-6h.01M12 12h.01M16 12h.01',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  arrowUpRight: 'M7 17 17 7M9 7h8v8',
  phone: 'M5 4h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2L20 16v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z',
  mail: 'M4 6h16v12H4V6Zm0 0 8 7 8-7',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  whatsapp:
    'M4 20l1.2-3.8A8.3 8.3 0 1 1 8 19l-4 1Zm5-11.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a5 5 0 0 1-2.5-2.5l.9-1-1-2.2L9 8.5Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 1.5',
  quote: 'M9 7H6a2 2 0 0 0-2 2v3h5v5H4m16-10h-3a2 2 0 0 0-2 2v3h5v5h-5',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6 6 18',
  leaf: 'M5 19C5 10 10 5 20 4c-1 10-6 15-15 15Zm0 0 8-8',
}

export function Icon({ name, size = 22, className = '' }: { name: Name; size?: number; className?: string }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
