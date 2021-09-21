import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Market from '@/views/Market.vue'
import MarketItem from '@/views/MarketItem.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Gennft from '@/views/Gennft.vue'
import Profile from '@/views/Profile.vue'

import store from '@/store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/market',
    name: 'Market',
    component: Market,
    // meta: { requiresAuth: true }
  },
  {
    path: '/market/:itemId',
    name: 'Market Item View',
    component: MarketItem,
    props: true,
    // meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/generatenft',
    name: 'GenerateNFT',
    component: Gennft,
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
