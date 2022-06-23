<template>
  <section>
    <h1 class="title">{{ project.title }}</h1>
    <p class="description">{{ project.description }}</p>
    <h3>problems</h3>
    <ul>
      <li v-for="(p, i) in project.problems" :key="i">{{ p }}</li>
    </ul>
    <h3>solution</h3>
    <p>{{ project.solution }}</p>
    <h3>showcase</h3>
    <ul>
      <li v-for="(p, i) in project.showcase" :key="i">{{ p }}</li>
    </ul>
    <h3>tags</h3>
    <ul>
      <li v-for="(p, i) in project.tags" :key="i" class="tag">{{ p }}</li>
    </ul>
    <TheButton id="/home" theme="dark" text="Home" @btnClick="linkTo" />
  </section>
</template>

<script>
import TheButton from "../TheButton.vue";
export default {
  name: "ProjectSnippet",
  components: { TheButton },
  props: {
    project: {
      type: Object,
      default: {
        title: "",
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
section {
  display: grid;
  grid-template-columns: 1fr;
}

section * {
  margin: 5px 15px 5px 15px;
}

.tag {
  display: inline-block;
}
</style>