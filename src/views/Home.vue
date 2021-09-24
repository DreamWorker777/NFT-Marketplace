<template>
  <div class="no-bottom no-top" id="content">
    <div id="top"></div>
    
    <top-particle />
    <popular-items />
    <collections />
    <top-sellers />
    <steps />

    <!-- <home />
    <about />
    <download />
    <contact /> -->
  </div>
</template>
<script>
// import home from "@/components/landing/HomeSection";
// import about from "@/components/landing/AboutSection";
// import download from "@/components/landing/DownloadSection";
// import contact from "@/components/landing/ContactSection";

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
    // home,
    // about,
    // download,
    // contact,
  },
}
</script>
