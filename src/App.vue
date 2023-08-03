<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      notAtHome: false,
    };
  },
  computed: {
    currentPath: function () {
      return this.route;
    },
  },
  watch: {
    $route(to) {
      if (to.name == "home") {
        this.notAtHome = false;
      } else {
        this.notAtHome = true;
      }
    },
  },
};
</script>

<style>
@import "@/assets/base.css";
</style>
