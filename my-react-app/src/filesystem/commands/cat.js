// args  = everything after the command name, e.g. ["projects"] from "cd projects"
// cwd   = current working directory, e.g. "/projects"
// tree  = the full filesystem tree (imported once, passed down)
/*
function someCommand(args, cwd, tree) {
  return {
    output: '',      // string to print, null if nothing to print
    newCwd: null,    // string if cwd should change, otherwise null
    view: null,      // 'grid' if GridView should render, otherwise null
    items: null,     // array of items if view === 'grid'
    error: false,    // true if something went wrong
  }
}
*/

import { getNode, resolvePath } from '../resolver.js'

export default function cat(args, cwd, tree) {
  if (!args[0]) {
    return { output: 'cat: missing operand', error: true }
  }

  const targetPath = resolvePath(cwd, args[0])
  const node = getNode(targetPath, tree)

  if (!node) {
    return { output: `cat: ${args[0]}: No such file or directory`, error: true }
  }

  if (node.type === 'dir') {
    return { output: `cat: ${args[0]}: Is a directory`, error: true }
  }

  return { output: node.content, newCwd: null, view: null, items: null, error: false }
}