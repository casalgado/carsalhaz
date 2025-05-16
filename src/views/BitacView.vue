<script setup>
// vue
import { ref, onMounted } from "vue";
import { bitac } from "./../lib/cv";

// data
import { DataProcessor } from "@/bitac/DataProcessor";

// setup
const data = ref([]);
const relationships = ref([]);
const categories = ref([]);
const days = ref([]);

// state

const selectedRelationships = ref([]);

// methods
const toggleRelationship = (relationship) => {
  const index = selectedRelationships.value.indexOf(relationship);
  if (index > -1) {
    selectedRelationships.value.splice(index, 1);
  } else {
    selectedRelationships.value.push(relationship);
  }
};

const toggleAll = () => {
  if (selectedRelationships.value.length === relationships.value.length) {
    selectedRelationships.value = [];
  } else {
    selectedRelationships.value = [...relationships.value];
  }
};

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
  <div class="relationship-filter">
    <h3 class="filter-title">Relationships</h3>

    <!-- Select All checkbox -->
    <div class="checkbox-item select-all">
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="
            selectedRelationships.length === relationships.length &&
            relationships.length > 0
          "
          :indeterminate="
            selectedRelationships.length > 0 &&
            selectedRelationships.length < relationships.length
          "
          @change="toggleAll"
          class="checkbox-input"
        />
        <span class="checkbox-custom"></span>
        <span class="checkbox-text">Select All</span>
      </label>
    </div>

    <!-- Individual relationship checkboxes -->
    <div class="checkbox-list">
      <div
        v-for="relationship in relationships"
        :key="relationship"
        class="checkbox-item"
      >
        <label class="checkbox-label">
          <input
            type="checkbox"
            :value="relationship"
            v-model="selectedRelationships"
            class="checkbox-input"
          />
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">{{ relationship.name }}</span>
        </label>
      </div>
    </div>

    <!-- Selected count -->
    <div class="selected-count" v-if="selectedRelationships.length > 0">
      Selected: {{ selectedRelationships.length }} of {{ relationships.length }}
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}

.relationship-filter {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.checkbox-list {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.checkbox-item {
  margin-bottom: 0.75rem;
}

.checkbox-item.select-all {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
}

.checkbox-label:hover {
  color: #2563eb;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  position: relative;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  margin-right: 0.75rem;
  transition: all 0.2s ease;
}

.checkbox-custom::after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.checkbox-input:checked + .checkbox-custom {
  background: #2563eb;
  border-color: #2563eb;
}

.checkbox-input:checked + .checkbox-custom::after {
  display: block;
}

.checkbox-input:indeterminate + .checkbox-custom {
  background: #2563eb;
  border-color: #2563eb;
}

.checkbox-input:indeterminate + .checkbox-custom::after {
  display: block;
  content: "";
  left: 4px;
  top: 8px;
  width: 10px;
  height: 2px;
  border: none;
  background: white;
  transform: none;
}

.checkbox-text {
  font-size: 0.95rem;
  color: #374151;
}

.selected-count {
  margin-top: 1rem;
  padding: 0.5rem 0.75rem;
  background: #eff6ff;
  border: 1px solid #2563eb;
  border-radius: 6px;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Scrollbar styling */
.checkbox-list::-webkit-scrollbar {
  width: 8px;
}

.checkbox-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.checkbox-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.checkbox-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
