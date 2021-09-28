<template>
  <div id="wrapper">
    
    <!-- Header -->
    <navigation />

    <!-- Content -->
    <div class="no-bottom no-top" id="content">
      <router-view />
    </div>

    <!-- Footer -->
    <footer-component />

    <!-- To Top Button -->
    <a href="#" id="back-to-top"></a>

    <notifications group="foo" />
    
    <loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navigation from "@/components/Header/Navigation"
import FooterComponent from '@/components/Footer/Footer.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    FooterComponent,
    Loading
  },
  computed: {
    ...mapGetters([
      'isLoading',
    ]),
  },
  updated() {
    this.$unloadScript('https://gigaland.io/js/designesia.js')
      .then(() => {
        this.$loadScript('https://gigaland.io/js/designesia.js')
      });
  },
  mounted() {
    this.$loadScript('https://gigaland.io/js/designesia.js')
  }
}
</script>