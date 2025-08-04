import { createWebHistory, createRouter } from 'vue-router'

import HomeView from "@/views/HomeView.vue";
import FavoriteView from "@/views/FavoriteView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/favoritos', component: FavoriteView }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
