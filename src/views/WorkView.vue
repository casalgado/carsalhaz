<template>
  <div class="container">
    <section>
      <div class="sidebar">
        <TheButton text="Business App" theme="dark" />
        <TheButton />
      </div>
      <div class="main"></div>
    </section>
  </div>
</template>

<script>
import TheButton from "../components/TheButton.vue";
export default {
  name: "WorkView",
  components: { TheButton },
};
</script>

<style scoped>
</style>