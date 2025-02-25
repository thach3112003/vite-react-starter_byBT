import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tscongifPaths from 'vite-tsconfig-paths'
import dns from 'dns'
// https://vitejs.dev/config/server-options.html#server-options
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tscongifPaths()],
  server: {
    port: 3000,
  },
   css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }
})

