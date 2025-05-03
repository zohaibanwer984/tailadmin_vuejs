import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Route components
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound.vue'
import ForgetPassword from '@/views/auth/ForgetPassword.vue'
import EmailSent from '@/views/auth/EmailSent.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import BlankPage from '@/views/pages/BlankPage.vue'

const routes = [
  {
    path: '/',
    redirect: (to) => {
      const authStore = useAuthStore()
      // return authStore.isAuthenticated ? { name: 'Dashboard' } : { name: 'Login' }
      return true ? { name: 'Dashboard' } : { name: 'Login' }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true,
      title: 'Login',
    },
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword,
    meta: {
      requiresGuest: true,
      title: 'Forget Password',
    },
  },
  {
    path: '/email-sent',
    name: 'EmailSent',
    component: EmailSent,
    meta: {
      requiresGuest: true,
      title: 'Email Sent',
    },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      requiresGuest: true,
      title: 'Reset Password',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: 'Dashboard',
    },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: BlankPage,
    meta: {
      requiresAuth: true,
      title: 'Blank',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      requiresAuth: true,
      title: 'Page Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  hashRoute: '/#/',
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  // const authStore = useAuthStore()
  // const isAuthenticated = authStore.isAuthenticated

  // // Check if route requires authentication
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   return next({ name: 'Login', query: { redirect: to.fullPath } })
  // }

  // // Check if route requires guest (non-authenticated user)
  // if (to.meta.requiresGuest && isAuthenticated) {
  //   return next({ name: 'Dashboard' })
  // }

  // // Ensure /email-sent is only accessible via /forget-password
  // if (to.name === 'EmailSent' && to.query.from !== 'forget-password') {
  //   return next({ name: 'Login' })
  // }

  next()
})

export default router
