import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'


import Binancelogo from '@/components/Binancelogo.vue'


Vue.config.productionTip = false

Vue.use(Binancelogo)

new Vue({
  vuetify,
  Binancelogo,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
