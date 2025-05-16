<script setup>
// vue
import { ref, onMounted } from "vue";
import { bitac } from "./../lib/cv";

// data
import { DataProcessor } from "@/bitac/DataProcessor";

// headlessUi
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

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
  <pre>{{ selectedRelationships }}</pre>
  <Listbox v-model="selectedRelationships" multiple>
    <ListboxButton>
      {{ selectedRelationships.join(", ") }}
    </ListboxButton>
    <ListboxOptions>
      <ListboxOption
        v-for="person in relationships"
        :key="person.id"
        :value="person.name"
      >
        {{ person.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
  <pre>{{ relationships }}</pre>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
