<template>
  <div class="info-section dark">
    <a href="mailto:contact@carsalhaz.com" target=""
      ><img src="./../../assets/envelope-solid.svg" alt="envelope icon"
    /></a>
    <p class="info-block">contact@carsalhaz.com</p>
    <a href="https://wa.me/573155433505" target="_blank"
      ><img src="./../../assets/phone-solid.svg" alt="phone icon"
    /></a>
    <p class="info-block">+57 315 543 3505</p>

    <a href="https://github.com/casalgado" target="_blank"
      ><img src="./../../assets/github-brands.svg" alt="github logo icon"
    /></a>
    <p class="info-block">casalgado</p>

    <a href="https://www.linkedin.com/in/carsalhaz/" target="_blank"
      ><img src="./../../assets/linkedin-brands.svg" alt="linkedin logo icon"
    /></a>
    <p class="info-block">carsalhaz</p>
  </div>
</template>

<script>
export default {
  name: "InfoSection",
};
</script>

<style scoped>
p {
  text-align: center;
}

a:first-of-type {
  margin-top: 15px;
}

.info-block {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 1em;
  margin-top: 0px;
  display: inline;
}
.info-section {
  display: grid;
  grid-template-columns: 1fr;
}

.info-section a {
  justify-self: center;
  align-self: center;
  width: var(--icon-width);
  border-bottom: 1px solid transparent;
}

.info-section a:hover {
  border-bottom: 1px solid var(--color-text-light);
}
</style>