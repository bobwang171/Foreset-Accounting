import { RouteRecordRaw } from 'vue-router';
import { First } from "../components/Welcome/First";
import { Second } from "../components/Welcome/Second";
import { Third } from "../components/Welcome/Third";
import { Forth } from "../components/Welcome/Forth";
import { Welcome } from "../views/Welcome";
import { StartPage } from '../components/Welcome/StartPage';
import { ItemPage } from '../views/ItemPage';
import { ItemList } from '../components/Item/ItemList';
import { ItemCreate } from '../components/Item/ItemCreate';
import { TagPage } from '../views/TagPage';
import { TagCreate } from '../components/Tags/TagCreate';
import { TagEdit } from '../components/Tags/TagEdit';
import { SignIn } from '../views/SignInPage';
import { Statistics } from '../views/StatisticsPage';
import { http } from './Http';


export const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/welcome' },
    {
        path: '/welcome',
        component: Welcome,
        beforeEnter: (to, from, next) => {
            localStorage.getItem("skipFeature") === "yes" ? next("/start") : next()
        },
        children: [
            { path: '', redirect: '/welcome/1', },
            { path: '1', component: First, },
            { path: '2', component: Second, },
            { path: '3', component: Third, },
            { path: '4', component: Forth, }
        ]
    },
    { path: "/start", component: StartPage },
    {
        path: "/Item", component: ItemPage,
        beforeEnter: (to, from, next) => {
            http.get("/api/v1/me").then(() => next()).catch(() => {
                next("/sign_in?return_to=" + to.path)
            })
        },
        children: [
            { path: "", component: ItemList },
            { path: "create", component: ItemCreate }
        ]
    },
    {
        path: "/Tags", component: TagPage,
        children: [
            { path: "create", component: TagCreate },
            { path: ":id/edit", component: TagEdit }
        ]
    },
    {
        path: "/Sign_in", component: SignIn,

    },
    {
        path: "/Statistics", component: Statistics,
    },
]
