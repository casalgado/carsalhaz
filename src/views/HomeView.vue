<template>
  <div class="view-container">
    <section>
      <div class="text">
        <p>Hello, my name is</p>
        <h1 class="hero">Carlos</h1>
        <p>Web developer, designer, educator.</p>
      </div>
      <div class="image-cont"><img src="../assets/face.png" alt="" /></div>
      <div class="call-to-action">
        <center>
          <ul>
            <li><RouterLink to="/about">about</RouterLink></li>
            <li><RouterLink to="/work">work</RouterLink></li>
            <li><RouterLink to="/contact">contact</RouterLink></li>
          </ul>
        </center>
      </div>
    </section>
  </div>
</template>

<script>
import TheButton from "../components/TheButton.vue";
export default {
  name: "HomeView",
  components: { TheButton },
  methods: {
    linkTo: function (payload) {
      this.$router.push(payload);
    },
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}

ul > li {
  list-style-type: none;
  display: inline;
  font-size: 1.5em;
  padding-right: 80px;
  padding-left: 80px;
}

section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-self: center;
  justify-self: center;
}

.text {
  width: 300px;
  justify-self: center;
  align-self: center;
}

.hero {
  margin: 0;
  font-size: 6em;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: var(--color-text-dark);
  position: relative;
  left: -6px;
  top: -6px;
  text-shadow: 6px 5px var(--color-text-light);
}

.text p {
  color: var(--color-text-dark);
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

.call-to-action {
  justify-self: center;
  grid-column: span 2;
  width: 800px;

  background: var(--color-background-dark);
  border-radius: 25px;
}
</style>
