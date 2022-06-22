<template>
  <button :class="theme">{{ text }}</button>
</template>

<script>
export default {
  name: "TheButton",
  props: {
    text: {
      type: String,
      default: () => "undefined",
    },
    theme: {
      type: Boolean,
      default: () => "light",
    },
  },
};
</script>

<style scoped>
button {
  padding: 8px 15px 8px 15px;
  font-weight: 600;
  border-radius: 99px;
}
.dark {
  background: var(--color-background-dark);
  border: none;
  color: var(--color-text-light);
}

.light {
  background: var(--color-background-light);
  border: none;
  color: var(--color-text-dark);
}
</style>