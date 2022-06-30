<template>
  <div class="container">
    <section id="work-view">
      <div class="sidebar dark">
        <p class="subtitle">freelance projects</p>
        <TheButton
          ref="btnFocus"
          payload="vues"
          text="Es Alimento"
          theme="light"
          :animation="{ borderRight: true }"
          @btnClick="load"
        />
        <TheButton
          payload="tuning"
          text="Tuning Academy"
          theme="light"
          :animation="{ borderRight: true }"
          @btnClick="load"
        />
        <TheButton
          payload="bielo"
          text="Bielo Media"
          theme="light"
          :animation="{ borderRight: true }"
          @btnClick="load"
        />
        <TheButton
          payload="nfts"
          text="MNKYBSNSS"
          theme="light"
          :animation="{ borderRight: true }"
          @btnClick="load"
        />
        <p class="subtitle">personal projects</p>
        <TheButton
          payload="destinations"
          text="Destinations"
          theme="light"
          :animation="{ borderRight: true }"
          @btnClick="load"
        />
        <TheButton
          payload="mind"
          text="Mind Models"
          theme="light"
          :animation="{ borderRight: true }"
          @btnClick="load"
        />
        <TheButton
          payload="integers"
          text="Integers Game"
          theme="light"
          :animation="{ borderRight: true }"
          @btnClick="load"
        />
      </div>
      <div class="main light">
        <div class="intro-snippet" v-if="currentProject == ''">
          <h1>Explore Projects</h1>
          <img
            src="../assets/arrow-left-solid.svg"
            alt="arrow pointing to the left"
            class="arrow"
          />
        </div>
        <ProjectSnippet :project="snippets[currentProject]" v-else />
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
      currentProject: "",
      snippets: snippets,
    };
  },
  methods: {
    load: function (payload) {
      this.currentProject = payload;
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
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
}

.main {
  grid-column: span 4;
}

.sidebar * {
  margin-right: 15px;
  margin-left: 15px;
  text-align: center;
  margin-bottom: 25px;
}

.intro-snippet {
  display: grid;
  grid-template-columns: 1fr;
}

.intro-snippet > * {
  text-align: center;
  margin-top: 100px;
}
.arrow {
  width: 80px;
  justify-self: center;
  align-self: center;
}

.arrow {
  animation: shake 2s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }

  50% {
    transform: translate(-20px, 0px) rotate(0deg);
  }

  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
}
</style>