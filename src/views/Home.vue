<template>
  <div class="no-bottom no-top" id="content">

    <div id="top"></div>
    
    <top-particle />
    <popular-items />
    <collections />
    <top-sellers />
    <steps />

  </div>
</template>
<script>
import TopParticle from "@/components/Home/TopParticle";
import PopularItems from "@/components/Home/PopularItems";
import Collections from "@/components/Home/Collections";
import TopSellers from "@/components/Home/TopSellers";
import Steps from "@/components/Home/Steps";

export default {
  components: {
    TopParticle,
    PopularItems,
    Collections,
    TopSellers,
    Steps
  },
  mounted() {
    this.$loadScript('https://gigaland.io/js/particles.js')
      .then(() => {
        this.$unloadScript('https://gigaland.io/js/particles.js')
      })
    
    this.$loadScript('https://gigaland.io/js/particles-settings-2.js')
      .then(() => {
        this.$unloadScript('https://gigaland.io/js/particles-settings-2.js')
      })

    this.$loadScript('https://gigaland.io/js/particles.js')
      .then(() => {
        this.$loadScript('https://gigaland.io/js/particles-settings-2.js')
      })
  }
}
</script>
