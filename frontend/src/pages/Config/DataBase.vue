<script setup lang="ts">
import { IndexedDB } from '@/scripts/indexedDB';

const db = new IndexedDB();
const deleteDB = () => db.delete();
</script>

<template>
  <div :class="$style.root">
    <h2>
      <M-Button type="text" @click="$router.push('/config')"><M-Icon name="arrow_back"/></M-Button>
      <M-Icon name="database"/>DataBase
    </h2>

    <M-Divider />

    <div>
      <M-Button type="text"  @click="deleteDB">データの削除</M-Button>
      <M-Button type="text" >データのエクスポート (TODO)</M-Button>
      <M-Button type="text" >データの引き継ぎ (TODO)</M-Button>
    </div>

  </div>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.root {
  @extend .configPage;

  & > div > * {
    font-size: 1.2em;
  }
}
</style>
