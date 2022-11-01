<script setup lang="ts">
import { ref } from "vue";
import { Notify, Dialog } from "vant";

defineProps<{ msg: string }>();

function toast() {
  Dialog({ message: "ok" });
}
</script>

<template>
  <h1 class="title">{{ msg }}</h1>

  <div class="card">
    <van-button type="primary" @click="toast">鳗鱼头</van-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped lang="scss">
.title {
  background: $testBg;
}
</style>
