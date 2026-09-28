import { useState } from 'react'
import type { Project } from '../content/site'
import { ImageWithFallback } from './ImageWithFallback'
import { ParallaxImage } from './ParallaxImage'

const SIZES: Record<Project['layout'], string> = {
  feature: '(min-width: 960px) 62vw, 100vw',
  wide: '(min-width: 960px) 62vw, 100vw',
  tall: '(min-width: 960px) 36vw, 100vw',
  square: '(min-width: 960px) 36vw, 100vw',
}

/** Before/after comparison — only rendered when genuine `before` photography exists. */
function BeforeAfter({ project }: { project: Project }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="before-after" style={{ ['--pos' as string]: `${pos}%` }}>
      <ImageWithFallback image={project.image} sizes={SIZES[project.layout]} className="before-after__layer" />
      <ImageWithFallback image={project.before!} sizes={SIZES[project.layout]} className="before-after__layer before-after__before" />
      <span className="before-after__tag before-after__tag--before">Before</span>
      <span className="before-after__tag before-after__tag--after">After</span>
      <span className="before-after__handle" aria-hidden="true" />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after for ${project.title}`}
      />
    </div>
  )
}

export function PortfolioCard({ project }: { project: Project }) {
  return (
    <figure className={`project project--${project.layout}`}>
      {project.before ? (
        <BeforeAfter project={project} />
      ) : (
        <ParallaxImage image={project.image} sizes={SIZES[project.layout]} className="project__frame" speed={8} overlay="bottom" />
      )}
      <figcaption className="project__caption">
        <span className="project__category">{project.category}</span>
        <span className="project__title">{project.title}</span>
      </figcaption>
    </figure>
  )
}
