<template>
  <div :class="['list-component', { dark: isDarkTheme }]">
    <!-- Theme Toggle Switch -->
    <div
      class="theme-toggle"
      @click="toggleTheme"
      :aria-label="
        isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'
      "
      role="button"
      tabindex="0"
      @keyup.enter="toggleTheme"
      @keyup.space="toggleTheme"
    >
      <div class="toggle-thumb" :class="{ dark: isDarkTheme }"></div>
    </div>

    <!-- Ingredients List -->
    <div class="ingredients-list">
      <div class="list-header">
        <h2>Lista de Ingredientes</h2>
        <div class="actions">
          <button @click="exportList">Export</button>
          <button @click="resetList">Reset</button>
        </div>
        <button
          v-if="hasCheckedIngredients"
          @click="clearCheckedIngredients"
          class="clear-button"
        >
          Clear
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="loading">Cargando...</div>

      <!-- Error Message -->
      <div v-if="error" class="error">Hubo un error al cargar los datos.</div>

      <!-- Ingredients Grouped by Category -->
      <template v-else-if="!error">
        <template v-if="ingredients.length">
          <div
            v-for="(ingredients, category) in ingredientsByCategory"
            :key="category"
            class="category-group"
          >
            <h3 class="category-title">
              {{ capitalizeFirstLetter(category) }}
            </h3>
            <ul>
              <li
                v-for="ingredient in ingredients"
                :key="ingredient.name"
                :class="{
                  urgent: ingredient.urgent && !ingredient.needed,
                  needed: ingredient.needed && !ingredient.urgent,
                  'urgent-needed': ingredient.urgent && ingredient.needed,
                  dark: isDarkTheme,
                }"
              >
                <span class="ingredient-name">{{ ingredient.name }}</span>
                <div class="buttons">
                  <button
                    :class="{ active: ingredient.urgent }"
                    @click.stop="toggleUrgent(ingredient)"
                  >
                    Urgente
                  </button>
                  <button
                    :class="{ active: ingredient.needed }"
                    @click.stop="toggleNeeded(ingredient)"
                  >
                    Normal
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <p v-else>Selecciona recetas para ver los ingredientes.</p>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch, computed } from "vue";
import { list_book } from "./../lib/cv"; // Ajusta la ruta según sea necesario
import jsPDF from "jspdf";

// Reactive variable for theme (light or dark)
const isDarkTheme = ref(localStorage.getItem("theme") === "dark");

// Reactive variables
const loading = ref(true);
const fullList = ref([]);
const ingredients = ref([]);
const error = ref(null);

// Computed property to check if any ingredients are checked
const hasCheckedIngredients = computed(() => {
  return ingredients.value.some(
    (ingredient) => ingredient.urgent || ingredient.needed
  );
});

// Computed property to group ingredients by category
const ingredientsByCategory = computed(() => {
  const grouped = {};
  ingredients.value.forEach((ingredient) => {
    const { categoria } = ingredient;
    if (!grouped[categoria]) {
      grouped[categoria] = [];
    }
    grouped[categoria].push(ingredient);
  });
  return grouped;
});

// Función auxiliar para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to toggle theme
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");

  if (isDarkTheme.value) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
};

// Function to toggle urgent state with mutual exclusivity
const toggleUrgent = (ingredient) => {
  ingredient.urgent = !ingredient.urgent;
  if (ingredient.urgent) {
    ingredient.needed = false;
  }
};

// Function to toggle needed state with mutual exclusivity
const toggleNeeded = (ingredient) => {
  ingredient.needed = !ingredient.needed;
  if (ingredient.needed) {
    ingredient.urgent = false;
  }
};

// Function to clear all checked ingredients
const clearCheckedIngredients = () => {
  ingredients.value.forEach((ingredient) => {
    ingredient.urgent = false;
    ingredient.needed = false;
  });
  localStorage.removeItem("ingredientsState");
};

// Function to reset the list
const resetList = () => {
  ingredients.value.forEach((ingredient) => {
    ingredient.urgent = false;
    ingredient.needed = false;
  });
  localStorage.removeItem("ingredientsState");
};

