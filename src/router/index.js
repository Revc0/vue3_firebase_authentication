import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/login.vue'
import SignUp from '../views/SignUp.vue'
import { auth } from '@/main.js'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (!requiresAuth && currentUser) {
    next('/home')
  } else {
    next()
  }
})

export default router
