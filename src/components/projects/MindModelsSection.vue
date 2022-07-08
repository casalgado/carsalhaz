<template>
  <div>
    <Frame :src="path" />
  </div>
</template>

<script>
import Frame from "./MindModelsFrame.vue";
export default {
  name: "MindModelsSection",
  components: { Frame },
  props: {
    content: {
      type: Object,
      default: {
        title: "",
        description: "",
        vizTitle: "",
      },
    },
  },
  computed: {
    path: function () {
      return `/projects/mind_models/${this.content.vizTitle}`;
    },
  },
};
</script>

<style scoped></style>
