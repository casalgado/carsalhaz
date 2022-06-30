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

    <div class="section">
      <p class="span2">
        Admin Team Problem: How do we add orders to the database?
      </p>
      <video id="vid1" class="" muted poster="">
        <source type="video/webm" src="../../assets/esalimento/add_order.mp4" />
      </video>
      <ul>
        <li>solution</li>
        <li>
          When a customer is selected, their last order pops up. This is for two
          reasons. 1. Customers normally ask for the same order, or they make
          small changes, so having the order ready makes the order creation
          faster. 2. Having easy access to the customers last order allows us to
          provide better quality customer service because we have more
          information about the customers preferences.
        </li>
        <li>
          Instead of searching for products in the dropdown menu, a selection
          tool was created to select any product with a maximum of 3 clicks.
          This greatly increases the efficiency of order creation. Two selection
          tools were created, one for the B2C market, and another for B2B
          customers
        </li>
        <li>
          <TheButton
            text="play video"
            theme="dark"
            payload="1"
            @btnClick="play"
          />
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="span2">
        Production Team Problem: What products do we have to make today?
      </p>
      <video id="vid2" class="" muted poster="">
        <source
          type="video/webm"
          src="../../assets/esalimento/product_list.mp4"
        />
      </video>
      <ul>
        <li>solution</li>
        <li>
          By going to the dashboard tab, production team can see the orders by
          customer. Most importantly, the application calculates how much of
          each bread is required so that the team can supply the right amount of
          ingredients from the warehouse.
        </li>
        <li>
          Production team also has the option to print the production summary in
          order to easily reference it.
        </li>
        <li>
          <TheButton
            text="play video"
            theme="dark"
            payload="2"
            @btnClick="play"
          />
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="span2">
        Delivery Team Problem: How do we calculate the optimal delivery route?
      </p>
      <video id="vid3" class="" muted poster="">
        <source
          type="video/webm"
          src="../../assets/esalimento/delivery_route.mp4"
        />
      </video>
      <ul>
        <li>solution</li>
        <li>
          The Bakery delivers fresh bread everyday. In the dashboard there is an
          option to print the delivery route. The list contains customers, their
          orders, addresses and comments. There is also spaces to take notes and
          make additional comments.
        </li>
        <li>
          The printable allows the team to make decisions and communicate their
          plans easily within the team. The printable saves around 45 minutes of
          work per day, and has reduced the amount of delivery mistakes.
        </li>
        <li>
          <TheButton
            text="play video"
            theme="dark"
            payload="3"
            @btnClick="play"
          />
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="span2">Admin Team Problem: How do we know our sales revenue?</p>
      <video id="vid4" class="" muted poster="">
        <source
          type="video/webm"
          src="../../assets/esalimento/sales_revenue.mp4"
        />
      </video>
      <ul>
        <li>solution</li>
        <li>
          In the sales tab it is easy to see sales by day, week, or month.
        </li>
        <li>
          At the bottom of the table, there are exportable csv versions of the
          info, taylored to different requirements. They include: 1. report of
          all sales data; 2. report of sales by customer, in order to understand
          buying behavior; 3. report of sales by product, in order to determine
          the best and worse products by volume.
        </li>
        <li>
          <TheButton
            text="play video"
            theme="dark"
            payload="4"
            @btnClick="play"
          />
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="span2">
        Admin Team Problem: How can we better understand our customers buying
        behavior?
      </p>
      <video id="vid5" class="span2" muted poster="">
        <source
          type="video/webm"
          src="../../assets/esalimento/persistency.mp4"
        />
      </video>
      <ul class="span2">
        <li>solution</li>
        <li>
          It was important for the business to know how many customers ordered
          regularly. The concept of a 'persistent' customer is used to identify
          a customer that makes repeated orders in a given period. Customers can
          by persistent by month or by week, which means that they order in two
          or more consecutive instances of a given period.
        </li>
        <li>
          A tool was developed to visualize customers by persistency.
          Additionally, the tool tags customers as 'new' when they order for the
          first time, and highlights them. The user has the options to sort by
          name, value, persistency or 'new' status.
        </li>
        <li>
          <TheButton
            text="play video"
            theme="dark"
            payload="5"
            @btnClick="play"
          />
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="span2">
        Admin Team Problem: How do we know which of our customers are ready to
        order again?
      </p>
      <video id="vid6" class="" muted poster="">
        <source
          type="video/webm"
          src="../../assets/esalimento/client_history.mp4"
        />
      </video>
      <ul>
        <li>solution</li>
        <li>
          In the customers tab, the admin team can easily see how many days have
          passed since the customer's last order. This information is used
          strategically to establish contact with customers and to try to
          increase the amount of 'persistent' customers.
        </li>
        <li>When clicking on a client, their order history is displayed.</li>
        <li>
          <TheButton
            text="play video"
            theme="dark"
            payload="6"
            @btnClick="play"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheButton from "../TheButton.vue";
export default {
  name: "Es Alimento",
  components: { TheButton },
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

video {
  justify-self: center;
  width: 100%;
}

.section {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.section > *:first-child {
  text-align: center;
  font-weight: bolder;
  font-size: 1.2em;
  border-top: 1px solid var(--color-text-dark);
  padding-top: 15px;
}

ul {
  padding-right: 25px;
}

ul > li {
  margin-bottom: 15px;
}

ul > li:first-child,
ul > li:last-child {
  text-align: center;
  list-style-type: none;
  font-weight: bolder;
  font-size: 1.2em;
  margin-bottom: 5px;
}
</style>