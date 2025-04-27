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
  return Array.from(categories).sort();
};

const calculateCategoriesByDay = (arr) => {
  const categoriesByDay = {};

  arr.forEach((item) => {
    let { Fecha, Categoria, Minutos } = item;
    Categoria = Categoria.trim();
    const doomMinutes = Number(item["DOOM"]) || 0;
    const leerMinutes = Number(item["LEER"]) || 0;
    const totalMinutes = Number(Minutos) || 0;
    const mainCategoryMinutes = (totalMinutes - doomMinutes - leerMinutes) / 60;

    if (!categoriesByDay[Fecha]) {
      categoriesByDay[Fecha] = {};
    }

    // Add main category
    categoriesByDay[Fecha][Categoria] =
      (categoriesByDay[Fecha][Categoria] || 0) + mainCategoryMinutes;

    // Helper to add special categories
    const addSpecialCategory = (categoryName, minutes) => {
      if (minutes > 0) {
        categoriesByDay[Fecha][categoryName] =
          (categoriesByDay[Fecha][categoryName] || 0) + minutes / 60;
      }
    };

    addSpecialCategory("DOOM", doomMinutes);
    addSpecialCategory("LEER", leerMinutes);
  });

  return categoriesByDay;
};

const formatHours = (value) => {
  return value > 0 ? Math.round(value * 10) / 10 : "-";
};
</script>

<template>
  <div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th v-for="category in uniqueCategoriesList" :key="category">
              {{ category }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categories, day) in categoriesByDay" :key="day">
            <td>{{ day.split(",")[1] }}</td>
            <td v-for="category in uniqueCategoriesList" :key="category">
              {{ formatHours(categories[category] || 0) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pre>{{ categoriesByDay }}</pre>
    <pre>{{ uniqueCategoriesList }}</pre>
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0px !important;
  text-align: center;
  width: 30px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

thead {
  background-color: #f8f8f8;
  font-weight: bold;
}
</style>
