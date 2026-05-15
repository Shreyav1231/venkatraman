import { getNode, resolvePath } from '../resolver.js'

export default function cd(args, cwd, tree) {
  if (!args[0]) {
    return { output: null, newCwd: '/', view: null, items: null, error: false }
  }

  const targetPath = resolvePath(cwd, args[0])
  const node = getNode(targetPath, tree)

  if (!node) {
    return { output: `cd: ${args[0]}: No such file or directory`, error: true, newCwd: null }
  }

  if (node.type === 'file') {
    return { output: `cd: ${args[0]}: Not a directory`, error: true, newCwd: null }
  }

  // It's a directory — check if it wants a visual grid
  if (node.visual) {
    return {
      output: null,
      newCwd: targetPath,
      view: 'grid',
      items: node.children,    // GridView will render these as cards
      error: false,
    }
  }

  // Regular directory — just change cwd, print nothing
  return { output: null, newCwd: targetPath, view: null, items: null, error: false }
}