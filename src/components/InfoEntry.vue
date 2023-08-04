<script setup>
import { computed } from "vue";
const props = defineProps({
  entry: {
    type: Object,
    default: () => {
      return { title: "" };
    },
  },
});

const dates = computed(() => {
  let noStart =
    props.entry.start_date == undefined || props.entry.start_date == "";
  return `${noStart ? "" : props.entry.start_date}${noStart ? "" : " - "}${
    props.entry.end_date
  }`;
});

const degree = computed(() => {
  let noDeg = props.entry.degree == undefined || props.entry.degree == "";
  return `${noDeg ? "" : props.entry.degree}${noDeg ? "" : "  "}`;
});
</script>
<template>
  <div>
    <h2 class="slim">
      {{ entry.title }}
    </h2>
    <p class="dates">{{ dates }}</p>
    <p class="slim">{{ degree }}</p>
    <p>{{ entry.organization }}</p>
    <ul>
      <li v-for="(e, i) in entry.bullets" :key="i">
        <span v-for="(t, j) in e" :key="`${i}${j}`">
          <span v-if="j % 2 == 0">{{ t }}</span>
          <span v-else>
            <a :href="t.split(',')[1]" target="_blank">{{ t.split(",")[0] }}</a>
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dates {
  font-weight: normal;
}
</style>
