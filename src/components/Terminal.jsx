import { useEffect, useRef, useState } from 'react'
import useShell from '../hooks/useShell'
import OutputLine from './OutputLine'
import GridView from './GridView'
import Prompt from './Prompt'
import Modal from './Modal'

// This component renders the terminal interface. 

export default function Terminal() {
  const { cwd, history, run, modal, closeModal } = useShell()
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  // State to manage the current input value in the terminal
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const focusInput = () => inputRef.current?.focus()

  // Handle the Enter key to run the command and clear the input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(inputValue)
      setInputValue('')
    }
  }

  return (
    <>
      <div className="terminal" onClick={focusInput}>
        <pre className="banner">{`░█▀▀░█░█░█▀█░█▀▀░█░█░░░█░█░█▀▀░█░░░█▀▀░█▀█░█▄█░█▀▀░█▀▀░░░█░█░█▀█░█░█░█
░▀▀█░▀▄▀░█▀█░▀▀█░█▀█░░░█▄█░█▀▀░█░░░█░░░█░█░█░█░█▀▀░▀▀█░░░░█░░█░█░█░█░▀
░▀▀▀░░▀░░▀░▀░▀▀▀░▀░▀░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀░░░░▀░░▀▀▀░▀▀▀░▀`}</pre>
        <h1 className="banner">type help to get started</h1>
        {history.map((entry, i) => (
          <div key={i}>
            <div className="prompt-line">
              <Prompt cwd={entry.cwd} input={entry.input} />
            </div>
            {entry.view === 'grid'
              ? <GridView items={entry.items} />
              : <OutputLine text={entry.output} error={entry.error} />
            }
          </div>
        ))}
        
        <div className="prompt-line">
          <Prompt cwd={cwd} />
          {/* Hidden input captures keystrokes */}
          <input
            ref={inputRef}
            className="terminal-input-hidden"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          {/* Visible display with block cursor */}
          <span className="terminal-input-display" onClick={focusInput}>
            {inputValue}<span className="block-cursor" />
          </span>
        </div>

        <div ref={bottomRef} />
      </div>

      {modal && (
        <Modal
          section={modal.section}
          onClose={() => {
            closeModal()
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
        />
      )}
    </>
  )
}
