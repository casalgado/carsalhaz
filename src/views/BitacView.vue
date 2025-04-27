<script setup>
import { ref, onMounted } from "vue";
import { bitac } from "./../lib/cv";

const data = ref([]);
const uniqueCategoriesList = ref([]);
const categoriesByDay = ref([]);

onMounted(async () => {
  console.log("obm");
  [data.value] = await Promise.all([bitac]);
  uniqueCategoriesList.value = uniqueCategories(data.value);
  categoriesByDay.value = calculateCategoriesByDay(data.value);
});

const uniqueCategories = (arr) => {
  const categories = new Set();
  arr.forEach((item) => {
    if (item.Categoria) {
      categories.add(item.Categoria.trim());
    }
  });
  return Array.from(categories);
};

const calculateCategoriesByDay = (arr) => {
  const categoriesByDay = {};
  arr.forEach((item) => {
    if (!categoriesByDay[item.Fecha]) {
      categoriesByDay[item.Fecha] = {};
    }
    console.log("M", item.Minutos);
    console.log("D", Number(item["DOOM"]));
    console.log("L", item["LEER"]);

    if (categoriesByDay[item.Fecha][item.Categoria]) {
      categoriesByDay[item.Fecha][item.Categoria] +=
        (Number(item.Minutos) - Number(item["DOOM"]) - Number(item["LEER"])) /
        60;
    } else {
      categoriesByDay[item.Fecha][item.Categoria] =
        (Number(item.Minutos) - Number(item["DOOM"]) - Number(item["LEER"])) /
        60;
    }
    if (Number(item["DOOM"]) > 0) {
      if (categoriesByDay[item.Fecha]["DOOM"]) {
        categoriesByDay[item.Fecha]["DOOM"] += Number(item["DOOM"]) / 60;
      } else {
        categoriesByDay[item.Fecha]["DOOM"] = Number(item["DOOM"]) / 60;
      }
    }
    if (Number(item["LEER"]) > 0) {
      if (categoriesByDay[item.Fecha]["LEER"]) {
        categoriesByDay[item.Fecha]["LEER"] += Number(item["LEER"]) / 60;
      } else {
        categoriesByDay[item.Fecha]["LEER"] = Number(item["LEER"]) / 60;
      }
    }
  });
  return categoriesByDay;
};
</script>

<template>
  <div>
    <pre>{{ categoriesByDay }}</pre>
    <pre>{{ uniqueCategoriesList }}</pre>
    <pre>{{ data }}</pre>
  </div>
</template>

<style>
// Global Styles
body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
