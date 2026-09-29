# Perfect Edge Landscapes

The website for **Perfect Edge Landscapes**, a landscaping business in Liverpool & South-West Sydney, NSW, Australia.

- **Live site:** [www.perfectedgelandscapes.com.au](https://www.perfectedgelandscapes.com.au)
- **Repository:** [github.com/timkenar/landscaping](https://github.com/timkenar/landscaping)

The site is a single-page site that shows the business's services and process, and helps visitors request a free quote.

## Business details

| | |
|---|---|
| Phone | [+61 452 642 233](tel:+61452642233) |
| Email | [perfectedgelandscapessydney@gmail.com](mailto:perfectedgelandscapessydney@gmail.com) |
| Location | Liverpool & South-West Sydney, NSW, Australia |
| Hours | Open 24 hours |

## Features

- **Sections:** Hero, About, Services, Process, Work (portfolio), Why Us, Testimonials, a call to action and Contact.
- **Free quote form:** checks the fields, has a hidden spam trap, and sends the request to a form endpoint. If no endpoint is set, it opens the visitor's email app with the request filled in.
- **Mobile friendly:** a quick-action bar on phones with *Call* and *Get a Free Quote* buttons.
- **Animation:** smooth scrolling and scroll-triggered animations (GSAP + Lenis). These are switched off for visitors who ask their device for reduced motion.
- **Easy to find:** page titles, social-sharing tags, and schema.org `LocalBusiness` data for Google. `robots.txt`, `sitemap.xml` and [`llms.txt`](https://llmstxt.org) are generated automatically.

## Tech stack

[React 19](https://react.dev) · [TypeScript](https://www.typescriptlang.org) · [Vite 8](https://vite.dev) · [GSAP](https://gsap.com) + ScrollTrigger · [Lenis](https://lenis.darkroom.engineering) · [Oxlint](https://oxc.rs)

## Getting started

Requires **Node.js 20.19+ or 22.12+**.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # type-check and build for production into dist/
npm run preview   # preview the production build locally
npm run lint      # lint with Oxlint
```

## Editing content

Almost everything you'd want to change is in **[`src/content/site.ts`](src/content/site.ts)**:

| What | Where in `site.ts` |
|---|---|
| Company name, tagline, description, website URL | `brand` |
| Phone, email, location, service area, hours | `contact` |
| WhatsApp button (hidden when empty) | `contact.whatsapp`, digits only, e.g. `61452642233` |
| Where quote requests are sent (Formspree, Netlify Forms, your own API…) | `contact.formEndpoint` |
| Social media links (hidden when empty) | `contact.social` |
| Services, process steps, portfolio, strengths | `services`, `processSteps`, `projects`, `strengths` |
| Client reviews (section shows an invitation while empty) | `testimonials` |
| Images | `images` and the `image` fields. Use an Unsplash URL or a local file in `public/` |

The page title and social-sharing tags in [`index.html`](index.html) are the only other places that contain the business name and website URL.

## Project structure

```
├── index.html            # page shell, page title and social-sharing tags
├── site-files.ts         # Vite plugin: generates robots.txt, sitemap.xml, llms.txt
├── vite.config.ts
├── public/               # static files copied as-is (favicon)
├── landscapepics/        # business photos (not yet used on the site)
└── src/
    ├── content/site.ts   # all site content and business details
    ├── sections/         # page sections (Hero, Services, Contact, Footer…)
    ├── components/       # reusable UI (cards, buttons, animated text, structured data…)
    ├── lib/motion.ts     # GSAP / Lenis setup and scroll helpers
    └── styles/           # base, component and section styles
```

## Search engines and AI assistants

`robots.txt`, `sitemap.xml` and `llms.txt` are **generated from `src/content/site.ts`** by [`site-files.ts`](site-files.ts). They're served live by the dev server and written to `dist/` on build, so they always match the website. You never edit them by hand.

| File | Purpose |
|---|---|
| [`/robots.txt`](https://www.perfectedgelandscapes.com.au/robots.txt) | Lets all crawlers in and gives them the sitemap address |
| [`/sitemap.xml`](https://www.perfectedgelandscapes.com.au/sitemap.xml) | Tells search engines which pages to index |
| [`/llms.txt`](https://www.perfectedgelandscapes.com.au/llms.txt) | Plain-text summary of the business for AI assistants |

## Deployment

`npm run build` produces a static site in `dist/` that can be hosted anywhere (Netlify, Vercel, Cloudflare Pages, GitHub Pages, any web server).

After deploying:

1. Redirect `perfectedgelandscapes.com.au` to `https://www.perfectedgelandscapes.com.au` so search engines see a single address.
2. Submit `https://www.perfectedgelandscapes.com.au/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).

## Before launch

- [ ] Replace the Unsplash stock photos with real project photos (see `landscapepics/`).
- [ ] Replace the placeholder portfolio items in `projects` with real completed jobs.
- [ ] Add genuine client testimonials (with permission).
- [ ] Add social media links and, if used, the WhatsApp number.
- [ ] Set `contact.formEndpoint` if quote requests should be delivered without the visitor's email app.
