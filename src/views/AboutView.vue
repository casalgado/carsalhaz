<template>
  <div class="view-container">
    <section>
      <div class="bar dark" @mouseenter="hide('1')">
        <div class="more-info light" id="mf1">
          <p>Bachelors Degree</p>
        </div>
        <div class="content-container">
          <h1>
            Industrial <br />
            Design.
          </h1>
          <p>
            I have a collaborative approach to design. I view the designer as a
            catalyst who evaluates the needs of all stakeholders involved; and
            materializes them into a solution. My design background has provided
            methodologies that allow me to go from abstract ideas to concrete
            solutions.
          </p>

          <img
            class="full-width"
            src="https://i.imgur.com/etPRIOH.jpeg"
            alt=""
          />
          <p class="hover-me" id="hb1">hover me</p>
        </div>
      </div>

      <div class="bar dark" @mouseenter="hide('2')">
        <div class="more-info light" id="mf2">
          <p>Erasmus Mundus Master's Degree</p>
          <p>4 years Teaching Experience</p>
        </div>
        <div class="content-container">
          <h1>Resarch and Education.</h1>
          <img class="inset" src="https://i.imgur.com/Z3BNIjI.jpeg" alt="" />

          <p>
            My teaching philosophy is based on relationship-building. I see
            myself as a leader that inspires learners, giving them the safety
            and the freedom to explore and take risks. My research and teaching
            experience has refined my communication skills and the ability to
            align a group of people towards a common goal. If I can get 6th
            graders excited about math, I can take our team anywhere.
          </p>
          <p class="hover-me" id="hb2">hover me</p>
        </div>
      </div>

      <div class="bar dark" @mouseenter="hide('3')">
        <div class="more-info light" id="mf3">
          <p>Self Taught</p>
          <p>6 years Freelance Experience</p>
        </div>
        <div class="content-container">
          <img
            class="full-width"
            src="https://i.imgur.com/Kgr0313.jpeg"
            alt=""
          />
          <h1>Software Development.</h1>
          <p>
            My strength as a developer is the ability to bridge the gaps between
            clients, developers and users in order to build flexible and robust
            solutions. My background in design, research and education allows me
            to find solutions to a wide variety of problems, and implement them.
            While most of my experience is in front-end, I am constantly
            expanding my knowledge and skills.
          </p>
          <p class="hover-me" id="hb3">hover me</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  methods: {
    hide: function (id) {
      document.getElementById(`hb${id}`).classList.add("hide");
      document.getElementById(`mf${id}`).classList.add("show");
    },
  },
};
</script>

<style scoped>
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
  height: 75vh;
}

.content-container {
  height: 100%;
  overflow: hidden;
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
}

.more-info:hover > .expanded {
  height: 300px;
}

.hover-me {
  position: absolute;
  width: 100%;
  bottom: 15px;
  margin: 0px !important;
  text-align: center;
  font-size: 0.8em;
  font-weight: 100;
  opacity: 1;
  transition: opacity 0.2s linear;
}

.hide {
  opacity: 0;
}

.show {
  top: -40px;
}
</style>
