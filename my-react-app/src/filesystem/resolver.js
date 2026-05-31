export function getNode(path, tree) {
  return tree[path] ?? null
}

export function resolvePath(cwd, input) {
  if (input === '/') {
    return '/'
  }
  if (input.startsWith('/')) {
    return input
  } 
  if (input === '..') {
    const parts = cwd.split('/').filter(Boolean)
    parts.pop()
    return parts.length ? '/' + parts.join('/') : '/'
  }
  return cwd === '/' ? `/${input}` : `${cwd}/${input}`
}
