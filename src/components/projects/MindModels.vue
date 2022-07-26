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
      <h4>
        Breadth: How meaning can be found by expanding our frame of observation.
      </h4>
      <Section :content="content.breadth" />
      <p>
        The goal of this experience is to make sense of the image that is being
        hidden. The mouse cursor acts as a "field of view". At level one, you
        will see it is very difficult to make sense of anything. By clicking the
        button, the field of view is expanded. Alternate between expanding the
        field and trying to decipher the image.
      </p>
      <h4>Speed: How fast our minds can be</h4>
      <Section :content="content.speed" />
      <p>
        When you click the button, an image will flash for 50 milliseconds. That
        is 1/20th of a second. Even at this speed, your mind can recognize the
        images. Continue pressing the button and observe how fast your mind
        really is.
      </p>
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
