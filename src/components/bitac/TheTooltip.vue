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
  if (!props.targetElement) {
    return {
      opacity: 0,
      pointerEvents: "none",
    };
  }

  // Get the target element's position relative to its offset parent
  const targetRect = props.targetElement.getBoundingClientRect();
  const parentRect =
    props.targetElement.offsetParent?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

  // Calculate position relative to the timeline container
  const left = targetRect.left - parentRect.left + targetRect.width / 2;
  const top = targetRect.top - parentRect.top;

  return {
    position: "absolute",
    left: `${left}px`,
    top: `${top - 8}px`, // 8px above the target
    transform: "translate(-50%, -100%)", // Center horizontally, position above
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
  background-color: #444; /* Dark gray */
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 250px;
  word-wrap: break-word;
  transition: opacity 0.2s ease;
  white-space: nowrap;
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
  border-top-color: #444;
}
</style>
