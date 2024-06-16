<script setup lang="ts">
import Haed from '@/components/Haed.vue';
import Registration from '@/pages/Home/Registration.vue';
import Navigation from '@/pages/Home/Navigation.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import { ref } from 'vue';

const showBottomSheet = ref<boolean>(false);
</script>

<template>
  <div :class="$style.root">
    <Haed/>
    <div :class="$style.contents">
      <RouterView />
    </div>
    <Navigation
      :list="() => $router.push('/')"
      :add="() => showBottomSheet = true"
      :analyze="() => $router.push('/analyze')"
      :settings="() => $router.push('/config')"
    />
  </div>
  <BottomSheet v-model="showBottomSheet" :class="$style.bottomSheet">
    <Registration />
  </BottomSheet>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  height: 100%;

  .contents {}
}

.bottomSheet {
  padding-bottom: 4rem;

  & > * {
    margin: .4em .2em;
  }
}
</style>