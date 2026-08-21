import { useState } from 'react'
import DeskScene from './components/DeskScene.jsx'
import BeachScene from './components/BeachScene.jsx'
import Modal from './components/Modal.jsx'
import Terminal from './components/Terminal.jsx'
import SocialsScene from './components/SocialsScene.jsx'

// The root of the app! Everything's arranged here.

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [showSocials,  setShowSocials]  = useState(false)
  const [showHobbies,  setShowHobbies]  = useState(false)
  const [view, setView] = useState('desk') // 'desk' | 'beach'

  return (
    <div className="app-root">
      {view === 'desk' && (
        <>
          <div className="welcome-banner">
            <h1>I am Shreya Venkatraman!</h1>
            <p className="welcome-text">As a kid, I was known for my inquisitiveness - opening random drawers, playing with objects, and asking questions endlessly. As an adult, I harness that inquisitiveness to explore new ideas and push the boundaries of what I think is possible. Today, I invite you to be inquisitive about my website. Poke around and see what you find!</p>
          </div>
          <DeskScene
            onOpen={() => setShowTerminal(true)}
            onResumeOpen={() => setView('beach')}
            onSocialsOpen={() => setShowSocials(true)}
            onHobbiesOpen={() => setShowHobbies(true)}
          />
          {showTerminal && (
            <div className="terminal-overlay">
              <div className="mac-window">
                <div className="mac-titlebar">
                  <div className="traffic-lights">
                    <span
                      className="light light-red"
                      onClick={() => setShowTerminal(false)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span className="light light-yellow" />
                    <span className="light light-green" />
                  </div>
                  <span className="window-title">svash - bash</span>
                </div>
                <Terminal />
              </div>
            </div>
          )}

          {showSocials && (
            <div className="socials-overlay" onClick={() => setShowSocials(false)}>
              <div className="socials-window" onClick={(e) => e.stopPropagation()}>
                <button className="socials-close" onClick={() => setShowSocials(false)}>✕</button>
                <p className="socials-hint">click an icon to visit</p>
                <SocialsScene />
              </div>
            </div>
          )}
          {showHobbies && (
            <Modal section="hobbies" onClose={() => setShowHobbies(false)} />
          )}
        </>
      )}

      {view === 'beach' && (
        <>
          <BeachScene />
          <div className="resume-overlay">
            <div className="resume-scroll">
              <img src={`${import.meta.env.BASE_URL}assets/RESUME.png`} alt="Shreya Venkatraman Resume" className="resume-img" />
            </div>
          </div>
          <button className="beach-back" onClick={() => setView('desk')}>← back</button>
        </>
      )}
    </div>
  )
}
