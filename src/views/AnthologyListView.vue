<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import {
  recipe_book,
  recipe_additional_data,
  viajes_book,
  viajes_additional_data,
} from "./../lib/cv";

const route = useRoute();
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

// Function to load data based on route
const loadRouteData = async () => {
  loading.value = true;
  try {
    let bookData, moreData;

    if (route.path === "/recetas") {
      [bookData, moreData] = await Promise.all([
        recipe_book,
        recipe_additional_data,
      ]);
    } else if (route.path === "/lvyp") {
      [bookData, moreData] = await Promise.all([
        viajes_book,
        viajes_additional_data,
      ]);
    } else {
      console.error("Unknown route:", route.path);
      return;
    }

    console.log("onBeforeMount - bookData", bookData);
    database.value = bookData;

    // Extract the single objects from arrays
    const categoriesData = moreData.reduce(
      (acc, item) => ({ ...acc, [item.receta]: item.categoria }),
      {}
    );
    const imagesData = moreData.reduce(
      (acc, item) => ({ ...acc, [item.receta]: item.imagen }),
      {}
    );

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
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    loading.value = false;
  }
};

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

  // Load route-specific data
  loadRouteData();
});

// Watch for route changes and reload data accordingly
watch(
  () => route.path,
  () => {
    loadRouteData();
  }
);

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

<style lang="scss" scoped>
// Theme Colors
$light-bg: #f0f0f0;
$dark-bg: #1a1a1a;
$light-text: #e0e0e0;
$dark-text: #333;

// Brand Colors
$primary-color: #42b983;
$primary-color-dark: #2d8c6c;
$danger-color: #e34d4d;

// UI Element Colors
$toggle-bg-light: #ccc;
$toggle-bg-dark: #555;
$toggle-thumb-light: #fff;
$toggle-thumb-dark: #333;

// Spacing
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

// Layout
$max-content-width: 1200px;
$mobile-breakpoint: 768px;

// Components
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 14px;

// Image Dimensions
$image-item-size: 120px;
$image-item-size-mobile: 80px;

// Toggle Switch Dimensions
$toggle-width: 50px;
$toggle-height: 28px;
$toggle-thumb-size: 24px;
$toggle-thumb-offset: 22px;

// Z-indices
$z-loading: 1000;

// Transitions
$transition-speed: 0.3s;

// Global Styles
body {
  padding: 0 !important;
  margin: 0 !important;
}

// Component Styles
.recipe-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-md;
  background-color: $light-bg;
  color: $dark-text;
  min-height: 100vh;

  &.dark {
    background-color: $dark-bg;
    color: $light-text;
  }

  // Theme Toggle
  .theme-toggle {
    position: absolute;
    top: $spacing-md;
    right: $spacing-md;
    width: $toggle-width;
    height: $toggle-height;
    background-color: $toggle-bg-light;
    border-radius: $border-radius-lg;
    cursor: pointer;
    transition: background-color $transition-speed;

    .toggle-thumb {
      width: $toggle-thumb-size;
      height: $toggle-thumb-size;
      background-color: $toggle-thumb-light;
      border-radius: 50%;
      margin: 2px;
      transition: transform $transition-speed;

      &.dark {
        transform: translateX($toggle-thumb-offset);
        background-color: $toggle-thumb-dark;
      }
    }
  }

  &.dark .theme-toggle {
    background-color: $toggle-bg-dark;
  }

  // Category Filters
  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
    justify-content: center;

    button {
      padding: 6px 10px;
      background-color: #eee;
      border: none;
      border-radius: $border-radius-sm;
      cursor: pointer;

      &.active {
        background-color: $primary-color;
        color: white;
      }

      &.clear-recipe-button {
        color: white !important;
        background-color: $danger-color !important;
      }
    }
  }

  &.dark .category-filters {
    button {
      background-color: $dark-text;
      color: $light-text;

      &.active {
        background-color: $primary-color-dark;
      }
    }
  }

  // Main Content
  .main-content {
    display: flex;
    width: 100%;
    max-width: $max-content-width;
    align-items: flex-start;

    // Image Grid
    .image-grid {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-md;
      flex-basis: 75%;
      flex-shrink: 0;
      justify-content: flex-start;
      align-self: flex-start;
      position: sticky;
      top: $spacing-md;

      .image-item {
        width: $image-item-size;
        text-align: center;
        cursor: pointer;
        border: 2px solid transparent;
        border-radius: $border-radius-md;
        overflow: hidden;

        &.selected {
          border-color: $primary-color;
          opacity: 0.7;
        }

        img {
          width: 100%;
          height: $image-item-size;
          object-fit: cover;
          border-radius: $border-radius-md;
        }

        p {
          margin: $spacing-sm 0 0;
        }
      }
    }

    // Ingredients List
    .ingredients-list {
      flex-basis: 25%;
      flex-shrink: 1;
      margin-left: $spacing-lg;

      .list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h2 {
          margin-bottom: $spacing-sm;
          color: $dark-text;
        }
      }

      ul {
        padding: 0;
      }

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $spacing-xs $spacing-sm;
        background: $dark-text;
        color: white;
        border-radius: $border-radius-sm;
        cursor: pointer;

        & + li {
          margin-top: 3px;
        }

        &.checked {
          background: $light-bg;
          color: $dark-text;
        }

        .checkbox {
          margin-left: $spacing-sm;
          cursor: pointer;
        }
      }

      .clear-button {
        background-color: transparent;
        border: none;
        color: $primary-color;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          text-decoration: underline;
        }
      }

      p {
        margin-top: $spacing-sm;
      }
    }
  }

  // Dark Mode Specifics
  &.dark {
    .ingredients-list {
      .list-header h2 {
        color: $light-text;
      }

      li {
        background: $toggle-bg-light;
        color: $dark-text;

        &.checked {
          background: $dark-bg;
          color: $light-text;
        }
      }

      .clear-button {
        color: $primary-color-dark;
      }

      p {
        color: $light-text;
      }
    }
  }

  // Loading State
  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2em;
    color: $primary-color;
    z-index: $z-loading;
  }
}

// Responsive Design
@media (max-width: $mobile-breakpoint) {
  .recipe-selector {
    padding-top: 50px !important;

    .main-content {
      flex-direction: column;
      align-items: center;

      .image-grid {
        position: static;
        justify-content: center;

        .image-item {
          width: $image-item-size-mobile;
        }
      }

      .ingredients-list {
        margin-left: 0;
        margin-top: $spacing-lg;
        width: 100%;
        max-width: 600px;
      }

      .image-grid,
      .ingredients-list {
        flex-basis: 100%;
      }
    }
  }
}
</style>
