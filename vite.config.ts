import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/bobwang171/Mangosteen-Accounting/dist/',
  plugins: [vue(),
    vueJsx({
      transformOn: true,
      mergeProps:true
    // options are passed on to @vue/babel-plugin-jsx
  })]

})
