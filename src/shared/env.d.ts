/// <reference types="vite/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Tag = {
  id: number,
  name: string,
  sign: any,
  kind: "income" | "expenses"

}

type Resources<T=any> = {
  resources: T[],
  pager: {
    page: number,
    per_page: number,
    count: number
  }
}