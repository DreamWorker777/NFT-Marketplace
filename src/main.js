import Vue from 'vue'
import LoadScript from 'vue-plugin-load-script';

import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'

import Binancelogo from '@/components/Binancelogo.vue'

Vue.config.productionTip = false

Vue.use(Binancelogo)
Vue.use(LoadScript)

new Vue({
  vuetify,
  Binancelogo,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
