<template>
  <div class="view-container">
    <section id="home-view-mobile">
      <div class="image-cont"><img src="../assets/face.png" alt="" /></div>
      <div class="text">
        <p style="margin-top: 25px">Hello, my name is</p>
        <h1 class="hero">Carlos</h1>
        <p>Web developer, designer, educator.</p>
      </div>
      <p id="notice" class="dark">
        This website is optimized for desktop.<br />Mobile version is limited to
        this tab.
      </p>
      <InfoSection />
    </section>
    <section id="home-view-desktop">
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
#home-view-desktop {
  display: none;
}

#home-view-mobile {
  display: grid;
  grid-template-columns: 1fr;
  align-self: center;
  justify-self: center;
  padding: 50px;
}

#notice {
  border-radius: 5px;
  text-align: center;
}

@media (min-width: 768px) {
  #home-view-desktop {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-self: center;
    justify-self: center;
  }

  #home-view-mobile {
    display: none;
  }
}

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
