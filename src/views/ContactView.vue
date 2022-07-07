<template>
  <div class="view-container">
    <section class="contact-view-section">
      <h1 class="hero span2">get in touch</h1>
      <InfoSection />
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
import InfoSection from "./../components/contact/InfoSection.vue";
import TheButton from "../components/TheButton.vue";
export default {
  name: "HomeView",
  components: { TheButton, InfoSection },
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
h2 {
  text-align: center;
}

.contact-view-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px;
  align-self: center;
  justify-self: center;
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
</style>
