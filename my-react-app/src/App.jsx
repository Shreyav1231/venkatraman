import Terminal from './components/Terminal.jsx'

export default function App() {
  return (
    <div className="desktop">
      <div className="mac-window">
        <div className="mac-titlebar">
          <div className="traffic-lights">
            <span className="light light-red" />
            <span className="light light-yellow" />
            <span className="light light-green" />
          </div>
          <span className="window-title">svash - bash</span>
        </div>
        <Terminal />
      </div>
    </div>
  )
}
