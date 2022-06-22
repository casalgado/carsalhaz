<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">home</RouterLink>
        <RouterLink to="/about">about</RouterLink>
        <RouterLink to="/work">work</RouterLink>
        <RouterLink to="/contact">contact</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

nav {
  width: 100%;
  color: var(--color-text-light);
  background: var(--color-background-dark);
  margin: 0;
  padding: 4px 0px 6px 0px;
  text-align: right;
}

nav a {
  margin-right: 60px;
}

nav a:last-child {
  margin-right: 80px;
}
</style>