// Function to export the list to PDF
const exportList = () => {
  // Organizar ingredientes por 'lugar' y luego por 'categoria'
  const groupedData = {};

  ingredients.value.forEach((ingredient) => {
    const { lugar, categoria, name, urgent, needed } = ingredient;

    // Solo incluir ingredientes seleccionados (Urgente o Normal)
    if (urgent || needed) {
      lugar.forEach((loc) => {
        if (!groupedData[loc]) {
          groupedData[loc] = {};
        }

        if (!groupedData[loc][categoria]) {
          groupedData[loc][categoria] = [];
        }

        const status = urgent ? "Urgente" : "Normal";
        groupedData[loc][categoria].push(`${status}: ${name}`);
      });
    }
  });

  // Inicializar jsPDF
  const doc = new jsPDF();

  // Añadir título
  doc.setFontSize(18);
  doc.text("Lista de Compras", 14, 22);

  let y = 30; // Coordenada Y inicial

  // Iterar sobre cada 'lugar'
  for (const [loc, categorias] of Object.entries(groupedData)) {
    // Omitir lugares sin categorías
    if (Object.keys(categorias).length === 0) continue;

    // Añadir nombre del 'lugar'
    doc.setFontSize(14);
    doc.text(loc, 14, y);
    y += 10;

    // Iterar sobre cada 'categoria' dentro del 'lugar'
    for (const [categoria, items] of Object.entries(categorias)) {
      // Añadir nombre de la 'categoria'
      doc.setFontSize(12);
      doc.text(capitalizeFirstLetter(categoria), 16, y);
      y += 6;

      // Listar los productos bajo la 'categoria'
      items.forEach((item) => {
        doc.text("- " + item, 18, y);
        y += 6;

        // Añadir nueva página si y excede la altura de la página
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      y += 4; // Espacio adicional entre categorías

      // Añadir nueva página si y excede la altura de la página
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }

    y += 10; // Espacio adicional entre lugares

    // Añadir nueva página si y excede la altura de la página
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // Guardar el PDF
  doc.save("lista_de_compras.pdf");
};

// Cargar datos y inicializar ingredientes
onBeforeMount(() => {
  // Cargar preferencia de tema
  if (isDarkTheme.value) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  // Cargar datos desde list_book
  Promise.all([list_book])
    .then(([listData]) => {
      loading.value = false;
      fullList.value = listData;

      const ingredientsMap = new Map();

      fullList.value.forEach((item) => {
        const { producto, lugar, categoria } = item;
        if (producto && producto.trim() !== "") {
          if (!ingredientsMap.has(producto)) {
            ingredientsMap.set(producto, {
              name: producto,
              lugar: new Set(),
              categoria: categoria,
              urgent: false,
              needed: false,
            });
          }
          ingredientsMap.get(producto).lugar.add(lugar);
          // Asumimos que 'categoria' es consistente por producto
        }
      });

      // Convertir el Map a un array y ordenar ingredientes alfabéticamente
      ingredients.value = Array.from(ingredientsMap.values())
        .map((ingredient) => ({
          ...ingredient,
          lugar: Array.from(ingredient.lugar),
          categoria: ingredient.categoria, // Incluir categoría
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      // Cargar estado guardado desde local storage
      const savedState = localStorage.getItem("ingredientsState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Fusionar el estado guardado con los ingredientes
        ingredients.value.forEach((ingredient) => {
          const savedIngredient = parsedState.find(
            (item) => item.name === ingredient.name
          );
          if (savedIngredient) {
            ingredient.urgent = savedIngredient.urgent;
            ingredient.needed = savedIngredient.needed;
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error loading data:", err);
      error.value = true;
      loading.value = false;
    });
});

// Watch para cambios en ingredients y guardar en local storage
watch(
  ingredients,
  (newVal) => {
    localStorage.setItem("ingredientsState", JSON.stringify(newVal));
  },
  { deep: true }
);
</script>

<style>
/* Global Styles */
body {
  padding: 0px !important;
  margin: 0px !important;
}
</style>

<style lang="scss" scoped>
/* Define SASS Variables */
$light-bg: #f0f0f0;
$dark-bg: #1a1a1a;
$light-text: #292929;
$dark-text: #e0e0e0;
$button-bg: #42b983;
$button-hover-bg: #2d8c6c;
$urgent-bg-light: #e34d4d;
$needed-bg-light: #5666b8;
$urgent-bg-dark: #662222;
$needed-bg-dark: #1a73e8; // Cambiado a azul oscuro
$urgent-needed-bg-light: #c6d9ff; // Cambiado a azul claro
$urgent-needed-bg-dark: #1a73e8; // Cambiado a azul oscuro
$category-bg-light: #eee;
$category-bg-dark: #333;
$category-active-bg-light: #42b983;
$category-active-bg-dark: #2d8c6c;
$toggle-bg-light: #ccc;
$toggle-bg-dark: #555;
$toggle-thumb-light: #fff;
$toggle-thumb-dark: #333;

/* Root Styles */
.list-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: $light-bg; /* Light gray background */
  color: $light-text; /* Dark text */
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;

  &.dark {
    background-color: $dark-bg; /* Very dark gray background */
    color: $dark-text; /* Light text */
  }

  /* Theme Toggle Switch */
  .theme-toggle {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 50px;
    height: 28px;
    background-color: $toggle-bg-light;
    border-radius: 14px;
    cursor: pointer;
    transition: background-color 0.3s;

    &.dark {
      background-color: $toggle-bg-dark;
    }

    .toggle-thumb {
      width: 24px;
      height: 24px;
      background-color: $toggle-thumb-light;
      border-radius: 50%;
      margin: 2px;
      transition: transform 0.3s, background-color 0.3s;

      &.dark {
        transform: translateX(22px);
        background-color: $toggle-thumb-dark;
      }
    }
  }

  /* Ingredients List */
  .ingredients-list {
    width: 100%;
    max-width: 600px;

    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      h2 {
        text-align: center;
        color: inherit; // Inherit color from parent
      }

      .actions {
        display: flex;
        gap: 8px;

        button {
          padding: 8px 16px;
          background-color: $button-bg;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: $button-hover-bg;
          }

          &.dark {
            background-color: $button-bg;

            &:hover {
              background-color: $button-hover-bg;
            }
          }
        }
      }

      .clear-button {
        background-color: transparent;
        border: none;
        color: $button-bg;
        cursor: pointer;
        font-size: 14px;
        transition: color 0.3s;

        &:hover {
          color: darken($button-bg, 10%);
          text-decoration: underline;
        }

        &.dark {
          color: darken($button-bg, 20%);
        }
      }
    }

    .loading {
      text-align: center;
      font-size: 18px;
      color: $button-bg;
    }

    .error {
      text-align: center;
      font-size: 18px;
      color: red;
    }

    .category-group {
      margin-bottom: 24px;

      .category-title {
        font-size: 1.2em;
        margin-bottom: 12px;
        color: $button-bg; // Utiliza uno de tus colores SASS para resaltar
      }
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        background-color: #aaa; // Default, overridden below
        color: #fff; // Default, overridden below
        border-radius: 4px;
        margin-bottom: 8px;
        transition: background-color 0.3s, color 0.3s;
        font-weight: normal; // Default

        &.urgent {
          background-color: $urgent-bg-light;
          color: $light-text;
          font-weight: bold; // Agregado
        }

        &.needed {
          background-color: $needed-bg-light;
          color: $light-text;
          font-weight: bold; // Agregado
        }

        &.urgent-needed {
          background-color: $urgent-needed-bg-light;
          color: $light-text;
          font-weight: bold; // Agregado
        }

        &.dark {
          // Unchecked items are lighter in dark mode
          background-color: #ccc;
          color: $light-text;

          &.urgent {
            background-color: $urgent-bg-dark;
            color: $dark-text;
            font-weight: bold; // Agregado
          }

          &.needed {
            background-color: $needed-bg-dark;
            color: $dark-text;
            font-weight: bold; // Agregado
          }

          &.urgent-needed {
            background-color: $urgent-needed-bg-dark;
            color: $dark-text;
            font-weight: bold; // Agregado
          }
        }

        .ingredient-name {
          flex-grow: 1;
        }

        .buttons {
          button {
            margin-left: 8px;
            padding: 4px 8px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: lighten($category-bg-light, 10%);
            color: $light-text;
            transition: background-color 0.3s, color 0.3s;

            &.active {
              background-color: $button-bg;
              color: #fff;
            }

            &:hover {
              background-color: darken($category-bg-light, 10%);
              color: $light-text;
            }

            &.dark {
              background-color: lighten($category-bg-dark, 10%);
              color: $dark-text;

              &.active {
                background-color: $button-bg;
                color: #fff;
              }

              &:hover {
                background-color: darken($category-bg-dark, 10%);
                color: $dark-text;
              }
            }
          }
        }
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .ingredients-list {
        width: 100%;
        max-width: 600px;
        padding-top: 50px;
      }
    }
  }
}
</style>
