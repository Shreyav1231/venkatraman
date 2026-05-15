import { useState } from 'react'
import Scene from './components/Scene.jsx'
import Terminal from './components/Terminal.jsx'

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false)

  return (
    <div className="app-root">
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
