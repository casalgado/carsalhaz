<script setup>
import { ref, computed, onMounted } from "vue";
import { bitac } from "./../lib/cv";

const data = ref([]);
const uniqueCategoriesList = ref([]);
const categoriesByDay = ref([]);
const selectedDay = ref("");
const days = ref([]);

const onlyDoom = {
  UNorte: "#999", // Gray
  LCI: "#999", // Gray
  Tutorias: "#999", // Gray
  Worktime: "#999", // Gray
  DOOM: "#B91C1C", // Blood Red
  LEER: "#999", // Gray
  Meditacion: "#999", // Gray
  Jrnl: "#999", // Gray

  // Other categories
  Amigos: "#999", // Gray
  "Casa Bella": "#999", // Gray
  "Casa Beto": "#999", // Gray
  Dormir: "#999", // Gray
  Enfermo: "#999", // Gray
  Familia: "#999", // Gray
  Gym: "#999", // Gray
  MDM: "#999", // Gray
  Misc: "#999", // Gray
  Paseo: "#999", // Gray
  Personal: "#999", // Gray
  Playa: "#999", // Gray
  Reunion: "#999", // Gray
  Snooze: "#999", // Gray
  TT: "#999", // Gray
  Vueltas: "#999", // Gray
  "Vueltas Yaya": "#999", // Gray
};

void onlyDoom;

const categoryColors = {
  UNorte: "#EF5350", // Red
  LCI: "#F6E05E", // Yellow
  Tutorias: "#48BB78", // Green
  Worktime: "#63B3ED", // Light Blue
  DOOM: "#B91C1C", // Blood Red
  LEER: "#4A90B4", // Medium Blue
  Meditacion: "#5A8BAF", // Darker Blue
  Jrnl: "#6B95C7", // Light Blue-Gray

  // Other categories
  Amigos: "#ED8936", // Orange
  "Casa Bella": "#805AD5", // Purple
  "Casa Beto": "#3467c6", // Dark Blue
  Dormir: "#999", // Light Gray
  Enfermo: "#FC8181", // Light Red
  Familia: "#E53E3E", // Bright Red
  Gym: "#68D391", // Light Green
  MDM: "#F687B3", // Pink
  Misc: "#A0AEC0", // Gray
  Paseo: "#81C784", // Soft Green
  Personal: "#FFB74D", // Amber
  Playa: "#4FC3F7", // Sky Blue
  Reunion: "#BA68C8", // Light Purple
  Snooze: "#90A4AE", // Blue Gray
  TT: "#444", // Cyan
  Vueltas: "#FF8A65", // Light Orange
  "Vueltas Yaya": "#FFAB91", // Peach
};

// ========= Funciones existentes =========

const uniqueCategories = (arr) => {
  const categories = new Set();
  arr.forEach((item) => {
    if (item.Categoria) {
      categories.add(item.Categoria.trim());
    }
  });
  return Array.from(categories).sort();
};

const calculateCategoriesByDay = (arr) => {
  const categoriesByDay = {};

  arr.forEach((item) => {
    let { Fecha, Categoria, Minutos } = item;
    Categoria = Categoria.trim();
    const doomMinutes = Number(item["DOOM"]) || 0;
    const leerMinutes = Number(item["LEER"]) || 0;
    const totalMinutes = Number(Minutos) || 0;
    const mainCategoryMinutes = (totalMinutes - doomMinutes - leerMinutes) / 60;

    if (!categoriesByDay[Fecha]) {
      categoriesByDay[Fecha] = {};
    }

    // Add main category
    categoriesByDay[Fecha][Categoria] =
      (categoriesByDay[Fecha][Categoria] || 0) + mainCategoryMinutes;

    // Helper to add special categories
    const addSpecialCategory = (categoryName, minutes) => {
      if (minutes > 0) {
        categoriesByDay[Fecha][categoryName] =
          (categoriesByDay[Fecha][categoryName] || 0) + minutes / 60;
      }
    };

    addSpecialCategory("DOOM", doomMinutes);
    addSpecialCategory("LEER", leerMinutes);
  });

  return categoriesByDay;
};

const formatHours = (value) => {
  return value > 0 ? Math.round(value * 10) / 10 : "-";
};

// ========= Funciones nuevas para visualización =========

const parseTime = (str) => {
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
};

const activitiesForSelectedDay = computed(() =>
  data.value.filter((item) => item.Fecha === selectedDay.value)
);

const activitiesForInputDay = (day) => {
  return data.value.filter((item) => item.Fecha === day);
};

const getBarSegments = (items) => {
  console.log("NEW BAR");
  return items.map((item) => {
    const start = parseTime(item["Hora Inicio"]);
    const end = parseTime(item["Hora Fin"]);
    const duration = end - start;

    const doom = Number(item.DOOM) || 0;
    const leer = Number(item.LEER) || 0;

    return {
      start,
      duration,
      category: item.Categoria.trim(),
      description: item.Descripcion,
      color: categoryColors[item.Categoria.trim()] || "#FFF",
      doom: doom,
      leer: leer,
    };
  });
};

