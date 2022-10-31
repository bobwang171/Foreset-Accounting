import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-nocheck
import styleImport, { VantResolve } from 'vite-plugin-style-import';

import { svgstore } from './src/vite_plugins/svgstore';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    svgstore(),
    vueJsx({
      transformOn: true,
      mergeProps:true,
    // options are passed on to @vue/babel-plugin-jsx
  })]

})
