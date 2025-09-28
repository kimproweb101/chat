import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomeView.vue'),
    },
    {
      path: '/chats',
      component: () => import('@/pages/ChatView.vue'),
    },
  ],
})

export default router
