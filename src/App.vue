<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <nav class="dark">
      <RouterLink to="/">home</RouterLink>
      <RouterLink to="/about">about</RouterLink>
      <RouterLink to="/work">work</RouterLink>
      <RouterLink to="/contact">contact</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

body {
  margin: 0;
}

nav {
  width: 100%;
  margin: 0;
  padding: 4px 0px 6px 0px;
  text-align: right;
  position: absolute;
}

nav a {
  margin-right: 60px;
}

nav a:last-child {
  margin-right: 80px;
}
</style>
