import { useEffect } from 'react'

// content to display in modals for different sections upon "open"

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
    content: (
      <div className="modal-grid">
        {[
          { name: 'Project A', desc: 'Coming soon' },
          { name: 'Project B', desc: 'Coming soon' },
          { name: 'Project C', desc: 'Coming soon' },
        ].map(p => (
          <div key={p.name} className="modal-card">
            <div className="modal-card-title">{p.name}</div>
            <div className="modal-card-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  contact: {
    title: 'contact',
    content: (
      <div className="modal-about">
        <p>Please feel free to say hi if you see me on the street or digitally via -</p>
        <p>Email: shreyavenkat31@duck.com</p>
        <p>GitHub: github.com/Shreyav1231</p>
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
