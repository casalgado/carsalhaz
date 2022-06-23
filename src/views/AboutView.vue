<template>
  <div class="container">
    <section>
      <div class="bar dark">
        <div class="more-info light">
          <p>Bachelors Degree</p>
        </div>
        <img class="full-width" src="https://i.imgur.com/K1iFEF2.jpeg" alt="" />
        <p>
          Design is about solving problems while prioritizing the human beings
          involved. A successful design project is one that improves the quality
          of life of its users. However, a project that is not implemented is a
          waste of time. Designing the implementation of the project is as
          important as designing the project itself. Building a project with all
          the stakeholders involved improves the probability of implementation.
          I have a collaborative approach to design. I view the designer as a
          catalyst who considers the needs off all stakeholders and materializes
          them in a solution that is willfully adopted.
        </p>
        <h1>Industrial Design.</h1>
      </div>
      <div class="bar dark">
        <div class="more-info light">
          <p>Erasmus Mundus Master's Degree</p>
          <p>4 years experience</p>
        </div>
        <h1>Resarch and Education.</h1>
        <img class="inset" src="https://i.imgur.com/K1iFEF2.jpeg" alt="" />
        <p>
          Education is the propagation of knowledge, skills, and competences. To
          be an effective teacher, getting to know your students is as important
          as mastering the subject matter. Teaching is about igniting interest
          and motivation to acquire knowledge. More than that, teaching showing
          others how to trust themselves, how to learn from mistakes, how to
          take risks. My teaching style is relationship based, I see myself as a
          leader that guides students through a path, giving them the safety and
          the freedom to explore the world around them and within them.
        </p>
      </div>
      <div class="bar dark">
        <div class="more-info light">
          <p>Freelance</p>
          <p>6 years on and off experience</p>
        </div>
        <p>
          Software development is leveraging the power of technology to generate
          value. A holistic approach to development starts with studying the
          problem, its context and the requirements of all stakeholders
          involved. My strength as a developer is the ability to bridge the gaps
          between clients, users and developers in order to build flexible and
          robust solutions.
        </p>
        <h1>Software Development.</h1>
        <img class="full-width" src="https://i.imgur.com/K1iFEF2.jpeg" alt="" />
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* the container is a grid element in order to center the section element */
.container {
  display: grid;
  height: 100vh;
}

section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 80px;
  align-self: center;
  justify-self: center;
}

.bar {
  position: relative;
  width: 300px;
  height: 80vh;
}

.bar p,
.bar h1 {
  margin: 5%;
}

h1 {
  font-weight: 700;
}

p {
  line-height: 120%;
}

.inset {
  width: 96%;
  margin: 2%;
}

.full-width {
  width: 100%;
}

.more-info {
  position: absolute;
  top: 0px;
  left: 15px;
  width: 270px;
  height: 40px;
  transition: top 0.3s;
  transition-timing-function: ease-in;
  z-index: -1;
}

.more-info p {
  color: var(--color-text-dark);
  text-align: center;
  margin: 0;
  font-size: 0.9em;
}

.more-info p:first-child {
  margin-top: 4px;
}

.expanded {
  width: 100%;
  height: 0px;
  transition: height 1s;
}

.bar:hover > .more-info {
  top: -40px;
}

.more-info:hover > .expanded {
  height: 300px;
}
</style>