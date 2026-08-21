import { useEffect, useState } from 'react'
import projects from '../content/projects.json'

// This component renders a modal overlay that displays information on projects and about sections.

function ProjectsGrid() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <div className="modal-project-detail">
        <button className="modal-back" onClick={() => setSelected(null)}>← back</button>
        <h3 className="modal-project-title">{selected.title}</h3>

        <div className="modal-project-links">
          {selected.links?.[0] && (
            <a href={selected.links[0]} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          )}
          {selected.links?.[1] && (
            <a href={selected.links[1]} target="_blank" rel="noopener noreferrer">
              Try it out
            </a>
          )}
          {selected.links?.[2] && (
            <a href={selected.links[2]} target="_blank" rel="noopener noreferrer">
              Devpost
            </a>
          )}
        </div>

        <div className="modal-project-images">
          {selected.images.map((src, i) => (
            <img key={i} src={`${import.meta.env.BASE_URL}${src}`} alt={`${selected.title} screenshot ${i + 1}`} className="modal-project-img" />
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
  hobbies: {
    title: 'hobbies',
    content: (
      <div className="modal-hobbies">
        <h1>I love DOING.</h1>
        <p>My hobbies include, but are not limited to:</p>
        <ul>
          <li>MUSIC - creating and listening</li>
          <li>FOOD - cooking and eating</li>
          <li>BEING OUTDOORS - from touching grass to chasing sunsets</li>
          <li>READING - exploring new worlds through books</li>
          <li>ADVENTURING - from grocery stores to the wilderness</li>
        </ul>
        <br></br>
        <p>"Isn’t it splendid to think of all the things there are to find out about? It just makes me feel glad to be alive—it’s such an interesting world. It wouldn’t be half so interesting if we knew all about everything, would it? There’d be no scope for imagination then, would there?"</p>
        <p>— L.M. Montgomery, Anne of Green Gables</p>
      </div>
    ),
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
