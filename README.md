# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


User types "cd projects" and hits Enter
        │
        ▼
useShell.run("cd projects")
        │
        ▼
commands/cd.js
  → resolvePath("/", "projects")  →  "/projects"
  → getNode("/projects")          →  { type: "dir", visual: true, children: [...] }
  → returns { newCwd: "/projects", output: null, view: "grid", children: [...] }
        │
        ▼
useShell updates cwd + appends to history
        │
        ▼
Terminal.jsx re-renders
  → sees view: "grid" in last history entry
  → renders <GridView children={["portfolio", "cli-tool", ...]} />


  User types "cd projects"
    │
    ▼
useShell.run("cd projects")
    │
    ▼
runCommand("cd projects", "/", tree)
    │
    ▼
cd(["projects"], "/", tree)
    │
    ├── resolvePath("/", "projects")  →  "/projects"
    ├── getNode("/projects", tree)    →  { type: "dir", visual: true, children: [...] }
    └── returns { newCwd: "/projects", view: "grid", items: [...] }
    │
    ▼
useShell updates cwd, appends to history
    │
    ▼
Terminal.jsx sees view: "grid" → renders <GridView />