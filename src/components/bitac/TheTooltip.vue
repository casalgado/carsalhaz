<script setup>
import { ref, computed, nextTick, watch } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  targetElement: {
    type: [HTMLElement, null],
    default: null,
  },
  content: {
    type: String,
    default: "",
  },
});

const tooltip = ref(null);

const tooltipStyle = computed(() => {
  if (!props.targetElement || !tooltip.value) {
    return {
      opacity: 0,
      pointerEvents: "none",
    };
  }

  const targetRect = props.targetElement.getBoundingClientRect();
  const tooltipRect = tooltip.value.getBoundingClientRect();

  // Position above the target element
  const left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
  const top = targetRect.top - tooltipRect.height - 8; // 8px gap

  return {
    position: "fixed",
    left: `${Math.max(8, left)}px`, // Prevent tooltip from going off-screen
    top: `${Math.max(8, top)}px`,
    zIndex: 1000,
    opacity: 1,
    pointerEvents: "none",
  };
});

// Watch for visibility changes to ensure proper positioning
watch(
  () => props.visible,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      // Force a recomputation of position
      if (tooltip.value) {
        tooltip.value.style.opacity = "1";
      }
    }
  }
);
</script>

<template>
  <div v-if="visible" ref="tooltip" class="tooltip" :style="tooltipStyle">
    <div class="tooltip-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  background-color: #374151; /* Dark gray */
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 250px;
  word-wrap: break-word;
  transition: opacity 0.2s ease;
}

.tooltip-content {
  white-space: nowrap;
}

/* Arrow pointing down */
.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #374151;
}
</style>
