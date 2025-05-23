<script setup>
import { computed } from "vue";
import { DateTimeParser } from "../../bitac/DateTimeParser";

const props = defineProps({
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
  activeOverlays: {
    type: Object,
    required: true,
  },
});

const daySummary = computed(() => {
  let dayTotal = props.activities.reduce((acc, activity) => {
    return acc + Number(activity.money);
  }, 0);

  dayTotal = Math.round(dayTotal * 100) / 100;

  return `${new Date(props.date).toLocaleString("es-ES", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })} - $${dayTotal}`;
});
</script>

<template>
  <div
    class="timeline"
    :class="`${DateTimeParser.getWeekday(date)}`"
    :data-day="daySummary"
  >
    <div
      class="segment"
      v-for="a in activities"
      :key="`act${a.id}`"
      :style="
        a.matchesFilter(activeFilter)
          ? a.getSegmentStyle(activeOverlays).active
          : a.getSegmentStyle().inactive
      "
      :title="`${a.category}${a.description ? `:${a.description}` : ''}`"
    >
      <div
        class="sub-segment"
        :style="a.getSubsegmentStyle(activeOverlays).active"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  position: relative;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  margin-bottom: 2px;
}

.timeline::after {
  content: "" attr(data-day) "";
  font-size: 0.8em;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  z-index: 999;
  position: absolute;
}

.segment {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: width 0.3s ease, left 0.3s ease;
}

.sub-segment {
  position: absolute;
  transition: width 0.3s ease, left 0.3s ease;
}

.Sunday {
  margin-top: 40px;
}

.Friday {
  margin-top: 20px;
}
</style>
