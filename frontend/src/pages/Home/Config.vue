<script setup lang="ts">
import Button from '@/components/Button.vue';
import { IndexedDB } from '@/scripts/indexedDB';
const db = new IndexedDB();

const deleteDB = () => db.delete();
const switchTheme = (theme: 'dark' | 'light') => {
  localStorage.setItem('theme', theme);
  document.body.setAttribute('theme', theme);
};
</script>

<template>
  <div :class="$style.group">
    <p>データベース</p>
    <div>
      <Button @click="deleteDB">データの削除</Button>
      <Button>データのエクスポート (TODO)</Button>
      <Button>データの引き継ぎ (TODO)</Button>
    </div>
  </div>
  <div :class="$style.group">
    <p>カラーテーマ</p>
    <div>
      <Button @click="switchTheme('dark')">Dark</Button>
      <Button @click="switchTheme('light')">Light</Button>
    </div>
  </div>
</template>

<style module lang="scss">
.group {
  margin: .4rem .2rem;
  padding: .5rem;

  font-size: 1.2rem;

  background-color: var(--card);
  color: var(--card-foreground);

  border: solid 1px var(--border);
  border-radius: var(--radius);

  & > *:not(:first-child) {
    margin-top: .5rem;
  }

  & > p {
    display: flex;
    justify-content: space-between;

    padding: .25em .5em;

    font-size: 1.2em;

    user-select: none;

    background-color: var(--primary);
    border-radius: var(--radius);
  }

  & > div {
    display: flex;
    flex-direction: column;

    padding: .25rem 0;

    user-select: none;

    background-color: var(--accent);

    border-radius: var(--radius);

    & > * {
      display: block;
      padding: .5rem;

      width: 100%;

      color: var(--card-foreground);
      text-align: left;

      &:active {
        transform: scale(1);
      }

      & > *:not(:first-child) {
        margin: .5rem 0;
      }
    }
  }
}
</style>