import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/bobwang171/Mangosteen-Accounting/dist/',
  plugins: [vue()]
})
