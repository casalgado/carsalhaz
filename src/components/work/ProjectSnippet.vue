<template>
  <div id="snippet">
    <h1 class="title span2">{{ project.title }}</h1>
    <p class="description span2">{{ project.description }}</p>
    <div>
      <h2>problem</h2>
      <ul>
        <li v-for="(p, i) in project.problems" :key="i">{{ p }}</li>
      </ul>
    </div>
    <div>
      <h2>solution</h2>
      <p>{{ project.solution }}</p>
    </div>
    <h2 class="span2">showcase</h2>
    <ul class="tags span2">
      <li v-for="(p, i) in project.tags" :key="i" class="tag">
        <TheTag :text="p" theme="dark" />
      </li>
    </ul>
    <ul class="span2">
      <li v-for="(p, i) in project.showcase" :key="i">{{ p }}</li>
    </ul>

    <div class="buttons span2">
      <TheButton
        v-for="(b, i) in project.buttons"
        :key="i"
        :text="b.text"
        :payload="b.payload"
        theme="dark"
      />
    </div>
  </div>
</template>

<script>
import TheButton from "../TheButton.vue";
import TheTag from "../TheTag.vue";
export default {
  name: "ProjectSnippet",
  components: { TheButton, TheTag },
  props: {
    project: {
      type: Object,
      default: {
        title: "oeu",
        description: "",
        problems: [""],
        solutions: "",
        showcase: ["", ""],
        tags: [""],
      },
    },
  },
  methods: {
    linkTo: function (link) {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
#snippet {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#snippet * {
  margin: 10px 15px 10px 15px;
}

#snippet:first-child {
  margin-top: 15px;
}

.tag {
  display: inline-block;
}

h1,
h2,
h3 {
  text-align: center;
}

ul {
  padding-left: 0px;
}

li {
  list-style-type: none;
}

.description {
  max-width: 600px;
  margin: 0 auto !important;
  text-align: center;
}
.span2 {
  grid-column: span 2;
}

.tags,
.buttons {
  width: max-content;
  padding: 0px;
  align-self: center;
  justify-self: center;
}
</style>