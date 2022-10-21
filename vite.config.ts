import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    svgstore(),
    vueJsx({
      transformOn: true,
      mergeProps:true,
    // options are passed on to @vue/babel-plugin-jsx
  })]

})
