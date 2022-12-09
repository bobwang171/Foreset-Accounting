import { createApp } from 'vue'
import { App } from './App'
import { createRouter }  from 'vue-router'
import { history } from './shared/history';
import { routes } from './shared/routes';
import "@svgstore";
import { fetchMe, mePromise, } from './shared/me';



const router = createRouter({ history, routes })
fetchMe()
router.beforeEach((to,from) => {
    if (to.path==="/Items" || to.path.startsWith("/welcome") ||from.path.startsWith("/welcome") || to.path.startsWith("/sign_in")) {
        return true
    }
    else {
        const path =mePromise.then(
            () => true,
            () => {
                return '/sign_in?return_to=' + to.path
            })
        return path
    }
})
const app = createApp(App)
app.use(router)
app.mount('#app')


