import { useState } from 'react'
import { runCommand } from '../filesystem/commands/index.js'
import tree from '../filesystem/index.js'

// This custom hook manages the state for the terminal

export default function useShell() {
  const [cwd, setCwd] = useState('/')
  const [history, setHistory] = useState([])
  const [modal, setModal] = useState(null) // { section: 'projects' } | null

  const run = (rawInput) => {
    const trimmed = rawInput.trim()
    if (!trimmed) return

    const result = runCommand(trimmed, cwd, tree)

    if (result.clear) {
      setHistory([])
      return
    }

    if (result.newCwd) setCwd(result.newCwd)

    if (result.view === 'modal') {
      setModal({ section: result.section })
    }

    setHistory(prev => [
      ...prev,
      {
        cwd,
        input: rawInput,
        output: result.output,
        view: result.view === 'modal' ? null : (result.view ?? null),
        items: result.items ?? null,
        error: result.error ?? false,
      },
    ])
  }

  return { cwd, history, run, modal, closeModal: () => setModal(null) }
}
