import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home.vue'),
      children: [{
        path: '/',
        component: () => import('@/pages/Home/ListView.vue'),
      }, {
        path: '/analyze',
        component: () => import('@/pages/Home/Analyze.vue'),
      }, {
        path: '/config',
        component: () => import('@/pages/Home/Config.vue'),
      }]
    },
  ],
});

export default router;