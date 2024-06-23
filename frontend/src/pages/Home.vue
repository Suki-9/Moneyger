<script setup lang="ts">
import Haed from '@/components/Haed.vue';
import Navigation from '@/pages/Home/Navigation.vue';
</script>

<template>
  <div :class="$style.root">
    <Haed/>
    <RouterView />
    <div :class="$style.s"></div>
    <Navigation/>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  height: 100%;

  // TODO 無理やり過ぎ
  .s {
    padding-bottom: 4.5rem;
  }
}
</style>