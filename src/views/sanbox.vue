<script setup>
import { ref, computed, onBeforeMount, watch, onMounted } from "vue";
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
    selectedRecipes.value = [...selectedRecipes.value, recipeName];
  }
};

// Rest of the computed properties and functions remain the same...
// [Previous computed properties and functions here]

// Modified onBeforeMount to use the new loadRouteData function
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

// Rest of the watchers remain the same...
// [Previous watchers here]
</script>
