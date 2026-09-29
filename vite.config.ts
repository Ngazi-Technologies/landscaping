import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteFiles } from './site-files.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteFiles()],
})
