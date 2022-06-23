<template>
  <button @click="$emit('btnClick', id)" :class="theme">{{ text }}</button>
</template>

<script>
export default {
  name: "TheButton",
  props: {
    id: {
      type: String,
      default: () => "id",
    },
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
  cursor: pointer;
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