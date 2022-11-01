<!-- svg-icon 封装 -->
<template>
  <svg
    class="svg-icon"
    :class="className"
    aria-hidden="true"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 100,
  },
});

const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
}
</style>