// ========= Cargar datos =========

onMounted(async () => {
  console.log("obm");
  [data.value] = await Promise.all([bitac]);
  days.value = [...new Set(data.value.map((item) => item.Fecha))];
  data.value = data.value.filter((e) => e.Fecha !== "");

  data.value = data.value.flatMap((e) => {
    if (parseTime(e["Hora Fin"]) < parseTime(e["Hora Inicio"])) {
      let nextDay = days.value[days.value.indexOf(e.Fecha) + 1];

      let thisItem = {
        ...e,
        "Hora Fin": "24:00",
      };
      let nextItem = {
        ...e,
        "Hora Inicio": "00:00",
        Fecha: nextDay,
      };
      return [thisItem, nextItem];
    }
    return e;
  });
  console.log("data2", ...data.value);
  uniqueCategoriesList.value = uniqueCategories(data.value);
  categoriesByDay.value = calculateCategoriesByDay(data.value);

  selectedDay.value = days.value[days.value.length - 2]; // por defecto el último
});
</script>

<template>
  <div>
    <label for="day">Selecciona un día:</label>

    <select id="day" v-model="selectedDay">
      <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
    </select>

    <div class="timeline-container">
      <div class="timeline">
        <div
          v-for="(segment, index) in getBarSegments(activitiesForSelectedDay)"
          :key="index"
          class="segment"
          :style="{
            left: (segment.start / (24 * 60)) * 100 + '%',
            width: (segment.duration / (24 * 60)) * 100 + '%',
            backgroundColor: segment.color,
          }"
          :title="`${segment.category}${
            segment.description ? `:${segment.description}` : ''
          }`"
        >
          <!-- Subsegmento: DOOM -->
          <div
            v-if="segment.doom > 0"
            class="sub-segment doom"
            :style="{
              left: '50%',
              transform: 'translateX(-50%)',
              width: (segment.doom / (24 * 60)) * 100 + '%',
            }"
          ></div>

          <!-- Subsegmento: LEER -->
          <div
            v-if="segment.leer > 0"
            class="sub-segment leer"
            :style="{
              left: '50%',
              transform: 'translateX(-50%)',
              width: (segment.leer / (24 * 60)) * 100 + '%',
            }"
          ></div>
        </div>
      </div>

      <!-- Ejes -->
      <div class="time-labels">
        <span v-for="h in 25" :key="h">{{ h - 1 }}h</span>
      </div>
    </div>
  </div>

  <div>
    <label for="day">Stacked:</label>

    <div class="timeline-container">
      <div class="timeline" v-for="day in days" :key="day">
        <div
          v-for="(segment, index) in getBarSegments(activitiesForInputDay(day))"
          :key="index"
          class="segment"
          :style="{
            left: (segment.start / (24 * 60)) * 100 + '%',
            width: (segment.duration / (24 * 60)) * 100 + '%',
            backgroundColor: segment.color,
          }"
          :title="`${segment.category}${
            segment.description ? `:${segment.description}` : ''
          }`"
        >
          <!-- Subsegmento: DOOM -->
          <div
            v-if="segment.doom > 0"
            class="sub-segment doom"
            :style="{
              left: '50%',
              transform: 'translateX(-50%)',
              width: (segment.doom / (24 * 60)) * 100 + '%',
            }"
          ></div>

          <!-- Subsegmento: LEER -->
          <div
            v-if="segment.leer > 0"
            class="sub-segment leer"
            :style="{
              left: '50%',
              transform: 'translateX(-50%)',
              width: (segment.leer / (24 * 60)) * 100 + '%',
            }"
          ></div>
        </div>
      </div>

      <!-- Ejes -->
      <div class="time-labels">
        <span v-for="h in 25" :key="h">{{ h - 1 }}h</span>
      </div>
    </div>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Día</th>
          <th v-for="category in uniqueCategoriesList" :key="category">
            {{ category }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(categories, day) in categoriesByDay" :key="day">
          <td>{{ day.split(",")[1]?.trim() }}</td>
          <td v-for="category in uniqueCategoriesList" :key="category">
            {{ formatHours(categories[category] || 0) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre>{{ uniqueCategoriesList }}</pre>
  <pre>{{ data }}</pre>
</template>

<style scoped>
body {
  padding: 0 !important;
  margin: 0 !important;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.timeline-container {
  margin-bottom: 2rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0px !important;
  text-align: center;
  width: 30px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

thead {
  background-color: #f8f8f8;
  font-weight: bold;
}

.timeline-container {
  margin-top: 20px;
  position: relative;
}

.timeline {
  position: relative;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin-bottom: 0px;
}

.segment {
  position: absolute;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #fff;
}

.segment:last-child {
  border-right: none;
}

.sub-segment {
  position: absolute;
  top: 25%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.sub-segment.doom {
  background-color: rgba(139, 0, 0, 0.6);
}

.sub-segment.leer {
  background-color: rgba(46, 139, 87, 0.6);
}

.time-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}
</style>
