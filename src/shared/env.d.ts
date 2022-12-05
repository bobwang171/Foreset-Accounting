/// <reference types="vite/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
import { PropType } from 'vue';
import dayjs from 'dayjs';
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
type Resource<T> = {
  resource: T
}

type Item = {
  id: number,
  user_id: number,
  amount: number,
  happen_at:string,
  kind: "expenses" | "income",
  tag_ids: number[],
  tags:string[Tag]
}
type User = {
  id: number,
  email:string
}
