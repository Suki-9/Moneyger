<script setup lang="ts">
import Button from '@/components/Button.vue';

const actions = defineProps<{
  list: () => unknown;
  add: () => unknown;
  analyze: () => unknown;
  settings: () => unknown;
}>();
</script>

<template>
  <div :class="$style.root">
    <Button :action="actions.list"><p><span class="material-symbols-outlined">format_list_bulleted</span></p></Button>
    <Button :action="actions.add"><p><span class="material-symbols-outlined">library_add</span></p></Button>
    <Button :action="actions.analyze"><p><span class="material-symbols-outlined">show_chart</span></p></Button>
    <Button :action="actions.settings"><p><span class="material-symbols-outlined">manufacturing</span></p></Button>
  </div>
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

  display: flex;
  flex-direction: row;
  justify-content: space-around;

  background-color: var(--secondary);

  & > * {
    font-size: 2rem;
    border-radius: 999vh;

    & > p {
      line-height: 0;
    }
  }
}
</style>