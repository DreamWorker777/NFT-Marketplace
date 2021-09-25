import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Market from '@/views/Market.vue'
import MarketItem from '@/views/MarketItem.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/Signup.vue'
import GenNFT from '@/views/Gennft.vue'
import Profile from '@/views/Profile.vue'
import About from '@/views/About.vue'

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
  },
  {
    path: '/market/:itemId',
    name: 'MarketItem',
    component: MarketItem,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/generatenft',
    name: 'GenerateNFT',
    component: GenNFT,
    meta: { requiresAuth: true }
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
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// middleware
router.beforeEach(( to, from, next ) => {
  if( to.matched.some( record => record.meta.requiresAuth ) ) {
    if ( store.getters.isAuthenticated ) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
