/// <reference types="vite/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

