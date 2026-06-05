import { useEffect, useState } from 'react'
import projects from '../content/projects.json'

function ProjectsGrid() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <div className="modal-project-detail">
        <button className="modal-back" onClick={() => setSelected(null)}>← back</button>
        <h3 className="modal-project-title">{selected.title}</h3>

        <div className="modal-project-links">
          <a href={selected.github} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>

        <div className="modal-project-images">
          {selected.images.map((src, i) => (
            <img key={i} src={src} alt={`${selected.title} screenshot ${i + 1}`} className="modal-project-img" />
          ))}
        </div>

        <div className="modal-project-story">
          {selected.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="modal-grid">
      {projects.map(p => (
        <div key={p.id} className="modal-card" onClick={() => setSelected(p)}>
          <div className="modal-card-title">{p.title}</div>
          <div className="modal-card-desc">{p.description}</div>
        </div>
      ))}
    </div>
  )
}

const SECTIONS = {
  about: {
    title: 'about',
    content: (
      <div className="modal-about">
        <p>Hi! I'm Shreya.</p>
        <p>I am a senior studying Computer Science at Purdue University.</p>
        <p>I specialize in security and systems.</p>
      </div>
    ),
  },
  projects: {
    title: 'projects',
    content: <ProjectsGrid />,
  },
}

export default function Modal({ section, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const { title, content } = SECTIONS[section] ?? {}

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">~/{title}</h2>
        <div className="modal-body">{content}</div>
      </div>
    </div>
  )
}
