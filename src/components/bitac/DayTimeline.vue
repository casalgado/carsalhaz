<script setup>
import { computed, ref } from "vue";
import { DateTimeParser } from "../../bitac/DateTimeParser";
import Tooltip from "./TheTooltip.vue"; // Adjust path as needed

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

// Tooltip state
const showTooltip = ref(false);
const tooltipTarget = ref(null);
const tooltipContent = ref("");

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

// Tooltip handlers
const handleMouseEnter = (event, activity) => {
  tooltipTarget.value = event.currentTarget;
  tooltipContent.value = `${activity.category}${
    activity.description ? ": " + activity.description : ""
  }`;
  showTooltip.value = true;
};

const handleMouseLeave = () => {
  showTooltip.value = false;
  tooltipTarget.value = null;
  tooltipContent.value = "";
};
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
      @mouseenter="handleMouseEnter($event, a)"
      @mouseleave="handleMouseLeave"
    >
      <div
        class="sub-segment"
        :style="a.getSubsegmentStyle(activeOverlays).active"
      ></div>
    </div>

    <!-- Tooltip Component -->
    <Tooltip :visible="showTooltip" :target-element="tooltipTarget">
      {{ tooltipContent }}
    </Tooltip>
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
  cursor: pointer; /* Added for better UX */
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
