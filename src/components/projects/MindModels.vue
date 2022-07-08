<template>
  <div class="container light">
    <center>
      <h1 style="text-align: center">Mind Visualization Applet</h1>
      <p>
        What follows are a series of experiences designed to convey an aspect of
        our inner world. Disclaimer: I am not an expert on the mind. The
        sections below are more inclined towards art that science. Even though
        they were created with an intention, feel free to interpret them in a
        way that is meaningful to you.
      </p>
      <p>
        Breadth: How meaning can be found by expanding our frame of observation.
      </p>
      <p>
        The goal of this experience is to make sense of the image that is being
        hidden. The mouse cursor acts as a "field of view". At level one, you
        will see it is very difficult to make sense of anything. By clicking the
        button, the field of view is expanded. Alternate between expanding the
        field and trying to decipher the image.
      </p>

      <Section :content="content.breadth" />
      <Section :content="content.speed" />
      <Section />
      <Section />
      <Section />
    </center>
  </div>
</template>

<script>
import content from "../../lib/mindModelsProjectContent";
import Section from "./MindModelsSection.vue";
export default {
  name: "MindModels",
  data() {
    return {
      content: content,
    };
  },
  components: { Section },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 1000px;
  padding: 20px;
}
</style>
