<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <nav class="dark">
      <ul v-if="notAtHome">
        <li><RouterLink to="/">home</RouterLink></li>
        <li><RouterLink to="/work">work</RouterLink></li>
        <li><RouterLink to="/contact">contact</RouterLink></li>
      </ul>
    </nav>
  </div>

  <RouterView />
  <div id="footer"></div>
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

body {
  margin: 0;
}

nav {
  width: 100%;
  margin: 0;
  padding: 0px;
  text-align: right;
  height: 4vh;
  line-height: 4vh;
  white-space: nowrap;
}

nav > ul {
  margin: 0px;
}

nav > ul > li {
  list-style-type: none;
  display: inline;
}

nav a:hover {
  text-decoration: underline;
}

nav a:last-child {
  margin-right: 80px;
}
</style>
