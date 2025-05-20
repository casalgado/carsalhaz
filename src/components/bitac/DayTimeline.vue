<script setup>
import { DateTimeParser } from "../../bitac/DateTimeParser";

defineProps({
  activities: {
    type: Array,
    required: true,
  },
  activeFilter: {
    type: Object,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="timeline" :class="`${DateTimeParser.getWeekday(date)}`">
    <div
      class="segment"
      v-for="a in activities"
      :key="`act${a.id}`"
      :style="
        a.matchesFilter(activeFilter)
          ? a.getSegmentStyle().active
          : a.getSegmentStyle().inactive
      "
      :title="`${a.category}${a.description ? `:${a.description}` : ''}`"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  position: relative;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin-bottom: 2px;
}

.segment {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: width 0.3s ease, left 0.3s ease;
}

.Sunday {
  margin-bottom: 40px;
}

.Friday {
  margin-bottom: 20px;
}
</style>
