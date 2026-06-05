import { useState } from 'react'
import DeskScene from './components/DeskScene.jsx'
import BeachScene from './components/BeachScene.jsx'
import Terminal from './components/Terminal.jsx'

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [view, setView] = useState('desk') // 'desk' | 'beach'

  return (
    <div className="app-root">
      {view === 'desk' && (
        <>
          <div className="welcome-banner">
            <h1>Take a sneak peek into my life!</h1>
            
            <p>As a kid, I was known for my inquisitiveness - opening random drawers, playing with random objects, and asking questions endlessly. As an adult, I harness that inquisitiveness to explore new ideas and push the boundaries of what I think is possible. Today, I invite you to be inquisitive about my website. Poke around and see what you find! Hope you enjoy!</p>
          </div>
          <DeskScene
            onOpen={() => setShowTerminal(true)}
            onResumeOpen={() => setView('beach')}
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
        </>
      )}

      {view === 'beach' && (
        <>
          <BeachScene />
          <div className="resume-overlay">
            <div className="resume-scroll">
              <img src="/assets/RESUME.png" alt="Shreya Venkatraman Resume" className="resume-img" />
            </div>
          </div>
          <button className="beach-back" onClick={() => setView('desk')}>← back</button>
        </>
      )}
    </div>
  )
}
