<template>
  <div class="container">
    <section>
      <h1 class="hero span2">get in touch</h1>
      <div class="dark">eu</div>
      <form class="dark" @submit.prevent="send">
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
    send: function () {
      console.log([this.email, this.subject, this.message]);
      console.log("im here");
    },
  },
};
</script>

<style>
/* the container is a grid element in order to center the section element */
.container {
  display: grid;
  height: 100vh;
}

h1 {
  text-align: center;
}
section {
  display: grid;
  grid-template-columns: 1fr 1fr;

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
</style>