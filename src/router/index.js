import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Route components
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/pages/NotFound.vue'
import ForgetPassword from '@/views/auth/ForgetPassword.vue'
import EmailSent from '@/views/auth/EmailSent.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import BlankPage from '@/views/pages/BlankPage.vue'
import UserProfile from '@/views/others/UserProfile.vue'
import BasicTables from '@/views/tables/BasicTables.vue'
import Icons from '@/views/UiElements/Icons.vue'
import Alerts from '@/views/UiElements/Alerts.vue'
import Avatars from '@/views/UiElements/Avatars.vue'
import Badges from '@/views/UiElements/Badges.vue'
import Buttons from '@/views/UiElements/Buttons.vue'
import Images from '@/views/UiElements/Images.vue'
import Videos from '@/views/UiElements/Videos.vue'
import Tabs from '@/views/UiElements/Tabs.vue'
import FormElements from '@/views/forms/FormElements.vue'
import TimeTablePage from '@/views/tables/TimeTablePage.vue'

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
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
      title: 'Profile',
    },
  },
  {
    path: '/basic-tables',
    name: 'Basic Tables',
    component: BasicTables,
    meta: {
      requiresAuth: true,
      title: 'Basic Tables',
    },
  },
  {
    path: '/time-table',
    name: 'Time Tables',
    component: TimeTablePage,
    meta: {
      requiresAuth: true,
      title: 'Time Tables',
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
    path: '/form-elements',
    name: 'Form Elements',
    component: FormElements,
    meta: {
      requiresAuth: true,
      title: 'Form Elements',
    }
  },
  {
    path: '/icons',
    name: 'Icons',
    component: Icons,
    meta: {
      requiresAuth: true,
      title: 'Icons',
    },
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: Alerts,
    meta: {
      title: 'Alerts',
    },
  },
  {
    path: '/avatars',
    name: 'Avatars',
    component: Avatars,
    meta: {
      title: 'Avatars',
    },
  },
  {
    path: '/badge',
    name: 'Badge',
    component: Badges,
    meta: {
      title: 'Badge',
    },
  },
  {
    path: '/buttons',
    name: 'Buttons',
    component: Buttons,
    meta: {
      title: 'Buttons',
    },
  },
  {
    path: '/images',
    name: 'Images',
    component: Images,
    meta: {
      title: 'Images',
    },
  },
  {
    path: '/tabs',
    name: 'Tabls',
    component: Tabs,
    meta: {
      title: 'Tabs',
    },
  },
  {
    path: '/videos',
    name: 'Videos',
    component: Videos,
    meta: {
      title: 'Videos',
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
