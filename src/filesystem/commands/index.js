import ls   from './ls.js'
import cd   from './cd.js'
import cat  from './cat.js'
import pwd  from './pwd.js'
import open from './open.js'

const commands = { ls, cd, cat, pwd, open }

export function runCommand(input, cwd, tree) {
  // split input into command and args
  const [cmd, ...args] = input.trim().split(/\s+/)

  if (!cmd) return { output: null }   // empty enter, do nothing

  if (cmd === 'clear') {
    // Special case — handled in useShell directly, signal it here
    return { clear: true }
  }

  if (cmd === 'help') {
    return { output: 'available commands:\nls (to list all available items)\ncd (to change directory)\npwd (to print working directory)\ncat (to display file contents)\nopen (to open a file)\nclear (to clear the terminal)' }
  }

  const fn = commands[cmd]

  if (!fn) {
    return {
      output: `${cmd}: command not found`,
      error: true,
    }
  }

  return fn(args, cwd, tree)
}