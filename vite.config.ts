import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VantResolve, createStyleImportPlugin } from 'vite-plugin-style-import';
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
      // options are passed on to @vue/babel-plugin-jsx
    }),
    svgstore(),
    createStyleImportPlugin({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `../es/${name}/style`
        }
      ]
    }),
  ],
  server: {
    proxy: {
      '/api/v1': {
        target:'http://121.196.236.94:8080/api/v1/me'
      }
    }
  }
})
