<template>
  <div class="view-container">
    <section class="contact-view-section">
      <h1 class="hero span2">get in touch</h1>
      <div class="info-section dark">
        <a href="mailto:contact@carsalhaz.com" target=""
          ><img src="../assets/envelope-solid.svg" alt="envelope icon"
        /></a>
        <p class="info-block">contact@carsalhaz.com</p>

        <a href="https://wa.me/573155433505" target="_blank"
          ><img src="../assets/phone-solid.svg" alt="phone icon"
        /></a>
        <p class="info-block">+57 315 543 3505</p>

        <a href="https://github.com/casalgado" target="_blank"
          ><img src="../assets/github-brands.svg" alt="github logo icon"
        /></a>
        <p class="info-block">casalgado</p>

        <a href="https://www.linkedin.com/in/carsalhaz/" target="_blank"
          ><img src="../assets/linkedin-brands.svg" alt="linkedin logo icon"
        /></a>
        <p class="info-block">carsalhaz</p>
      </div>
      <form class="dark" @submit.prevent="sendEmail">
        <label for="email">your email</label>
        <input v-model="email" id="email" class="light-complement" />
        <label for="subject">subject</label>
        <input v-model="subject" id="subject" class="light-complement" />
        <label for="message">message</label>
        <textarea
          v-model="message"
          id="message"
          class="light-complement"
        ></textarea>
        <TheButton theme="light" text="send message" />
      </form>
    </section>
  </div>
</template>

<script>
import emailjs from "@emailjs/browser";
import TheButton from "../components/TheButton.vue";
export default {
  name: "HomeView",
  components: { TheButton },
  data() {
    return {
      email: "",
      subject: "",
      message: "",
    };
  },
  methods: {
    sendEmail: function () {
      console.log(emailjs);
      let serviceID = "carsalhaz_contact";
      let templateID = "template_448ku3h";
      let publicKey = "dK6RmHzCvEn6xt7B5";
      let templateParams = {
        email: this.email,
        subject: this.subject,
        message: this.message,
      };
      emailjs.send(serviceID, templateID, templateParams, publicKey).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message Sent!");
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
    },
  },
};
</script>

<style scoped>
h1,
h2,
p {
  text-align: center;
}

.info-block {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 1em;
  margin-top: 0px;
  display: inline;
}

.contact-view-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px;
  align-self: center;
  justify-self: center;
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

form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
}

button {
  grid-column: span 3;
}

input,
textarea {
  width: 100%;
  grid-column: span 2;
  outline: none !important;
  border: none;
  font-size: 15px;
  font-family: "Cabin", sans-serif;
}

textarea {
  height: 150px;
}

label {
  font-family: "Montserrat", sans-serif;
  text-align: right;
}

img {
  width: var(--icon-width);
}

a:first-of-type {
  margin-top: 15px;
}
</style>
