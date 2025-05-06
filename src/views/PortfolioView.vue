<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { portfolio_data } from "../lib/cv";

const portfolio = ref([]);

onBeforeMount(() => {
  portfolio_data.then((res) => {
    portfolio.value = res;
  });
});
</script>

<template>
  <div>
    {{ portfolio }}
  </div>
</template>

<style lang="scss" scoped></style>
