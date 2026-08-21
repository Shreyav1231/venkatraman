import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// making base dynamic for local testing as well
const base = process.env.NODE_ENV === 'production' ? '/venkatraman/' : '/';
export default defineConfig({
  plugins: [react()],
  base,
})
