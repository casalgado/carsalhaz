<template>
  <div>
    <Frame src="/projects/mind_models/layers.html" />
    <Frame src="/projects/mind_models/waves.html" />
    <Frame src="/projects/mind_models/threads.html" />
    <Frame src="/projects/mind_models/breadth.html" />
    <Frame src="/projects/mind_models/milliseconds.html" />
  </div>
</template>

<script>
import Frame from "./MindModelsFrame.vue";
export default {
  name: "MindModels",
  components: { Frame },
};
</script>

<style scoped>
</style>