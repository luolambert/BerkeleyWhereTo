import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import localUploadPlugin from './vite-plugin-local-upload.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localUploadPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
