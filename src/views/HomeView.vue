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

// Mi pasión por la educación, el diseño y la tecnologia se complementan,
// creando un perfil versátil y comprometido con la innovación y el
// desarrollo continuo. Poseo una sólida formación académica y una amplia
// experiencia en el campo de la educación. Como Diseñador tengo una
// perspectiva única en el desarrollo de proyectos creativos y funcionales.
// Mi experiencia laboral ha fortalecido mi destreza en la implementación
// de soluciones digitales y la enseñanza efectiva.
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
        Mi pasión por la educación, el diseño y la tecnologia se complementan,
        creando un perfil versátil y comprometido con la innovación y el
        desarrollo continuo. Poseo una sólida formación académica y una amplia
        experiencia en el campo de la educación y el diseño. Mi experiencia
        laboral ha fortalecido mi destreza en la implementación de soluciones
        digitales y la enseñanza efectiva.
      </p>
      <ul class="onlyScreen">
        <li>
          <a href="javascript:if(window.print)window.print()"
            >imprimir <strong>PDF</strong></a
          >
        </li>
        <li>
          <a :href="`https://wa.me/${3155433505}`" target="_blank"
            >whatsapp <strong>Chat</strong></a
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
      <h3 class="banner">Habilidades y Competencias</h3>

      <table>
        <tbody>
          <tr>
            <th>Idioma</th>
            <th>Nivel</th>
          </tr>
          <tr>
            <td>Ingles</td>
            <td>C2</td>
          </tr>
          <tr>
            <td>Frances</td>
            <td>B1</td>
          </tr>
        </tbody>
      </table>

      <dl>
        <dt>Habilidades Organizacionales</dt>
        <dd>
          He asumido posiciones de liderazgo, guiado por mi creencia en que el
          liderazgo es una forma de servicio que fortalece grupos, cultiva
          relaciones y fomenta un entorno de trabajo productivo y saludable.
        </dd>
        <dt>Habilidades Sociales y de Comunicación</dt>
        <dd>
          Fui seleccionado como representante estudiantil tanto en mis estudios
          de pregrado como de posgrado, desempeñando un papel fundamental al
          unir a los estudiantes y actuar como su voz ante los consejos
          académicos. Mi enfoque principal era facilitar una comunicación
          bidireccional efectiva.
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
