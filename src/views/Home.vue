<template>
  <div>
    <home />
    <about />
    <download />
    <contact />
  </div>
</template>
<script>
import home from "@/components/landing/HomeSection";
import about from "@/components/landing/AboutSection";
import download from "@/components/landing/DownloadSection";
import contact from "@/components/landing/ContactSection";
export default {
  components: {
    home,
    about,
    download,
    contact,
  },
}
</script>
