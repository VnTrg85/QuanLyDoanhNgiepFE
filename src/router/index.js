import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChatsView from '../views/ChatsView.vue'
import DefaultLayout from '@/Layout/DefaultLayout.vue'
import TaskView from '../views/Taskview.vue'

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
        {
          path: '/tasks',
          name: 'tasks',
          component: TaskView,
        },
      ],
    },
  ],
})

export default router
