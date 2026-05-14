import { getNode, resolvePath } from '../resolver.js'

const OPENABLE = new Set(['about', 'projects', 'contact'])

export default function open(args, cwd, tree) {
  const targetPath = args[0] ? resolvePath(cwd, args[0]) : cwd
  const node = getNode(targetPath, tree)
  const section = targetPath.replace(/^\//, '')

  if (!node) {
    return { output: `open: ${args[0]}: No such file or directory`, error: true }
  }

  if (node.type === 'file') {
    return { output: `open: ${args[0] ?? '.'}: Is a file, not a directory`, error: true }
  }

  if (!OPENABLE.has(section)) {
    return { output: `open: '${section || '/'}' cannot be opened`, error: true }
  }

  return {
    output: `Opening /${section}...`,
    view: 'modal',
    section,
    newCwd: null,
    items: null,
    error: false,
  }
}
