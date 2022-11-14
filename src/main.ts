import { createApp } from 'vue'
import { App } from './App'
import { createRouter }  from 'vue-router'
import { history } from './shared/history';
import { routes } from './shared/routes';
import "@svgstore";
import axios from 'axios';


const router = createRouter({ history, routes })
router.beforeEach(async(to,from) => {
    if (to.path === "/" || to.path === "/start" || to.path.startsWith("/welcome") || to.path.startsWith("/sign_in")) {
        return true
    }
    else {
       await axios.get("/api/v1/me").catch(() => {

            return ("/sign_in?return_to=" + to.path)
        })
    }
    return true
})
const app = createApp(App)
app.use(router)
app.mount('#app')


