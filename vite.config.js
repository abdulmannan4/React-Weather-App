import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The `mode` setting is typically not set here, since Vite automatically determines it based on the environment.
  // However, you can access it in your app code using `import.meta.env.MODE`.
})
