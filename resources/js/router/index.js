import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/Pages/Home.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/items-list', component: () => import('@/Pages/Items/ItemsList.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
