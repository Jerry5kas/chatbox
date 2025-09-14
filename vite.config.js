import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages under a repo (not user page), set base to '/repo-name/'
export default defineConfig({
  plugins: [react()],
  base: './'
})
