<script setup lang="ts">
import Button from '@/components/Button.vue';
import TextInput from '@/components/TextInput.vue';
import { IndexedDB, TagRecord } from '@/scripts/indexedDB';
import { ref } from 'vue';

const db = new IndexedDB();
const selectedId = ref<number>();
const showTagList = ref<boolean>(false);

const tag = {
  list: ref<TagRecord[]>([]),
  newName: ref<string>(),
  selectedId: ref<string>(),
  add: async () => {
    if (tag.newName.value) {
      await db.tags.add({
        name: tag.newName.value,
      });

      tag.newName.value = void 0;
      tag.get();
    }
  },
  get: async () => tag.list.value = await db.tags.toArray(),
  update: async () => db.tags.update(selectedId.value, tag.list.value.filter(v => v.id == selectedId.value)[0]),
  remove: (id: number) => (db.tags.delete(id), tag.get()),
};

const deleteDB = () => db.delete();
const switchTheme = (theme: 'dark' | 'light') => {
  localStorage.setItem('theme', theme);
  document.body.setAttribute('theme', theme);
};

tag.get();
</script>

<template>
  <div :class="$style.group">
    <p>タグ</p>
    <div :class="$style.tag">
      <TextInput v-model:value="tag.newName.value" :class="$style.input">タグ名</TextInput>
      <Button @click="tag.add()">追加</Button>
      <div v-if="tag.list.value.length" :class="$style.list">
        <p>タグ一覧 <Button @click="showTagList = !showTagList">{{ showTagList ? '閉じる' : '開く' }}</Button></p>
        <template v-if="showTagList">
          <div v-for="record in tag.list.value" :key="record.id">
            <div v-if="record.id != selectedId">
              <p>{{ record.name }}</p>
              <p v-show="record.summary">{{ record.summary }}</p>
            </div>
            <TextInput v-else v-model:value="record.name" :class="$style.input"></TextInput>
            <div>
              <Button v-show="record.id != selectedId" :action="() => record.id && (selectedId = record.id)">
                <p><span class="material-symbols-outlined">edit</span></p>
              </Button>
              <Button v-show="record.id == selectedId" @click="(tag.update(), selectedId = undefined)">
                <p><span class="material-symbols-outlined">check</span></p>
              </Button>
              <Button v-show="record.id != selectedId" :action="() => record.id && tag.remove(record.id)">
                <p><span class="material-symbols-outlined">delete</span></p>
              </Button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div :class="$style.group">
    <p>カラーテーマ</p>
    <div>
      <Button @click="switchTheme('dark')">Dark</Button>
      <Button @click="switchTheme('light')">Light</Button>
    </div>
  </div>
  <div :class="$style.group">
    <p>データベース</p>
    <div>
      <Button @click="deleteDB">データの削除</Button>
      <Button>データのエクスポート (TODO)</Button>
      <Button>データの引き継ぎ (TODO)</Button>
    </div>
  </div>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.group { 
  @extend .group;

  font-size: 1.2rem;

  & > div:not(.tag) {
    display: flex;
    flex-direction: column;

    padding: .25rem 0;

    & > * {
      display: block;
      padding: .5rem;

      width: 100%;

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

.tag {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: .5em;
  
  .input {
    box-sizing: border-box;

    width: 100%;
    font-size: 1rem;
  }

  .list {
    display: flex;
    flex-direction: column;

    width: 100%;

    .input {
      border-radius: 0;
      border: none;
      border-bottom: solid 1px;
    }

    & > p {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 1rem;
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: .25rem .5rem;

      width: 100%;
    }
  }

  & > * {
    &:not(:last-child) {
      margin-bottom: .5rem
    }

    color: var(--card-foreground);
  }
}
</style>