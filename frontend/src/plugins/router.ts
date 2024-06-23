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
        children: [{
          path: 'tag',
          component: () => import('@/pages/Config/Tag.vue'),
        },{
          path: 'theme',
          component: () => import('@/pages/Config/Theme.vue'),
        }, {
          path: 'database',
          component: () => import('@/pages/Config/DataBase.vue'),
        }]
      }]
    },
  ],
});

export default router;