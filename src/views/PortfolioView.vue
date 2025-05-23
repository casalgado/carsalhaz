<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import { fetchData } from "../lib/cv";

const rawData = ref([]);
const selectedApellido = ref("");
const passwordInput = ref("");
const passwordError = ref("");
const passwordVerified = ref(false);

// Orden horario deseado
const horarioOrden = ["2:30", "3:30", "4:30"];

const passwords = [
  { student: "Acosta", password: 4729 },
  { student: "Charris", password: 8156 },
  { student: "Diaz", password: 1638 },
  { student: "Franco", password: 9047 },
  { student: "González e", password: 6391 },
  { student: "González s", password: 5024 },
  { student: "Herazo", password: 7560 },
  { student: "Joya", password: 3952 },
  { student: "Martinez j", password: 1480 },
  { student: "Martinez n", password: 3194 },
  { student: "Petro", password: 4287 },
  { student: "Pumarejo", password: 9371 },
  { student: "Velasco", password: 2046 },
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
  { student: "Gonzales g", password: 1936 },
  { student: "Manzur", password: 5302 },
  { student: "Mendez", password: 3781 },
  { student: "Ochoa", password: 4159 },

  // NEW ENTRIES (missing names with unique passwords)
  { student: "Ballesteros", password: 1025 },
  { student: "Bonivento", password: 1077 },
  { student: "Chadid", password: 1103 },
  { student: "Cogollo", password: 1129 },
  { student: "Escorcia", password: 1204 },
  { student: "Garavito", password: 1307 },
  { student: "Linero", password: 1408 },
  { student: "Losada", password: 1509 },
  { student: "Maldonado sh", password: 1610 },
  { student: "Maldonado st", password: 1721 },
  { student: "Mendoza", password: 1802 },
  { student: "Osorio", password: 1903 },
  { student: "Seba colina", password: 2001 },
  { student: "Silva", password: 2104 },
  { student: "Solano", password: 2205 },
  { student: "Suárez", password: 2306 },
  { student: "Velez", password: 2407 },
  { student: "Vergara j", password: 5810 },
  { student: "Vergara mg", password: 2609 },
].sort((a, b) => a.student.localeCompare(b.student));

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
  const data = await fetchData("portfolio_data");
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
  console.log(reportes.value);
  console.log(rawData.value);
});

const apellidos = computed(() => reportes.value.map((r) => r.apellido));
const nombres = computed(() => {
  return rawData.value.reduce((acc, r) => {
    const apellido = r["Apellido de quien evalúas:"].toLowerCase().trim();
    const nombre = r["Nombre de quien evaluas:"].toLowerCase().trim();
    acc[apellido] = nombre;
    return acc;
  }, {});
});
const reporteSeleccionado = ref({});

// Función para verificar contraseña
const verifyPassword = () => {
  if (!selectedApellido.value) return;

  const studentData = passwords.find(
    (p) => p.student.toLowerCase() === selectedApellido.value.toLowerCase()
  );

  if (studentData && passwordInput.value === studentData.password.toString()) {
    passwordVerified.value = true;
    passwordError.value = "";
  } else {
    passwordError.value = "Contraseña incorrecta";
    passwordVerified.value = false;
  }
};

// Resetear verificación al cambiar apellido
watch(selectedApellido, () => {
  passwordVerified.value = false;
  passwordInput.value = "";
  passwordError.value = "";
  reporteSeleccionado.value = reportes.value.find(
    (r) => r.apellido.toLowerCase() === selectedApellido.value.toLowerCase()
  );
});

const capitalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>

<template>
  <div class="container">
    <!-- <pre>{{ [apellidos.length, passwords.length] }}</pre>

    <pre>{{
      apellidos.sort().map((m, i) => {
        return [m, passwords[i]];
      })
    }}</pre> -->
    <label for="apellido">Selecciona un apellido:</label>
    <select id="apellido" v-model="selectedApellido">
      <option value="">-- Selecciona --</option>
      <option
        v-for="apellido in apellidos.sort()"
        :key="apellido"
        :value="apellido"
      >
        {{ apellido }}
      </option>
    </select>

    <div
      v-if="selectedApellido && !passwordVerified"
      class="password-container"
    >
      <div class="password-box">
        <h3>Acceso al Reporte</h3>
        <input
          type="password"
          v-model="passwordInput"
          placeholder="Ingresa tu contraseña de 4 dígitos"
          maxlength="4"
          class="password-input"
        />
        <button @click="verifyPassword" class="verify-button">Verificar</button>
        <div v-if="passwordError" class="error-message">
          {{ passwordError }}
        </div>
      </div>
    </div>

    <div
      v-if="passwordVerified && reporteSeleccionado"
      class="report-container"
    >
      <h2 class="report-title">
        Hola
        {{
          capitalize(nombres[reporteSeleccionado.apellido.toLowerCase().trim()])
        }}
        {{ capitalize(reporteSeleccionado.apellido) }}
      </h2>
      <p class="report-intro">
        A continuación te comparto un resumen de las evaluaciones que recibiste
        de tus compañeros sobre tu portafolio.
      </p>

      <p>
        <strong>
          Te han evaluado
          {{
            rawData.filter(
              (e) =>
                e["Apellido de quien evalúas:"].toLowerCase().trim() ==
                selectedApellido.toLowerCase().trim()
            ).length
          }}
          compañeros:</strong
        >
        {{
          rawData
            .filter(
              (e) =>
                e["Apellido de quien evalúas:"].toLowerCase().trim() ==
                selectedApellido.toLowerCase().trim()
            )
            .map((e) => capitalize(e["Tu apellido:"].toLowerCase().trim()))
            .join(", ")
        }}
      </p>
      <p>
        <strong>
          Has evaluado
          {{
            rawData.filter(
              (e) =>
                e["Tu apellido:"].toLowerCase().trim() ==
                selectedApellido.toLowerCase().trim()
            ).length
          }}
          compañeros:</strong
        >
        {{
          rawData
            .filter(
              (e) =>
                e["Tu apellido:"].toLowerCase().trim() ==
                selectedApellido.toLowerCase().trim()
            )
            .map((e) =>
              capitalize(e["Apellido de quien evalúas:"].toLowerCase().trim())
            )
            .join(", ")
        }}
      </p>

      <h3 class="section-title">Promedios de evaluación:</h3>
      <ul class="score-list">
        <li
          v-for="(suma, campo) in reporteSeleccionado.cuantitativos"
          :key="campo"
        >
          - {{ campo }}:
          <strong>
            {{
              (suma / reporteSeleccionado.cantidades[campo]).toFixed(1)
            }}</strong
          >
        </li>
      </ul>

      <div
        v-for="(comentarios, campo) in reporteSeleccionado.cualitativos"
        :key="campo"
        class="comment-section"
      >
        <strong class="comment-title">{{ campo }}</strong>
        <ul class="comment-list">
          <li v-for="comentario in comentarios" :key="comentario">
            - {{ comentario }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.password-container {
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.password-box {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.password-input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #007bff;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
}

.verify-button {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.verify-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
  font-size: 14px;
}

.report-container {
  margin-top: 30px;
  padding: 25px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.report-title {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.report-intro {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 25px;
  color: #4a5568;
}

.section-title {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 15px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

.score-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.score-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: #4a5568;
}

.comment-section {
  margin-bottom: 25px;
}

.comment-title {
  display: block;
  font-size: 17px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.comment-list {
  padding-left: 20px;
  color: #4a5568;
}

.comment-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}
</style>
