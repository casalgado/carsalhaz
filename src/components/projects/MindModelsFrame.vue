<template>
  <iframe :src="src"></iframe>
</template>

<script>
export default {
  name: "MindModelsFrame",
  props: {
    src: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style scoped>
iframe {
  width: 800px;
  height: 650px;
  margin-top: 100px;
}
</style>