import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import { join } from 'path'
const root = join(__dirname, 'src/render')

// https://vitejs.dev/config/
export default ({mode})=>{
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return defineConfig({
    root,
    resolve: {
      alias: {
        '@': root,
      },
    },
    base: './',
    build: {
      outDir: join(__dirname, 'dist/render'),
      emptyOutDir: true,
    },
    server: {
      port: +process.env.PORT
    },
      plugins: [react()],
      optimizeDeps: {
        exclude: [
          'electron-is-dev',
          'electron-store'
        ]
      }
  })
}
