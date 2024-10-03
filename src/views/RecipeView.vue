<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import {
  recipe_book,
  recipe_additional_data,
} from "./../lib/cv";

const loading = ref(true);

// Reactive variables
const recipes = ref([]);
const database = ref([]);
const categories = ref([]);
const recipeCategories = ref({});
const selectedRecipes = ref([]);

// Reactive variable for selected category
const selectedCategory = ref("All");

// Reactive variable for checked ingredients
const checkedIngredients = ref(new Set());

// Reactive variable for theme (light or dark)
const isDarkTheme = ref(
  localStorage.getItem("theme") === "dark" ? true : false
);

// Function to toggle recipe selection
const toggleRecipeSelection = (recipeName) => {
  if (selectedRecipes.value.includes(recipeName)) {
    selectedRecipes.value = selectedRecipes.value.filter(
      (name) => name !== recipeName
    );
  } else {
    // Create a new array to trigger reactivity
    selectedRecipes.value = [...selectedRecipes.value, recipeName];
  }
};

// Computed property to combine ingredients from selected recipes
const combinedIngredients = computed(() => {
  const ingredientsSet = new Set();

  if (selectedRecipes.value.length === 0) {
    // No recipes selected
    return [];
  }

  database.value.forEach((item) => {
    selectedRecipes.value.forEach((recipe) => {
      if (item[recipe]) {
        ingredientsSet.add(item.ingrediente);
      }
    });
  });

  return Array.from(ingredientsSet).sort();
});

// Computed property to filter recipes based on selected category
const filteredRecipes = computed(() => {
  if (selectedCategory.value === "All") {
    return recipes.value;
  }
  return recipes.value.filter(
    (recipe) => recipe.category === selectedCategory.value
  );
});

// Function to set selected category
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// Function to clear all checked ingredients
const clearCheckedIngredients = () => {
  checkedIngredients.value.clear();
  localStorage.removeItem("checkedIngredients");
};

// Function to clear all selected recipes ingredients
const clearSelectedRecipes = () => {
  if (window.confirm("¿Eliminar Seleccion?")) {
    selectedRecipes.value = [];
    localStorage.removeItem("selectedRecipes");
  }
};

// Function to toggle theme
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");
};

// Load checked ingredients, selected recipes, and theme from local storage
onBeforeMount(() => {
  // Load checked ingredients
  const storedCheckedIngredients = localStorage.getItem("checkedIngredients");
  if (storedCheckedIngredients) {
    checkedIngredients.value = new Set(JSON.parse(storedCheckedIngredients));
  }

  // Load selected recipes
  const storedSelectedRecipes = localStorage.getItem("selectedRecipes");
  if (storedSelectedRecipes) {
    selectedRecipes.value = JSON.parse(storedSelectedRecipes);
  }

  // Load theme preference
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    isDarkTheme.value = storedTheme === "dark";
  }

  Promise.all([recipe_book, recipe_additional_data])
    .then(([bookData, moreData]) => {
      console.log("onBeforeMount - bookData", bookData);
      loading.value = false;
      database.value = bookData;

      console.log("mr", moreData);

      // Extract the single objects from arrays
      const categoriesData = moreData.reduce(
        (acc, item) => ({ ...acc, [item.receta]: item.categoria }),
        {}
      );
      const imagesData = moreData.reduce(
        (acc, item) => ({ ...acc, [item.receta]: item.imagen }),
        {}
      );

      console.log("categoriesData", categoriesData);
      console.log(
        "newCategoriesData",
        moreData.reduce(
          (acc, item) => ({ ...acc, [item.receta]: item.categoria }),
          {}
        )
      );
      console.log("imagesData", imagesData);
      console.log(
        "newImagesData",
        moreData.reduce(
          (acc, item) => ({ ...acc, [item.receta]: item.imagen }),
          {}
        )
      );
      console.log("moreData", moreData);

      // Build the recipeCategories mapping directly from categoriesData
      recipeCategories.value = categoriesData;

      // Get unique category names
      const categoryNamesSet = new Set(Object.values(categoriesData));
      categories.value = ["All", ...Array.from(categoryNamesSet)];

      // Prepare the recipes array with images and categories
      recipes.value = Object.keys(bookData[0])
        .filter((key) => key !== "ingrediente" && key !== "ud")
        .map((name) => ({
          name,
          category: recipeCategories.value[name] || "Other",
          image:
            imagesData[name] ||
            `https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg?semt=ais_hybrid`,
        }));
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      loading.value = false;
    });
});

// Watch for changes in checkedIngredients to update local storage
watch(
  () => Array.from(checkedIngredients.value),
  (newVal) => {
    localStorage.setItem("checkedIngredients", JSON.stringify(newVal));
  },
  { deep: true }
);

// Watch for changes in selectedRecipes to update local storage
watch(
  selectedRecipes,
  (newVal) => {
    localStorage.setItem("selectedRecipes", JSON.stringify(newVal));
  },
  { deep: true }
);

// Watch for changes in theme
watch(isDarkTheme, (newVal) => {
  localStorage.setItem("theme", newVal ? "dark" : "light");
});

// Function to toggle ingredient checked state
const toggleIngredient = (ingredient) => {
  if (checkedIngredients.value.has(ingredient)) {
    checkedIngredients.value.delete(ingredient);
  } else {
    checkedIngredients.value.add(ingredient);
  }
};
</script>

