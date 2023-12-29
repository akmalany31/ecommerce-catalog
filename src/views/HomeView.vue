<template>
  <div class="home">
    <AppNavbar />
    <div class="container">
      <HeroCom />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppNavbar from "@/components/AppNavbar.vue";
import HeroCom from "@/components/HeroCom.vue";

export default {
  name: "HomeView",
  components: {
    AppNavbar,
    HeroCom,
  },
};
</script>
