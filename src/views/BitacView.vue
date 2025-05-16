<script setup>
// vue
import { ref, onMounted } from "vue";
import { bitac } from "./../lib/cv";

// components
import RelationshipDropdown from "@/components/bitac/RelationshipsDropdown.vue";

// data
import { DataProcessor } from "@/bitac/DataProcessor";

// setup
const data = ref([]);
const relationships = ref([]);
const categories = ref([]);
const days = ref([]);

// state
const selectedRelationships = ref([]);

onMounted(async () => {
  try {
    const result = await bitac;
    const {
      processed,
      relationships: processedRelationships,
      categories: processedCategories,
      days: processedDays,
    } = DataProcessor.processRawData(result);
    data.value = processed;
    relationships.value = processedRelationships;
    categories.value = processedCategories;
    days.value = processedDays;
    console.log("Data processed successfully");
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
});
</script>

<template>
  <div>
    <h3 class="filter-title">Relationships</h3>
    <RelationshipDropdown
      :relationships="relationships"
      v-model="selectedRelationships"
    />

    <!-- Debug: Show selected relationships -->
    <div v-if="selectedRelationships.length > 0" class="debug-info">
      <p>
        Selected: {{ selectedRelationships.map((r) => r.name || r).join(", ") }}
      </p>
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}

.filter-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.debug-info {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
