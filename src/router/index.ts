import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('@/views/home/index.vue') },
        { path: '/userCenter', component: () => import('@/views/user/userCenter.vue') }

    ]
})
export default router
