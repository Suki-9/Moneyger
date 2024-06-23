<script setup lang="ts">
import Registration from '@/pages/Home/Registration.vue';
import { ref } from 'vue';

const showBottomSheet = ref<boolean>(false);
</script>

<template>
  <div :class="$style.root">
    <div>
      <M-Button type="text" @click="$router.push('/')"><M-Icon name="format_list_bulleted"/></M-Button>
      <M-Button type="text" @click="$router.push('/analyze')"><M-Icon name="show_chart"/></M-Button>
      <M-Button type="text" @click="$router.push('/config')"><M-Icon name="manufacturing"/></M-Button>
    </div>
    <M-Button type="tonal" @click="showBottomSheet = !showBottomSheet" :class="$style.bt">
      <M-Icon v-show="!showBottomSheet" name="edit"/>
      <M-Icon v-show="showBottomSheet"  name="undo"/>
    </M-Button>
  </div>

  <Registration v-model:show="showBottomSheet"/>
</template>

<style module lang="scss">
.root {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  box-sizing: border-box;

  margin: 0;
  padding: 0;

  z-index: 7000;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: var(--md-sys-color-surface-container);

  & > .bt {
    padding: .8em;
    margin: .8em;
  }

  & > div {
    display: flex;

    & > * {
      padding: .4em;
      margin: .6em;
    }
  }
}
</style>