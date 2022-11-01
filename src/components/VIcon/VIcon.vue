<!--  字节 IconPark 图标封装 -->
<script setup lang="ts">
import { withDefaults, computed } from "vue";
import IconDic from "./icon-dic";

interface Theme {
  type: string; // 图标名称
  theme?: "outline" | "filled" | "two-tone" | "multi-color";
  fill?: string | string[];
  size?: number | string;
  spin?: boolean;
  strokeLinecap?: "butt" | "round" | "square";
  strokeLinejoin?: "miter" | "round" | "bevel";
  strokeWidth?: number;
}

const props = withDefaults(defineProps<Theme>(), {
  type: "",
  theme: "outline",
  size: "1em",
  spin: false,
  fill: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 4,
});

// 烤串转大驼峰
const kebab2Camel = (words: string) => {
  if (!words) return "";

  return words
    .split("-")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");
};

const theIcon = computed(() =>
  props.type === "" ? null : IconDic[kebab2Camel(props.type)]
);
</script>

<template>
  <component
    class="v-icon"
    :is="theIcon"
    :theme="theme"
    :size="size"
    :fill="fill"
    :spin="spin"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    :stroke-width="strokeWidth"
  />
</template>

<style lang="scss" scoped>
.v-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
