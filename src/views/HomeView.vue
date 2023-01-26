<template>
  <section>
    <div id="home-view">
      <div class="text-section">
        <p>Hello, my name is</p>
        <h1 class="hero-text">Carlos</h1>
        <p>Front-end developer, designer, educator.</p>
      </div>
      <div class="image-cont"><img src="../assets/face.png" alt="" /></div>
      <ul class="calls-to-action">
        <li><RouterLink to="/work">work</RouterLink></li>
        <li><RouterLink to="/contact">contact</RouterLink></li>
      </ul>
    </div>
  </section>
</template>

<script>
import TheButton from "../components/TheButton.vue";
import InfoSection from "../components/contact/InfoSection.vue";
export default {
  name: "HomeView",
  components: { TheButton, InfoSection },
  methods: {
    linkTo: function (payload) {
      this.$router.push(payload);
    },
  },
};
</script>

<style scoped>
#home-view {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
  align-self: center;
  justify-self: center;
}

.text-section {
  justify-self: center;
  align-self: center;
  color: var(--color-text-dark);
}

.text-section p {
  font-weight: 600;
  font-size: 1.2em;
  margin: 0;
}

.image-cont {
  justify-self: center;
  width: 300px;
  height: 300px;
  border-radius: 999px;
  background: var(--color-background-dark);
  box-shadow: 30px 15px var(--color-text-light);
  overflow: hidden;
}

.image-cont img {
  width: 100%;
}

.calls-to-action {
  justify-self: stretch;
  background: var(--color-background-dark);
  border-radius: 25px;
  padding: 15px;
  display: flex;
  justify-content: center;
  gap: 120px;
  box-shadow: 6px 5px var(--color-text-light);
}

.calls-to-action > li {
  list-style-type: none;
  display: inline;
  font-size: 1.5em;
}

@media (min-width: 768px) {
  #home-view {
    grid-template-columns: 1fr 1fr;
  }

  .calls-to-action {
    grid-column: span 2;
  }
}
</style>
