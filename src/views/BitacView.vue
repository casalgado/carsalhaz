<script setup>
import { ref, onMounted } from "vue";
import { bitac } from "./../lib/cv";
import { DataProcessor } from "@/bitac/DataProcessor";

const data = ref([]);
const relationships = ref([]);
const categories = ref([]);

onMounted(async () => {
  try {
    const result = await bitac;
    const {
      processed,
      relationships: processedRelationships,
      categories: processedCategories,
    } = DataProcessor.processRawData(result);
    data.value = processed;
    relationships.value = processedRelationships;
    categories.value = processedCategories;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
});
</script>

<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
