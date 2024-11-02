import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChatsView from '../views/ChatsView.vue'
import DefaultLayout from '@/Layout/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pulbic',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: '/chats',
          name: 'chats',
          component: ChatsView,
        },
      ],
    },
  ],
})

export default router
