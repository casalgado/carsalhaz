<script setup>
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
  <div class="timeline">
    <div
      class="segment"
      v-for="a in activities"
      :key="`act${a.id}`"
      :style="a.getSegmentStyle()"
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
  margin-bottom: 0px;
}

.segment {
  position: absolute;
  height: 100%;
  transition: width 0.3s ease, left 0.3s ease;
}
</style>
