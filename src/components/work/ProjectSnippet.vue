<template>
  <div id="snippet">
    <h1 class="title span2">{{ project.title }}</h1>
    <p class="center span2">{{ project.description }}</p>
    <div class="light-complement">
      <h2>problem</h2>
      <ul>
        <li v-for="(p, i) in project.problems" :key="i">{{ p }}</li>
      </ul>
    </div>
    <div class="light-complement">
      <h2>solution</h2>
      <p>{{ project.solution }}</p>
    </div>
    <h2 class="span2">showcase</h2>
    <p class="center span2">
      {{ project.showcase }}
    </p>
    <ul class="list span2">
      <li v-for="(p, i) in project.tags" :key="i" class="list-item">
        <TheTag :text="p" theme="light" />
      </li>
    </ul>
    <ul class="list span2">
      <li v-for="(b, i) in project.buttons" :key="i" class="list-item">
        <TheButton :key="i" :text="b.text" :payload="b.payload" theme="dark" />
      </li>
    </ul>
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

#snippet > * {
  margin: 0px;
  padding: 10px 15px 10px 15px;
}

#snippet * {
  text-align: center;
}

#snippet:first-child {
  padding-top: 15px;
}

h1,
h2,
h3 {
  text-align: center;
  margin: 0px;
}

ul {
  padding-left: 0px;
}

li {
  list-style-type: none;
}

.center {
  max-width: 600px;
  margin: 0 auto !important;
}

.list {
  width: max-content;
  align-self: center;
  justify-self: center;
}

.list-item {
  display: inline-block;
  padding: 10px 15px 10px 15px;
}
</style>