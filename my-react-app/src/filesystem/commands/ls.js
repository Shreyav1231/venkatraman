import { getNode } from '../resolver.js'

export default function ls(args, cwd, tree) {
  const node = getNode(cwd, tree)

  if (!node) {
    return { output: `ls: cannot access '${cwd}': No such directory`, error: true }
  }

  if (node.type === 'file') {
    return { output: cwd.split('/').pop(), error: false }
  }

  // Join children with spacing, colorize dirs vs files
  const output = node.children
    .map(name => {
      const childPath = cwd === '/' ? `/${name}` : `${cwd}/${name}`
      const childNode = getNode(childPath, tree)
      // dirs get a trailing slash so they're visually distinct
      return childNode?.type === 'dir' ? `${name}/` : name
    })
    .join('    ')

  return { output, newCwd: null, view: null, items: null, error: false }
}