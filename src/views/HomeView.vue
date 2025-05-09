<script setup>
import { ref, onBeforeMount } from "vue";
import { cv_data } from "./../lib/cv";
import InfoEntry from "@/components/InfoEntry.vue";

const cv = ref([]);
const loading = ref(true);
console.log(loading.value);

onBeforeMount(() => {
  console.log("obm");
  cv_data.then((res) => {
    loading.value = false;
    cv.value = res;
  });
});
</script>

<template>
  <div class="spinner" :class="`${loading ? 'show' : 'hide'}`">
    <div id="nucleus"></div>
    <div id="orbit"></div>
    <div id="electron"></div>
  </div>
  <div class="wrapper" :class="`${loading ? 'hide' : 'show'}`">
    <header>
      <h1>Carlos Salgado</h1>
      <p>
        Diseñador, educador y desarrollador con experiencia internacional.
        Combino creatividad, análisis técnico y pedagogía para crear soluciones
        digitales prácticas y proyectos educativos innovadores. Mi enfoque:
        aprendizaje continuo, diseño funcional y tecnología al servicio de las
        personas.
      </p>
      <ul class="onlyScreen">
        <li>
          <a href="javascript:if(window.print)window.print()"
            >imprimir <strong>PDF</strong></a
          >
        </li>
        <li>
          <a :href="`https://wa.me/${3155433505}`" target="_blank"
            >chat <strong>WA</strong></a
          >
        </li>
        <li>
          <a href="mailto:contacto@carsalhaz.com" target="_blank"
            >contacto<strong>Email</strong></a
          >
        </li>
      </ul>
    </header>
    <section>
      <h3 class="banner">Educación</h3>
      <InfoEntry
        v-for="(e, i) in cv.filter((e) => e.category == 'Edu')"
        :entry="e"
        :key="i"
      />
      <h3 class="banner">Experiencia Laboral</h3>
      <InfoEntry
        v-for="(e, i) in cv.filter((e) => e.category == 'Exp')"
        :entry="e"
        :key="i"
      />
      <h3 class="banner">Emprendimiento</h3>
      <InfoEntry
        v-for="(e, i) in cv.filter((e) => e.category == 'Emp')"
        :entry="e"
        :key="i"
      />
      <h3 class="banner">Habilidades y Competencias</h3>

      <table>
        <tbody>
          <tr>
            <th>Idioma</th>
            <th>Nivel</th>
          </tr>
          <tr>
            <td>Inglés</td>
            <td>C2</td>
          </tr>
          <tr>
            <td>Francés</td>
            <td>B1</td>
          </tr>
        </tbody>
      </table>

      <dl>
        <dt>Habilidades Organizacionales</dt>
        <dd>
          Liderazgo colaborativo: Representación estudiantil (pregrado y
          posgrado) con enfoque en construir consensos, mediar necesidades y
          promover entornos productivos.
        </dd>
        <dt>Habilidades Sociales y de Comunicación</dt>
        <dd>
          Puente entre equipos: Vocería estudiantil ante consejos académicos,
          facilitando diálogos bidireccionales y resolviendo conflictos con
          empatía.
        </dd>
      </dl>
    </section>
    <footer>
      <p>
        <small
          >Alojado en
          <a href="https://firebase.google.com/">Firebase</a> &mdash;
          Desarrollado en <a href="https://vuejs.org/">Vue</a>
        </small>
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  opacity: 0;
  transition: all 0.5s;
}

$spinner-width: 60px;
$nucleus-width: $spinner-width * 0.4;
$orbit-width: $spinner-width * 0.8;
$electron-width: $spinner-width * 0.15;

.spinner {
  width: $spinner-width;
  height: $spinner-width;
  position: absolute;
  opacity: 0.8;
  left: 50%;
  top: 50%;
  animation: spin 5s linear infinite;
  transition: all 0.5s;
}
.spinner > div {
  border-radius: 100px;
  position: absolute;
}

#nucleus {
  background-color: var(--color-text-dark);
  width: $nucleus-width;
  height: $nucleus-width;
  left: calc(($spinner-width - $nucleus-width) / 2);
  top: calc(($spinner-width - $nucleus-width) / 2);
}

#orbit {
  border: 2px solid var(--color-text-dark);
  width: $orbit-width;
  height: $orbit-width;
  left: calc((($spinner-width - $orbit-width) / 2) - 1px);
  top: calc((($spinner-width - $orbit-width) / 2) - 1px);
}

#electron {
  background-color: var(--color-text-dark);
  width: $electron-width;
  height: $electron-width;
  left: calc(
    (($spinner-width - $orbit-width) / 2) - (($electron-width - 2px) / 2)
  );
  top: calc(($spinner-width - $electron-width) / 2);
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.show {
  opacity: 1;
}

.hide {
  opacity: 0;
}
</style>
