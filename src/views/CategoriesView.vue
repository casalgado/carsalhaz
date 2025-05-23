<script setup>
// vue
import { ref, onMounted } from "vue";
import { fetchData } from "@/lib/cv";

// components

// data
import { DataProcessor } from "@/bitac/DataProcessor";

// setup
const data = ref([]);
const relationships = ref([]);
const categories = ref([]);
const subcategories = ref([]);
const days = ref([]);

onMounted(async () => {
  try {
    const result = await fetchData("bitac");
    const {
      processed,
      relationships: processedRelationships,
      categories: processedCategories,
      days: processedDays,
      subcategories: processedSubcategories,
    } = DataProcessor.processRawData(result);
    data.value = processed;
    relationships.value = processedRelationships;
    categories.value = processedCategories;
    days.value = processedDays;
    subcategories.value = processedSubcategories;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
});

const categorySummaryForDay = (day, targetCategory = "worktime") => {
  if (!Array.isArray(data.value)) return { total: 0 };

  return data.value
    .filter((e) => e.date === day && e.category === targetCategory)
    .reduce(
      (acc, activity) => {
        const { description: workType, duration } = activity;

        acc[workType] = (acc[workType] || 0) + duration;
        acc.total += duration;

        return acc;
      },
      { total: 0 }
    );
};
</script>

<template>
  <div>
    <div class="worktime-container">
      <div v-for="day in Array.from(days).reverse()" :key="day" :date="day">
        {{ categorySummaryForDay(day) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
