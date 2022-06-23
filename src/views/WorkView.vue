<template>
  <div class="container">
    <section id="work-view">
      <div class="sidebar">
        <p>freelance projects</p>
        <TheButton
          ref="btnFocus"
          payload="vues"
          text="Es Alimento"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          payload="tuning"
          text="Tuning Academy"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          payload="bielo"
          text="Bielo Media"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          payload="nfts"
          text="MNKYBSNSS"
          theme="light"
          @btnClick="load"
        />
        <p>personal projects</p>
        <TheButton
          payload="destinations"
          text="Destinations"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          payload="mind"
          text="Mind Models"
          theme="light"
          @btnClick="load"
        />
        <TheButton
          payload="integers"
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
      currentProject: "vues",
      snippets: snippets,
    };
  },
  methods: {
    load: function (payload) {
      this.currentProject = payload;
    },
  },
  mounted() {
    this.$refs.btnFocus.$el.focus();
  },
};
</script>

<style scoped>
/* the container is a grid element in order to center the section element */
.container {
  display: grid;
  height: 100vh;
}

#work-view {
  align-self: center;
  justify-self: center;
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(5, 1fr);
  gap: 0px;
  height: 80vh;
}

.sidebar {
  background: var(--color-background-dark);
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  gap: 25px;
}

.main {
  background: var(--color-background-light);
  color: var(--color-text-dark);
  grid-column: span 4;
}

.sidebar * {
  margin-right: 15px;
  margin-left: 15px;
  text-align: center;
}
</style>