<template>
  <div :class="['recipe-selector', { dark: isDarkTheme }]">
    <!-- Theme Toggle Switch -->
    <div class="theme-toggle" @click="toggleTheme">
      <div class="toggle-thumb" :class="{ dark: isDarkTheme }"></div>
    </div>

    <!-- Category Filters -->
    <div class="category-filters">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
      <button
        class="clear-recipe-button"
        v-if="categories.length > 0"
        @click="clearSelectedRecipes()"
      >
        clear
      </button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Image Grid -->
      <div class="image-grid">
        <div
          v-for="recipe in filteredRecipes"
          :key="recipe.name"
          class="image-item"
          :class="{ selected: selectedRecipes.includes(recipe.name) }"
          @click="toggleRecipeSelection(recipe.name)"
        >
          <img :src="recipe.image" :alt="recipe.name" />
          <p>{{ recipe.name }}</p>
        </div>
      </div>

      <!-- Ingredients List -->
      <div class="ingredients-list">
        <div class="list-header">
          <h2>Lista de Compras:</h2>
          <button
            v-if="checkedIngredients.size > 0"
            @click="clearCheckedIngredients"
            class="clear-button"
          >
            Clear
          </button>
        </div>
        <ul v-if="combinedIngredients.length">
          <li
            v-for="ingredient in combinedIngredients"
            :key="ingredient"
            :class="{ checked: checkedIngredients.has(ingredient) }"
            @click="toggleIngredient(ingredient)"
          >
            <span>{{ ingredient }}</span>
            <input
              type="checkbox"
              class="checkbox"
              :checked="checkedIngredients.has(ingredient)"
              @change.stop="toggleIngredient(ingredient)"
            />
          </li>
        </ul>

        <p v-else>Selecciona recetas para ver los ingredientes.</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  padding: 0px !important;
  margin: 0px !important;
}

/* Responsive Design */
@media (max-width: 768px) {
}
</style>

<style scoped>
/* Root Styles */
.recipe-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f0f0f0; /* Light gray background */
  color: #333; /* Dark text */
  min-height: 100vh;
}

.recipe-selector.dark {
  background-color: #1a1a1a; /* Very dark gray background */
  color: #e0e0e0; /* Light text */
}

/* Theme Toggle Switch */
.theme-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 50px;
  height: 28px;
  background-color: #ccc;
  border-radius: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.recipe-selector.dark .theme-toggle {
  background-color: #555;
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  margin: 2px;
  transition: transform 0.3s;
}

.theme-toggle .toggle-thumb.dark {
  transform: translateX(22px);
  background-color: #333;
}

/* Category Filters */
.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;
}

.category-filters button {
  padding: 6px 10px;
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.recipe-selector.dark .category-filters button {
  background-color: #333;
  color: #e0e0e0;
}

.category-filters button.active {
  background-color: #42b983;
  color: #fff;
}

.recipe-selector.dark .category-filters button.active {
  background-color: #2d8c6c;
}

/* Main Content Layout */
.main-content {
  display: flex;
  width: 100%;
  max-width: 1200px;
  align-items: flex-start;
}

/* Image Grid */
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  flex-basis: 75%;
  flex-shrink: 0;
  justify-content: flex-start;
}

.image-item {
  width: 120px;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
}

.image-item.selected {
  border-color: #42b983;
  opacity: 0.7;
}

.image-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.image-item p {
  margin: 8px 0 0;
}

.recipe-selector.dark .image-item {
  color: #e0e0e0;
}

/* Ingredients List */
.ingredients-list {
  flex-basis: 25%;
  flex-shrink: 1;
  margin-left: 24px;
  max-height: 80vh;
  overflow-y: auto;
}

.ingredients-list ul {
  padding: 0px;
}

.ingredients-list .list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ingredients-list h2 {
  margin-bottom: 8px;
}

.clear-button {
  background-color: transparent;
  border: none;
  color: #42b983;
  cursor: pointer;
  font-size: 14px;
}

.clear-button:hover {
  text-decoration: underline;
}

.recipe-selector.dark .clear-button {
  color: #2d8c6c;
}

/* Ingredients List Items */

/* Default styles for list items (Unchecked Items) */
.ingredients-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background: #333; /* Darker background in light mode */
  color: #fff; /* White text for contrast */
  border-radius: 4px;
  cursor: pointer;
}

/* Checked items are lighter in light mode */
.ingredients-list li.checked {
  background: #f0f0f0; /* Lighter background */
  color: #333; /* Dark text */
}

/* Unchecked items are lighter in dark mode */
.recipe-selector.dark .ingredients-list li {
  background: #ccc; /* Lighter background in dark mode */
  color: #333; /* Dark text */
}

/* Alternatively, if you need to set specific colors */
.ingredients-list .list-header h2 {
  color: #333; /* Dark text in light mode */
}

.recipe-selector.dark .ingredients-list .list-header h2 {
  color: #e0e0e0; /* Light text in dark mode */
}

/* Checked items are darker in dark mode */
.recipe-selector.dark .ingredients-list li.checked {
  background: #1a1a1a; /* Darker background */
  color: #e0e0e0; /* Light text */
}

.ingredients-list li + li {
  margin-top: 3px;
}

.ingredients-list .checkbox {
  margin-left: 8px;
  cursor: pointer;
}

/* Adjust checkbox styles if needed */
.recipe-selector.dark .ingredients-list .checkbox {
  /* Optional: adjust checkbox styles for dark mode */
}

.ingredients-list p {
  margin-top: 8px;
}

.recipe-selector.dark .ingredients-list p {
  color: #e0e0e0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    align-items: center;
  }

  .recipe-selector {
    padding-top: 50px !important;
  }

  .image-grid {
    justify-content: center; /* Center images on mobile */
  }

  .image-item {
    width: 80px;
  }

  .ingredients-list {
    margin-left: 0;
    margin-top: 24px;
    width: 100%;
    max-width: 600px;
    max-height: none;
    overflow-y: visible;
  }

  .image-grid,
  .ingredients-list {
    flex-basis: 100%;
  }
}

.clear-recipe-button {
  color: white !important;
  background-color: #e34d4d !important;
}
</style>
