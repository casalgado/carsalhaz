<template>
  <div class="container">
    <section>
      <div class="text">
        <p>Hello, my name is</p>
        <h1>Carlos</h1>
        <p>Front-end web developer</p>
        <p>Im here to solve problems</p>
      </div>
      <div class="image"></div>
      <div class="call-to-action"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style>
/* the container is a grid element in order to center the section element */
.container {
  display: grid;
  height: 100vh;
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

.text h1 {
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

.image {
  justify-self: center;
  width: 300px;
  height: 300px;
  border-radius: 999px;
  background: var(--color-background-dark);
  box-shadow: 30px 15px var(--color-text-light);
}

.call-to-action {
  justify-self: center;
  grid-column: span 2;
  width: 800px;
  height: 100px;
  background: var(--color-background-dark);
  border-radius: 25px;
}
</style>