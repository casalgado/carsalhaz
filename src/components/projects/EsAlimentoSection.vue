<template>
  <div class="section">
    <p class="span2">
      {{ content.title }}
    </p>
    <video id="vid1" :class="wide ? 'span2' : ''" muted autoplay poster="">
      <source type="video/webm" :src="path" />
    </video>
    <ul :class="wide ? 'span2' : ''">
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
    wide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    path: function () {
      return new URL(
        `../../../public/projects/esalimento/${this.content.videoTitle}`,
        import.meta.url
      ).href;
    },
  },
};
</script>

<style scoped>
video {
  justify-self: center;
  width: 100%;
}

.section {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.section > *:first-child {
  text-align: center;
  font-weight: bolder;
  font-size: 1.2em;
  border-top: 1px solid var(--color-text-dark);
  padding-top: 15px;
}

ul {
  padding-right: 25px;
}

ul > li {
  margin-bottom: 15px;
}

ul > li:first-child {
  text-align: center;
  list-style-type: none;
  font-weight: bolder;
  font-size: 1.2em;
  margin-bottom: 5px;
}
</style>
