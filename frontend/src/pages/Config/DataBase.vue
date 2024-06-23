<script setup lang="ts">
import { IndexedDB } from '@/scripts/indexedDB';
import { ref } from 'vue';

const db = new IndexedDB();
const showModal = ref<boolean>(false);
</script>

<template>
  <div :class="$style.root">
    <h2>
      <M-Button type="text" @click="$router.push('/config')"><M-Icon name="arrow_back"/></M-Button>
      <M-Icon name="database"/>DataBase
    </h2>

    <M-Divider />

    <div>
      <M-Button type="text"  @click="showModal = true">データの削除</M-Button>
      <M-Button type="text" >データのエクスポート (TODO)</M-Button>
      <M-Button type="text" >データの引き継ぎ (TODO)</M-Button>
    </div>

  </div>

  <M-Modal v-model:show="showModal" :class="$style.modal">
    <h2>
      <M-Icon name="delete"/><p>データベースを削除</p>
    </h2>
    <p>全ての削除しますか？</p>
    <div>
      <M-Button type="text" @click="showModal = false">Cancel</M-Button>
      <M-Button type="text" @click="db.delete(), showModal = false">Ok</M-Button>
    </div>
  </M-Modal>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.root {
  @extend .configPage;

  & > div > * {
    font-size: 1.2em;
  }
}

.modal {
  @extend .deleteModal;
}
</style>
