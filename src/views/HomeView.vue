<template>
  <div class="container">
    <TheLanding />
  </div>
</template>

<script>
import TheLanding from "../components/home/TheLanding.vue";
export default {
  name: "HomeView",
  components: { TheLanding },
};
</script>

<style>
.container {
  display: grid;
  height: 100vh;
}
</style>