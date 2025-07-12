import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('@/views/layout/index.vue') }
    ]
})
export default router
