import { RouteRecordRaw } from 'vue-router';
import { First } from "../components/Welcome/First";
import { Second } from "../components/Welcome/Second";
import { Third } from "../components/Welcome/Third";
import { Forth } from "../components/Welcome/Forth";
import { Welcome } from "../views/Welcome";
import { ItemPage } from '../views/ItemPage';
import { ItemList } from '../components/Item/ItemList';
import { ItemCreate } from '../components/Item/ItemCreate';
import { TagPage } from '../views/TagPage';
import { TagCreate } from '../components/Tags/TagCreate';
import { TagEdit } from '../components/Tags/TagEdit';
import { SignIn } from '../views/SignInPage';
import { Statistics } from '../views/StatisticsPage';
import { ComingSoon } from '../views/ComingSoonPage';


export const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/welcome' },
    {
        path: '/welcome',
        component: Welcome,
        beforeEnter: (to, from, next) => {
            localStorage.getItem("skipFeature") === "yes" ? next("/Items") : next()
        },
        children: [
            { path: '', redirect: '/welcome/1', },
            { path: '1', component: First, },
            { path: '2', component: Second, },
            { path: '3', component: Third, },
            { path: '4', component: Forth, }
        ]
    },
    {

        path: "/Items", component: ItemPage,
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
    {
        path: "/ComingSoon", component: ComingSoon,
    },
]
