import Vue from 'vue'
import LoadScript from 'vue-plugin-load-script'
import Toasted from 'vue-toasted'
import Notifications from 'vue-notification'
import VueSimpleAlert from "vue-simple-alert";

import router from './router'
import store from './store/store'

import App from './App.vue'
import BinanceLogo from '@/components/BinanceLogo.vue'

Vue.config.productionTip = false

Vue.use(Toasted, {
  duration: 5000
})
Vue.use(Notifications)

Vue.use(BinanceLogo)
Vue.use(LoadScript)
Vue.use(VueSimpleAlert)

new Vue({
  BinanceLogo,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
