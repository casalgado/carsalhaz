<template>
  <div class="container light">
    <h1 style="text-align: center">Business App for Es Alimento Bakery</h1>
    <div class="intro">
      <p>
        The business referenced in this page is a bakery specialized in
        sourdough bread. The bakery only sells fresh bread, delivered to the
        customer at their home. Customers have the option to order by calling or
        texting the bakery, or by using the shopify storefront. A CRUD app was
        developed to keep track of business data and establish communication
        between admin and production teams.
      </p>
      <p>
        In the following post, you will find a series of problems the bakery
        has, and how they are solved by the application.
      </p>
      <p>Customer names have been encrypted for privacy reasons.</p>
    </div>

    <Section :content="content.addOrders" />
    <Section :content="content.productList" />
    <Section :content="content.deliveryRoute" />
    <Section :content="content.salesRevenue" />
    <Section :content="content.persistency" :wide="true" />
    <Section :content="content.clientHistory" />
  </div>
</template>

<script>
import content from "../../lib/esAlimentoProjectContent";
import TheButton from "../TheButton.vue";
import Section from "./EsAlimentoSection.vue";
export default {
  name: "Es Alimento",
  components: { TheButton, Section },
  data() {
    return {
      content: content,
    };
  },
  methods: {
    play: function (payload) {
      document.getElementById(`vid${payload}`).play();
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 1000px;
  padding: 20px;
}

.intro {
  width: 800px;
  margin: 0 auto;
  text-align: justify;
}
</style>
