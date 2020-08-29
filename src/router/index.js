import {createRouter, createWebHashHistory} from 'vue-router'
import {R_MAIN} from "@/constants";

const routes = [
    {
        path: '/',
        alias: '/main',
        name: R_MAIN,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
