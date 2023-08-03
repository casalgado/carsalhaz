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
  console.log(noStart);
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
    <h2>
      {{ entry.title }} <span class="dates">{{ dates }}</span>
    </h2>
    <p class="slim">{{ degree }}</p>
    <p>{{ entry.organization }}</p>
    <ul>
      <li v-for="(e, i) in entry.bullets" :key="i">{{ e }}</li>
    </ul>
  </div>
</template>

<style scoped>
.dates {
  font-weight: lighter;
}
</style>
