<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchData } from "./../lib/cv";

const data = ref([]);
const uniqueCategoriesList = ref([]);
const categoriesByDay = ref([]);
const selectedDay = ref("");
const selectedCategory = ref(null);
const days = ref([]);

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
  Familia: "#ED8936",
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
  "Yaya Casa": "#FF7043", // Coral
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
    let { iso_date, Categoria, Minutos } = item;
    Categoria = Categoria.trim();
    const doomMinutes = Number(item["DOOM"]) || 0;
    const leerMinutes = Number(item["LEER"]) || 0;
    const totalMinutes = Number(Minutos) || 0;
    const mainCategoryMinutes = (totalMinutes - doomMinutes - leerMinutes) / 60;

    if (!categoriesByDay[iso_date]) {
      categoriesByDay[iso_date] = {};
    }

    // Add main category
    categoriesByDay[iso_date][Categoria] =
      (categoriesByDay[iso_date][Categoria] || 0) + mainCategoryMinutes;

    // Helper to add special categories
    const addSpecialCategory = (categoryName, minutes) => {
      if (minutes > 0) {
        categoriesByDay[iso_date][categoryName] =
          (categoriesByDay[iso_date][categoryName] || 0) + minutes / 60;
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
  data.value.filter((item) => item.iso_date === selectedDay.value)
);

const activitiesForInputDay = (day) => {
  return data.value.filter((item) => item.iso_date === day);
};

const getBarSegments = (items) => {
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
  [data.value] = await Promise.all(fetchData("bitac"));

  days.value = [...new Set(data.value.map((item) => item.iso_date))];
  data.value = data.value.filter((e) => e.iso_date !== "");

  data.value = data.value.flatMap((e) => {
    if (parseTime(e["Hora Fin"]) < parseTime(e["Hora Inicio"])) {
      console.log(e);
      let nextDay = days.value[days.value.indexOf(e.iso_date) + 1];
      let totalMinutes = e["Minutos"];
      let firstPartMinutes = 1440 - parseTime(e["Hora Inicio"]);
      let secondPartMinutes = parseTime(e["Hora Fin"]);

      let thisItem = {
        ...e,
        "Hora Fin": "24:00",
        DOOM: Math.round((Number(e["DOOM"]) * firstPartMinutes) / totalMinutes),
      };
      let nextItem = {
        ...e,
        "Hora Inicio": "00:00",
        iso_date: nextDay,
        DOOM: Math.round(
          (Number(e["DOOM"]) * secondPartMinutes) / totalMinutes
        ),
      };
      console.log(thisItem, nextItem);
      return [thisItem, nextItem];
    }
    return e;
  });

  uniqueCategoriesList.value = uniqueCategories(data.value);
  categoriesByDay.value = calculateCategoriesByDay(data.value);

  selectedDay.value = days.value[days.value.length - 2]; // por defecto el último
});

const handleSegmentClick = (category) => {
  selectedCategory.value =
    category === selectedCategory.value ? null : category;
};

const dayString = (day) => {
  const fullString = day;
  const date = new Date(fullString);
  const dayString = date.toLocaleString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
  return dayString;
};
</script>

<template>
  <div>
    <label for="day">Selecciona un día:</label>

    <select id="day" v-model="selectedDay">
      <option v-for="day in days" :key="day" :value="day">
        {{
          new Date(day).toLocaleString("es-ES", {
            weekday: "long",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          })
        }}
      </option>
    </select>

    <div class="timeline-container">
      <div class="timeline">
        <div
          v-for="(segment, index) in getBarSegments(activitiesForSelectedDay)"
          :key="index"
          class="segment"
          @click="handleSegmentClick(segment.category)"
          :style="{
            left: (segment.start / (24 * 60)) * 100 + '%',
            width: (segment.duration / (24 * 60)) * 100 + '%',
            backgroundColor:
              !selectedCategory || segment.category === selectedCategory
                ? segment.color
                : '#ccc',
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
              width: (segment.doom / segment.duration) * 100 + '%',
            }"
          ></div>

          <!-- Subsegmento: LEER -->
          <div
            v-if="segment.leer > 0"
            class="sub-segment leer"
            :style="{
              width: (segment.leer / segment.duration) * 100 + '%',
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
    <button @click="selectedCategory = null">reset</button>

    <div class="timeline-container">
      <div
        class="timeline"
        v-for="day in days"
        :key="day"
        :class="dayString(day)"
        :data-day="
          new Date(day).toLocaleString('es-ES', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          })
        "
      >
        <div
          v-for="(segment, index) in getBarSegments(activitiesForInputDay(day))"
          :key="index"
          class="segment"
          @click="handleSegmentClick(segment.category)"
          :style="{
            left: (segment.start / (24 * 60)) * 100 + '%',
            width: (segment.duration / (24 * 60)) * 100 + '%',
            borderRight: selectedCategory ? '1px solid #f5f5f5' : 'none',
            backgroundColor:
              !selectedCategory || segment.category === selectedCategory
                ? segment.color
                : '#ccc',
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
              width: (segment.doom / segment.duration) * 100 + '%',
            }"
          ></div>

          <!-- Subsegmento: LEER -->
          <div
            v-if="segment.leer > 0"
            class="sub-segment leer"
            :style="{
              width: (segment.leer / segment.duration) * 100 + '%',
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

.timeline::after {
  content: "" attr(data-day) "";
  font-size: 0.8em;
  left: 5px;
  color: black;
  z-index: 999;
  position: absolute;
}

.Saturday {
  margin-top: 10px;
}

.Monday {
  margin-top: 30px;
}

.segment {
  position: absolute;
  height: 100%;
  box-sizing: border-box;
  border: 0px solid #f5f5f5;
}

.segment:last-child {
  border-right: none;
}

.sub-segment {
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.sub-segment.doom {
  background-color: rgba(139, 0, 0);
}

.sub-segment.leer {
  background-color: rgba(46, 139, 87);
}

.time-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}
</style>
