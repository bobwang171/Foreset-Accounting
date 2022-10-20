import { RouteRecordRaw } from 'vue-router';
import { First } from "../components/Welcome/First";
import { Second } from "../components/Welcome/Second";
import { Third } from "../components/Welcome/Third";
import { Forth } from "../components/Welcome/Forth";
import { Welcome } from "../views/Welcome";
import { StartPage } from '../components/Welcome/StartPage';


export const routes: RouteRecordRaw[] = [
    { path: '/', redirect:'/welcome' },
    {
        path: '/welcome',
        component: Welcome,
        children: [
            { path: '', redirect:'/welcome/1', },
            { path: '1', component: First, },
            { path: '2', component: Second,},
            { path: '3', component: Third, },
            { path: '4', component: Forth,}
        ]
    },
    {path:"/start", component: StartPage}
  ]
