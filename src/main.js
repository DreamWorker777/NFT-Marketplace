import Vue from 'vue'
import LoadScript from 'vue-plugin-load-script';

import router from './router'
import store from './store/store'

import App from './App.vue'
import Binancelogo from '@/components/Binancelogo.vue'

Vue.config.productionTip = false

Vue.use(Binancelogo)
Vue.use(LoadScript)

new Vue({
  Binancelogo,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
