import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import { RouteRecordRaw } from 'vue-router';


export const routes: RouteRecordRaw[] = [
    { path: '/', component: Bar },
    { path: '/about', component: Foo },
    {
        path: '/welcome',
        component: Foo,
        children: [
            { path: '/1', component: Foo },
            { path: '/2', component: Foo },
            { path: '/3', component: Foo },
            { path: '/4', component: Foo }
        ]
    }
  ]
