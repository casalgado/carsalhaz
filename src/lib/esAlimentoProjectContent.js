export default {
  addOrders: {
    title: "Admin Team Problem: How do we add orders to the database?",
    bullets: [
      "When a customer is selected, their last order pops up. This is for two reasons. 1. Customers normally ask for the same order, or they make small changes, so having the order ready makes the order creation faster. 2. Having easy access to the customers last order allows us to provide better quality customer service because we have more information about the customers preferences.",
      "Instead of searching for products in the dropdown menu, a selection tool was created to select any product with a maximum of 3 clicks.This greatly increases the efficiency of order creation. Two selection tools were created, one for the B2C market, and another for B2B customers.",
    ],
    videoTitle: "add_order.mp4",
  },
  productList: {
    title: "Production Team Problem: What products do we have to make today?",
    bullets: [
      "By going to the dashboard tab, production team can see the orders by customer. Most importantly, the application calculates how much of each bread is required so that the team can supply the right amount of ingredients from the warehouse.",
      "Production team also has the option to print the production summary in order to easily reference it.",
    ],
    videoTitle: "product_list.mp4",
  },
  deliveryRoute: {
    title:
      "Delivery Team Problem: How do we calculate the optimal delivery route?",
    bullets: [
      "The Bakery delivers fresh bread everyday. In the dashboard there is an option to print the delivery route. The list contains customers, their orders, addresses and comments. There is also spaces to take notes and make additional comments.",
      "The printable allows the team to make decisions and communicate their plans easily. This saves around 45 minutes of work per day, and has reduced the amount of delivery mistakes.",
    ],
    videoTitle: "delivery_route.mp4",
  },
  salesRevenue: {
    title: "Admin Team Problem: How do we know our sales revenue?",
    bullets: [
      "In the sales tab it is easy to see sales by day, week, or month.",
      "At the bottom of the table, there are exportable csv versions of the info, taylored to different requirements. They include: 1. report of all sales data; 2. report of sales by customer, in order to understand buying behavior; 3. report of sales by product, in order to determine the best and worse products by volume.",
    ],
    videoTitle: "sales_revenue.mp4",
  },
  persistency: {
    title:
      "Admin Team Problem: How can we better understand our customers buying behavior?",
    bullets: [
      "It was important for the business to know how many customers ordered regularly. The concept of a 'persistent' customer is used to identify a customer that makes repeated orders in a given period. Customers can by persistent by month or by week, which means that they order in two or more consecutive instances of a given period.",
      "A tool was developed to visualize customers by persistency. Additionally, the tool tags customers as 'new' when they order for the first time, and highlights them. The user has the options to sort by name, value, persistency or 'new' status.",
    ],
    videoTitle: "persistency.mp4",
  },
  clientHistory: {
    title:
      "Admin Team Problem: How do we know which of our customers are ready to order again?",
    bullets: [
      "In the customers tab, the admin team can easily see how many days have passed since the customer's last order. This information is used strategically to establish contact with customers and to try to increase the amount of 'persistent' customers.",
      "When clicking on a client, their order history is displayed.",
    ],
    videoTitle: "client_history.mp4",
  },
};
