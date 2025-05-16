<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

// Props
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// State
const selectedOptions = ref([...props.modelValue]);
const isOpen = ref(false);
const dropdownRef = ref(null);

const updateFromParent = ref(false);

watch(
  selectedOptions,
  (newValue) => {
    if (!updateFromParent.value) {
      emit("update:modelValue", newValue);
    }
  },
  { deep: true }
);
// Methods
const toggleRelationship = (relationship) => {
  const index = selectedOptions.value.indexOf(relationship);
  if (index > -1) {
    selectedOptions.value.splice(index, 1);
  } else {
    selectedOptions.value.push(relationship);
  }
};

const toggleAll = () => {
  if (selectedOptions.value.length === props.options.length) {
    selectedOptions.value = [];
  } else {
    selectedOptions.value = [...props.options];
  }
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const getDisplayText = () => {
  if (selectedOptions.value.length === 0) {
    return "Select options...";
  } else if (selectedOptions.value.length === 1) {
    return selectedOptions.value[0].name || selectedOptions.value[0];
  } else {
    return `${selectedOptions.value.length} options selected`;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="relationship-dropdown" ref="dropdownRef">
    <!-- Dropdown trigger -->
    <div class="dropdown-trigger" @click="toggleDropdown">
      <span class="dropdown-text">{{ getDisplayText() }}</span>
      <span class="dropdown-arrow" :class="{ rotated: isOpen }">▼</span>
    </div>

    <!-- Selected options display -->
    <div v-if="selectedOptions.length > 0" class="selected-items">
      <div
        v-for="relationship in selectedOptions"
        :key="relationship.name || relationship"
        class="selected-item"
      >
        <span>{{ relationship.name || relationship }}</span>
        <button
          @click="toggleRelationship(relationship)"
          class="remove-button"
          type="button"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Dropdown options -->
    <div class="dropdown-menu" :class="{ open: isOpen }">
      <!-- Select All option -->
      <div class="dropdown-item select-all">
        <label class="checkbox-label">
          <input
            type="checkbox"
            :checked="
              selectedOptions.length === options.length && options.length > 0
            "
            :indeterminate="
              selectedOptions.length > 0 &&
              selectedOptions.length < options.length
            "
            @change="toggleAll"
            class="checkbox-input"
            @click.stop
          />
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">Select All</span>
        </label>
      </div>

      <!-- Individual relationship options -->
      <div
        v-for="relationship in options"
        :key="relationship.name || relationship"
        class="dropdown-item"
      >
        <label class="checkbox-label">
          <input
            type="checkbox"
            :value="relationship"
            v-model="selectedOptions"
            class="checkbox-input"
            @click.stop
          />
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">{{
            relationship.name || relationship
          }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.relationship-dropdown {
  position: relative;
  width: 100%;
  max-width: 400px;
}

/* Dropdown Trigger */
.dropdown-trigger {
  padding: 0rem 1rem;
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  min-height: 44px;
}

.dropdown-trigger:hover,
.dropdown-trigger:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.dropdown-text {
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #374151;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
  color: #6b7280;
  font-size: 0.75rem;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* Selected Items */
.selected-items {
  margin-top: 0.5rem;
  display: none;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: absolute;
}

.selected-item {
  display: flex;
  align-items: center;
  background: #eff6ff;
  border: 1px solid #2563eb;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: #2563eb;
}

.remove-button {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  margin-left: 0.5rem;
  padding: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: background-color 0.2s ease;
}

.remove-button:hover {
  background-color: rgba(37, 99, 235, 0.1);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #d1d5db;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: 0.75rem 1rem;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.select-all {
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

/* Checkbox styles */
.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  width: 100%;
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
  flex-shrink: 0;
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
  flex: 1;
}

/* Scrollbar styling */
.dropdown-menu::-webkit-scrollbar {
  width: 8px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
