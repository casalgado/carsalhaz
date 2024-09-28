<!-- Spinner.vue -->
<template>
  <div class="spinner" :class="`${loading ? 'show' : 'hide'}`">
    <div id="nucleus"></div>
    <div id="orbit"></div>
    <div id="electron"></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Define props to accept loading state
const props = defineProps({
  loading: Boolean,
});
</script>

<style scoped lang="scss">
$spinner-width: 60px;
$nucleus-width: $spinner-width * 0.4;
$orbit-width: $spinner-width * 0.8;
$electron-width: $spinner-width * 0.15;

.spinner {
  width: $spinner-width;
  height: $spinner-width;
  position: absolute;
  opacity: 0.8;
  left: 50%;
  top: 50%;
  animation: spin 5s linear infinite;
  transition: all 0.5s;
}

.spinner > div {
  border-radius: 100px;
  position: absolute;
}

#nucleus {
  background-color: var(--color-text-dark);
  width: $nucleus-width;
  height: $nucleus-width;
  left: calc(($spinner-width - $nucleus-width) / 2);
  top: calc(($spinner-width - $nucleus-width) / 2);
}

#orbit {
  border: 2px solid var(--color-text-dark);
  width: $orbit-width;
  height: $orbit-width;
  left: calc((($spinner-width - $orbit-width) / 2) - 1px);
  top: calc((($spinner-width - $orbit-width) / 2) - 1px);
}

#electron {
  background-color: var(--color-text-dark);
  width: $electron-width;
  height: $electron-width;
  left: calc(
    (($spinner-width - $orbit-width) / 2) - (($electron-width - 2px) / 2)
  );
  top: calc(($spinner-width - $electron-width) / 2);
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.show {
  opacity: 1;
}

.hide {
  opacity: 0;
}
</style>
