<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { recipe_book, recipe_categories, recipe_images } from "./../lib/cv"; // Adjusted the import order

const loading = ref(true);

// Reactive variables
const recipes = ref([]);
const database = ref([]);
const categories = ref([]);
const recipeCategories = ref({});
const selectedRecipes = ref([]);

// Reactive variable for selected category
const selectedCategory = ref("All");

// Function to toggle recipe selection
const toggleRecipeSelection = (recipeName) => {
  if (selectedRecipes.value.includes(recipeName)) {
    selectedRecipes.value = selectedRecipes.value.filter(
      (name) => name !== recipeName
    );
  } else {
    selectedRecipes.value.push(recipeName);
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

onBeforeMount(() => {
  // Adjusted the order of promises
  Promise.all([recipe_book, recipe_categories, recipe_images])
    .then(([bookData, categoriesDataArray, imagesDataArray]) => {
      loading.value = false;
      database.value = bookData;

      // Extract the single objects from arrays
      const categoriesData = categoriesDataArray[0];
      const imagesData = imagesDataArray[0];

      console.log("cat", categoriesData);
      console.log("ima", imagesData);

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
          image: imagesData[name] || `https://via.placeholder.com/150`,
        }));
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      loading.value = false;
    });
});
</script>

<template>
  <div class="recipe-selector">
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
        <h2>Ingredients to Buy:</h2>
        <ul>
          <li v-for="ingredient in combinedIngredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

/* Category Filters */
.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.category-filters button {
  padding: 8px 12px;
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.category-filters button.active {
  background-color: #42b983;
  color: #fff;
}

/* Main Content Layout */
.main-content {
  display: flex;
  width: 100%;
  max-width: 1200px;
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
}

.image-item p {
  margin: 8px 0 0;
}

/* Ingredients List */
.ingredients-list {
  flex-basis: 25%;
  flex-shrink: 1;
  margin-left: 24px;
}

.ingredients-list h2 {
  margin-bottom: 8px;
}

.ingredients-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.ingredients-list li {
  padding: 4px 8px;
  background: #f9f9f9;
  border-radius: 4px;
}

/* Remove space between list items */
.ingredients-list li + li {
  margin-top: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    align-items: center;
  }

  .ingredients-list {
    margin-left: 0;
    margin-top: 24px;
    width: 100%;
    max-width: 600px;
  }

  .image-grid,
  .ingredients-list {
    flex-basis: 100%;
  }
}
</style>
