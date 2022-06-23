<template>
  <div class="container">
    <section>
      <div class="sidebar">
        <p>freelance projects</p>
        <TheButton
          id="vues"
          text="Apps for Business"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          id="tuning"
          text="Organization Website"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          id="vues"
          text="NFT Project"
          theme="light"
          @btnClick="load"
        />
        <p>personal projects</p>
        <TheButton
          id="vues"
          text="Destinations"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          id="vues"
          text="Mind Models"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          id="vues"
          text="Integers Game"
          theme="light"
          @btnClick="load"
        />
      </div>
      <div class="main">
        <ProjectSnippet :project="snippets[currentProject]" />
      </div>
    </section>
  </div>
</template>

<script>
import snippets from "../lib/projectSnippets";
import ProjectSnippet from "../components/work/ProjectSnippet.vue";
import TheButton from "../components/TheButton.vue";
export default {
  name: "WorkView",
  components: { TheButton, ProjectSnippet },
  data() {
    return {
      currentProject: "aoeu",
      snippets: snippets,
    };
  },
  methods: {
    load: function (id) {
      console.log(id);
      this.currentProject = id;
    },
  },
};
</script>

<style scoped>
/* the container is a grid element in order to center the section element */
.container {
  display: grid;
  height: 100vh;
}

section {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-self: center;
  justify-self: center;
}

section p {
  text-align: center;
}

.sidebar {
  width: 200px;
  background: var(--color-background-dark);
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  gap: 25px;
}

.main {
  width: 800px;
  grid-column: span 4;
  background: var(--color-background-light);
  height: 80vh;
  color: var(--color-text-dark);
}

.sidebar * {
  margin-right: 15px;
  margin-left: 15px;
}
</style>