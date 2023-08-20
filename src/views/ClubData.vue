<script setup>
import { ref, onBeforeMount } from "vue";
import { members, orders, products } from "./../lib/cv";

let members_data = ref([]);
let orders_data = ref([]);
let products_data = ref([]);
onBeforeMount(() => {
  console.log("obm");
  members.then((res) => {
    members_data.value = res;
  });
  orders.then((res) => {
    orders_data.value = res;
  });
  products.then((res) => {
    products_data.value = res;
  });
});
</script>

<template>
  <div>
    <h2>Miembros</h2>
    <div v-for="(m, i) in members_data" :key="i">{{ members_data[i] }}</div>
    <br />
    <h2>Products</h2>
    <div v-for="(m, i) in products_data" :key="i">{{ products_data[i] }}</div>
    <br />
    <h2>Pedidos</h2>
    <div v-for="(m, i) in orders_data" :key="i">{{ orders_data[i] }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
