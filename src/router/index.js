import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChatsView from '../views/ChatsView.vue'
import DefaultLayout from '@/Layout/DefaultLayout.vue'
import CalendarView from '@/views/CalendarView.vue'
import DetailCalendar from '@/components/DetailCalendar.vue'
import SigninView from '@/views/SigninView.vue'

const isAuthenticated = () => {
  return Boolean(localStorage.getItem('auth')) // Kiểm tra localStorage để xác định người dùng đã đăng nhập chưa
}

const routes = [
  {
    path: '/',
    name: 'pulbic',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: '/chats',
        name: 'chats',
        component: ChatsView,
        meta: { requiresAuth: true },
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: CalendarView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: SigninView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  // Kiểm tra nếu route yêu cầu đăng nhập
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Nếu chưa đăng nhập, chuyển hướng tới trang login
    if (!isAuthenticated()) {
      next('/auth')
    } else {
      next() // Đã đăng nhập, cho phép truy cập
    }
  } else {
    next() // Route không yêu cầu đăng nhập, cho phép truy cập
  }
})

export default router
