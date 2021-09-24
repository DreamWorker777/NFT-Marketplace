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
  mounted() {
    Vue.loadScript('https://gigaland.io/js/jquery.min.js')
    Vue.loadScript('https://gigaland.io/js/bootstrap.min.js')
    Vue.loadScript('https://gigaland.io/js/bootstrap.bundle.min.js')
    Vue.loadScript('https://gigaland.io/js/wow.min.js')
    Vue.loadScript('https://gigaland.io/js/jquery.isotope.min.js')
    Vue.loadScript('https://gigaland.io/js/easing.js')
    Vue.loadScript('https://gigaland.io/js/owl.carousel.js')
    Vue.loadScript('https://gigaland.io/js/validation.js')
    Vue.loadScript('https://gigaland.io/js/jquery.magnific-popup.min.js')
    Vue.loadScript('https://gigaland.io/js/enquire.min.js')
    Vue.loadScript('https://gigaland.io/js/jquery.plugin.js')
    Vue.loadScript('https://gigaland.io/js/jquery.countTo.js')
    Vue.loadScript('https://gigaland.io/js/jquery.countdown.js')
    Vue.loadScript('https://gigaland.io/js/jquery.lazy.min.js')
    Vue.loadScript('https://gigaland.io/js/jquery.lazy.plugins.min.js')
    Vue.loadScript('https://gigaland.io/js/designesia.js')
    Vue.loadScript('https://gigaland.io/js/particles.js')
    Vue.loadScript('https://gigaland.io/js/particles-settings-2.js')
  },
  render: h => h(App)
}).$mount('#app')
