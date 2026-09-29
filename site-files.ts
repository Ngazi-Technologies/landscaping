import { runnerImport, type Plugin } from 'vite'
import type * as Site from './src/content/site.ts'

/**
 * Generates /robots.txt, /sitemap.xml and /llms.txt from src/content/site.ts, so
 * search engines and AI assistants always see the same details as the website.
 *
 * - `vite` (dev): served on request, always reflecting the latest site.ts.
 * - `vite build`: written to dist/ alongside index.html.
 */

type SiteContent = typeof Site
type SiteFile = { contentType: string; body: string }

async function loadSite(root: string): Promise<SiteContent> {
  // Loaded through a module runner (not a static import) so site.ts doesn't become a
  // config dependency — editing content keeps HMR instead of restarting the dev server.
  const { module } = await runnerImport<SiteContent>('/src/content/site.ts', { root, logLevel: 'silent' })
  return module
}

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!)

function robotsTxt({ brand }: SiteContent): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${brand.siteUrl}/sitemap.xml`, ''].join('\n')
}

function sitemapXml({ brand }: SiteContent): string {
  // Single-page site: section anchors (#about, #services…) are not separate URLs.
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${escapeXml(`${brand.siteUrl}/`)}</loc>`,
    '  </url>',
    '</urlset>',
    '',
  ].join('\n')
}

/** Follows the llms.txt proposal: https://llmstxt.org */
function llmsTxt({ brand, contact, services, processSteps, navLinks }: SiteContent): string {
  const home = `${brand.siteUrl}/`
  const socials = contact.social.filter((s) => s.href)

  return [
    `# ${brand.name}`,
    '',
    `> ${brand.description}`,
    '',
    `${brand.tagline} in ${contact.location}. Free, no-obligation quotes. The website is a single page; the links below point to its sections.`,
    '',
    `- Phone: ${contact.phone}`,
    `- Email: ${contact.email}`,
    ...(contact.whatsapp ? [`- WhatsApp: https://wa.me/${contact.whatsapp}`] : []),
    `- Location: ${contact.location}`,
    `- Service area: ${contact.serviceArea}`,
    `- Hours: ${contact.hours}`,
    `- Request a free quote: ${home}#contact`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.title}](${home}#services): ${s.description}`),
    '',
    '## How we work',
    '',
    ...processSteps.map((p) => `- [${p.title}](${home}#process): ${p.summary}`),
    '',
    '## Website',
    '',
    `- [Home](${home})`,
    ...navLinks.map((l) => `- [${l.label}](${home}${l.href})`),
    '',
  ].join('\n')
}

async function renderFiles(root: string): Promise<Record<string, SiteFile>> {
  const site = await loadSite(root)
  return {
    '/robots.txt': { contentType: 'text/plain; charset=utf-8', body: robotsTxt(site) },
    '/sitemap.xml': { contentType: 'application/xml; charset=utf-8', body: sitemapXml(site) },
    '/llms.txt': { contentType: 'text/plain; charset=utf-8', body: llmsTxt(site) },
  }
}

const FILE_PATHS = new Set(['/robots.txt', '/sitemap.xml', '/llms.txt'])

export function siteFiles(): Plugin {
  let root = process.cwd()

  return {
    name: 'site-files',
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      // Registered directly (not returned) so it runs before Vite's SPA fallback.
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        if (!FILE_PATHS.has(path)) return next()
        try {
          const file = (await renderFiles(root))[path]
          res.setHeader('Content-Type', file.contentType)
          res.end(file.body)
        } catch (err) {
          next(err)
        }
      })
    },
    async generateBundle() {
      for (const [path, file] of Object.entries(await renderFiles(root))) {
        this.emitFile({ type: 'asset', fileName: path.slice(1), source: file.body })
      }
    },
  }
}
