import { createApp } from 'vue'
import { App } from './App'
import { Bar } from './views/Bar'
import { Foo } from './views/Foo'
import { createRouter }  from 'vue-router'
import { history } from './shared/history'

const routes = [
    { path: '/', component: Bar },
    { path: '/about', component: Foo },
  ]

const router = createRouter({history,routes})
const app = createApp(App)
app.use(router)
app.mount('#app')
