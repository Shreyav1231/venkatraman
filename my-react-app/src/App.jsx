import { useState } from 'react'
import Scene from './components/Scene.jsx'
import Terminal from './components/Terminal.jsx'

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false)

  return (
    <div className="app-root">
      <div className="welcome-banner">
        <h1>Take a sneak peek into my life!</h1>
        <p>As a kid, I was known for my inquisitiveness - opening random drawers, playing with random objects, and asking endless questions. As an adult, I harness that inquisitiveness to explore new ideas and push the boundaries of what I think is possible. Today, I invite you to poke around on my website. Hope you enjoy!</p>
      </div>
      <Scene onOpen={() => setShowTerminal(true)} />

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
    </div>
  )
}
