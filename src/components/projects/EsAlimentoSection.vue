<template>
  <div class="section">
    <p class="span2">
      {{ content.title }}
    </p>
    <video id="vid1" class="" muted autoplay poster="">
      <source type="video/webm" :src="path" />
    </video>
    <ul>
      <li>solution</li>
      <li v-for="(b, i) in content.bullets" :key="i">{{ b }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EsAlimentoSection",
  props: {
    content: {
      type: Object,
      default: {
        title: "",
        bullets: [""],
        videoTitle: "",
      },
    },
  },
  computed: {
    path: function () {
      return new URL(
        `../../assets/esalimento/${this.content.videoTitle}`,
        import.meta.url
      ).href;
    },
  },
};
</script>

<style>
</style>