<template>
  <button @click="$emit('btnClick', payload)" :class="theme">{{ text }}</button>
</template>

<script>
export default {
  name: "TheButton",
  props: {
    payload: {
      type: String,
      default: () => "default",
    },
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
button {
  padding: 12px 18px 12px 18px;
  font-weight: 600;
  border-radius: 99px;
  cursor: pointer;
  transition: border-radius 0.2s;
}

button.light:focus {
  background: #8ecae6;
  outline: none !important;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

button.dark:focus {
  background: #219ebc;
  outline: none !important;
}

button:hover {
  text-decoration: dotted underline;
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