<script setup>
// vue
import { ref, onMounted, computed } from "vue";
import { fetchData } from "@/lib/cv";

// components
import CheckboxDropdown from "@/components/bitac/CheckboxDropdown.vue";

// data
import { DataProcessor } from "@/bitac/DataProcessor";
import DayTimeline from "@/components/bitac/DayTimeline.vue";

// setup
const data = ref([]);
const relationships = ref([]);
const categories = ref([]);
const subcategories = ref([]);
const days = ref([]);

// state
const selectedRelationships = ref([]);
const selectedCategories = ref([]);
const selectedSubcategories = ref([]);
const selectedOverlays = ref([]);

const activeFilter = computed(() => {
  return {
    relationships: selectedRelationships.value,
    categories: selectedCategories.value,
    subcategories: selectedSubcategories.value,
  };
});

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
</script>

<template>
  <div>
    <div class="filters">
      <div>
        <h3 class="filter-title">Relaciones</h3>
        <CheckboxDropdown
          :options="relationships"
          v-model="selectedRelationships"
        />
      </div>

      <div>
        <h3 class="filter-title">Categorias</h3>
        <CheckboxDropdown :options="categories" v-model="selectedCategories" />
      </div>

      <div>
        <h3 class="filter-title">Sub Categorias</h3>
        <CheckboxDropdown
          :options="subcategories"
          v-model="selectedSubcategories"
        />
      </div>
      <div>
        <h3 class="filter-title">Overlays</h3>
        <CheckboxDropdown
          :options="[
            { name: 'onlyDoom', id: 'ov1' },
            { name: 'onlyLocations', id: 'ov2' },
          ]"
          v-model="selectedOverlays"
        />
      </div>
    </div>

    <!-- Debug: Show selected relationships -->
    <div class="state-info">
      <p>
        Relaciones seleccionadas:<br />
        {{ selectedRelationships.map((r) => r.name || r).join(", ") }}
      </p>
      <p>
        Categorias seleccionadas:<br />
        {{ selectedCategories.map((c) => c.name || c).join(", ") }}
      </p>
      <p>
        Subcategorias seleccionadas:<br />
        {{ selectedSubcategories.map((sc) => sc.name || sc).join(", ") }}
      </p>
      <p>
        Overlays seleccionados:<br />
        {{ selectedOverlays.map((o) => o.name || o).join(", ") }}
      </p>
    </div>

    <div class="timelines-container">
      <DayTimeline
        v-for="day in Array.from(days).reverse()"
        :key="day"
        :activities="data.filter((e) => e.date === day)"
        :activeFilter="activeFilter"
        :date="day"
      />
    </div>
  </div>
  <pre>{{ data.filter((e) => e.matchesFilter(activeFilter)).reverse() }}</pre>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}

.filters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
}

.filter-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.state-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
