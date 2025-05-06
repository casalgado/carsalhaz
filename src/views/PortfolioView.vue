<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import { portfolio_data } from "../lib/cv";

const rawData = ref([]);
const selectedApellido = ref("");

// Orden horario deseado
const horarioOrden = ["2:30", "3:30", "4:30"];

const passwords = [
  { student: "Acosta", password: 4729 },
  { student: "Charris", password: 8156 },
  { student: "Diaz", password: 1638 },
  { student: "Franco", password: 9047 },
  { student: "Gonzáles s", password: 2873 },
  { student: "González e", password: 6391 },
  { student: "González s", password: 5024 },
  { student: "Herazo", password: 7560 },
  { student: "Joya", password: 3952 },
  { student: "Martinez j", password: 1480 },
  { student: "Martínez j", password: 6729 },
  { student: "Martinez n", password: 3194 },
  { student: "Martínez n", password: 8563 },
  { student: "Petro", password: 4287 },
  { student: "Pumarejo", password: 9371 },
  { student: "Velasco", password: 2046 },
  { student: "Vergara", password: 5810 },
  { student: "Buitrago", password: 6935 },
  { student: "Caballero", password: 7421 },
  { student: "De la ossa", password: 3598 },
  { student: "De la rosa", password: 8764 },
  { student: "Espinosa", password: 2135 },
  { student: "Fontalvo", password: 5049 },
  { student: "Gomez", password: 6273 },
  { student: "Hernandez", password: 9408 },
  { student: "Isaza", password: 1357 },
  { student: "Martinez v", password: 4682 },
  { student: "Micolta", password: 7924 },
  { student: "Montaño", password: 3510 },
  { student: "Moratto", password: 6093 },
  { student: "Paulino", password: 8245 },
  { student: "Perez", password: 1739 },
  { student: "Ruiz", password: 4862 },
  { student: "Sanchez", password: 2570 },
  { student: "Toledo", password: 9184 },
  { student: "Villegas", password: 6428 },
  { student: "Amaya", password: 3057 },
  { student: "Arcos", password: 7291 },
  { student: "Gómez", password: 8649 },
  { student: "Gonzales g", password: 1936 },
  { student: "Manzur", password: 5302 },
  { student: "Mendez", password: 3781 },
  { student: "Ochoa", password: 4159 },
];

// Campos
const cuantitativos = [
  "El portafolio refleja la identidad del(la) diseñador(a).",
  "El diseño del portafolio es impactante, innovador.",
  "La navegación del portafolio es clara y el contenido es fácil de encontrar.",
  "El portafolio se visualiza correctamente tanto en computador como en teléfono.",
  "Los títulos y descripciones de los proyectos son fáciles de leer y entender.",
  "La base de datos cumple con los requisitos: mínimo cuatro proyectos, uso de Google Sheets y enlaces a imágenes.",
  "Las descripciones son llamativas, cuentan la historia de los proyectos y muestran las habilidades del(la) diseñador(a).",
  "El Behance refleja la identidad del(la) diseñador(a) y mantiene coherencia estética con el portafolio. ",
  "La pagina de Behance contiene los mismos trabajos que el portafolio.",
  "Behance incluye información completa de contacto y perfil.",
];

const cualitativos = [
  "¿Qué le celebras al portafolio? ",
  "¿Qué oportunidades de mejora identificas en el portafolio?",
  "¿Qué celebras de la base de datos?",
  "¿Qué oportunidades de mejora identificas en la base de datos?",
  "¿Qué celebras del Behance?",
  "¿Qué oportunidades de mejora identificas en el Behance?",
  "¿Qué aspecto destacarías como el más fuerte del proyecto?",
  "¿Qué sugerencia concreta harías para mejorar este trabajo?",
  "Comentarios adicionales:",
];

const reportes = ref([]);

onBeforeMount(async () => {
  const data = await portfolio_data;
  rawData.value = data;

  const agrupados = {};

  for (const entrada of data) {
    const apellido = (entrada["Apellido de quien evalúas:"] || "")
      .trim()
      .toLowerCase();
    const horario = (entrada["¿Qué horario estamos?"] || "").trim();

    if (!apellido || !horarioOrden.includes(horario)) continue;

    if (!agrupados[apellido]) {
      agrupados[apellido] = {
        apellido: apellido[0].toUpperCase() + apellido.slice(1),
        horario,
        cuantitativos: {},
        cualitativos: {},
        cantidades: {},
      };
    }

    const grupo = agrupados[apellido];

    for (const campo of cuantitativos) {
      const valor = parseFloat(entrada[campo]);
      if (!isNaN(valor)) {
        grupo.cuantitativos[campo] = (grupo.cuantitativos[campo] || 0) + valor;
        grupo.cantidades[campo] = (grupo.cantidades[campo] || 0) + 1;
      }
    }

    for (const campo of cualitativos) {
      const comentario = (entrada[campo] || "").trim();
      if (comentario) {
        if (!grupo.cualitativos[campo]) grupo.cualitativos[campo] = [];
        if (!grupo.cualitativos[campo].includes(comentario)) {
          grupo.cualitativos[campo].push(comentario);
        }
      }
    }
  }

  // Convertir a lista ordenada
  reportes.value = Object.values(agrupados).sort((a, b) => {
    const ha = horarioOrden.indexOf(a.horario);
    const hb = horarioOrden.indexOf(b.horario);
    if (ha !== hb) return ha - hb;
    return a.apellido.localeCompare(b.apellido);
  });
});

const apellidos = computed(() => reportes.value.map((r) => r.apellido));

const reporteSeleccionado = ref({});
watch(selectedApellido, () => {
  reporteSeleccionado.value = reportes.value.find(
    (r) => r.apellido.toLowerCase() === selectedApellido.value.toLowerCase()
  );
  console.log("apellido");
  console.log(selectedApellido.value);
  console.log(apellidos.value);
  console.log(reportes.value);
});
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto">
    <label for="apellido" class="block mb-2 font-bold"
      >Selecciona un apellido:</label
    >
    <select
      id="apellido"
      v-model="selectedApellido"
      class="w-full p-2 border border-gray-300 rounded"
    >
      <option value="">-- Selecciona --</option>
      <option v-for="apellido in apellidos" :key="apellido" :value="apellido">
        {{ apellido }}
      </option>
    </select>

    <div
      v-if="reporteSeleccionado"
      class="mt-6 whitespace-pre-wrap bg-gray-50 p-4 border rounded"
    >
      <h2 class="text-lg font-semibold mb-2">
        Hola {{ reporteSeleccionado.apellido }},
      </h2>
      <p class="mb-4">
        A continuación te comparto un resumen de las evaluaciones que recibiste
        de tus compañeros sobre tu portafolio.
      </p>

      <h3 class="font-bold mb-1">Promedios de evaluación:</h3>
      <ul class="mb-4">
        <li
          v-for="(suma, campo) in reporteSeleccionado.cuantitativos"
          :key="campo"
        >
          - {{ campo }}:
          {{ (suma / reporteSeleccionado.cantidades[campo]).toFixed(1) }}
        </li>
      </ul>

      <div
        v-for="(comentarios, campo) in reporteSeleccionado.cualitativos"
        :key="campo"
        class="mb-3"
      >
        <strong>{{ campo }}</strong>
        <ul>
          <li v-for="comentario in comentarios" :key="comentario">
            - {{ comentario }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  font-size: 1rem;
}
</style>
