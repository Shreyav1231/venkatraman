export default function pwd(args, cwd, tree) {
  return {
    output: cwd,
    newCwd: null,
    view: null,
    items: null,
    error: false,
  }
}