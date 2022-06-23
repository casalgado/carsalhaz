<template>
  <span :class="theme">{{ text }}</span>
</template>

<script>
export default {
  name: "TheTag",
  props: {
    text: {
      type: String,
      default: () => "undefined",
    },
    theme: {
      type: String,
      default: () => "light",
    },
  },
};
</script>

<style scoped>
span {
  padding: 8px 15px 8px 15px;
  font-weight: 400;
  border-radius: 99px;
  min-width: 125px;
  cursor: default;
}
.dark {
  border: 1px solid var(--color-background-dark);
  background: transparent;
  color: var(--color-text-dark);
}

.light {
  border: 1px solid var(--color-background-light);
  background: transparent;
  color: var(--color-text-light);
}
</style>