<template>
  <button @click="$emit('btnClick', payload)" :class="computedClass">
    {{ text }}
  </button>
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
    animation: {
      type: Object,
      default: { borderRight: false, borderLeft: false },
    },
  },
  computed: {
    computedClass: function () {
      return [
        this.theme,
        `${this.animation.borderRight ? "border-right-animation" : ""}`,
        `${this.animation.borderLeft ? "border-left-animation" : ""}`,
      ].join(" ");
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
  border: none;
  outline: none !important;
}

button.light:focus {
  background: var(--color-background-light-complement);
}

button.dark:focus {
  background: var(--color-background-dark-complement);
}

button.border-right-animation:focus {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

button.border-left-animation:focus {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

button:hover {
  text-decoration: dotted underline;
}
</style>