import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            redirect:'/home'
        },
        {
            path:'/home',
            component: () => import('@/views/home/index.vue'),
        },
        { 
            path: '/userCenter', 
            component: () => import('@/views/user/userCenter.vue')
        },
        {
            path:'/addArticle',
            component: () => import('@/views/article/add.vue')
        }
    ]
})
export default router
