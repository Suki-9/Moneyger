<script setup lang="ts">
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

tag.get();
</script>

<template>
  <div :class="$style.root">
    <h2>
      <M-Button type="text" @click="$router.push('/config')"><M-Icon name="arrow_back"/></M-Button>
      <M-Icon name="label"/>Tag
    </h2>
    
    <M-Divider />

    <div :class="$style.addTag">
      <p><M-Icon name="new_label"/>Add New tag</p>
      <M-Input v-model="tag.newName.value">タグ名</M-Input>
      <M-Button @click="tag.add()" :class="$style.bt">追加</M-Button>
    </div>

    <div v-if="tag.list.value.length" :class="$style.tagList">
      <p>
        <span><M-Icon name="format_list_bulleted"/>タグ一覧</span>
        <M-Button type="text" @click="showTagList = !showTagList">{{ showTagList ? '閉じる' : '開く' }}</M-Button>
      </p>

      <div v-show="showTagList" v-for="record in tag.list.value" :key="record.id">

        <div v-if="record.id != selectedId">
          <p>{{ record.name }}</p>
        </div>
        <M-Input v-else v-model="record.name" :class="$style.input"></M-Input>

        <div>
          <M-Button type="text" v-show="record.id != selectedId" @click="record.id && (selectedId = record.id)">
            <M-Icon name="edit"/>
          </M-Button>
          <M-Button type="text" v-show="record.id == selectedId" @click="(tag.update(), selectedId = undefined)">
            <M-Icon name="check"/>
          </M-Button>
          <M-Button type="text" v-show="record.id != selectedId" @click="record.id && tag.remove(record.id)">
            <M-Icon name="delete"/>
          </M-Button>
        </div>

      </div>
    </div>

  </div>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.root {
  @extend .configPage;

  .addTag {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & > * {
      margin: .5rem 0;
    }

    .bt {
      width: fit-content;
    }
  }

  .tagList {
    & > :first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > span {
        display: flex;
        align-items: center;
      }
    }

    & > :not(:first-child) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      padding: .5em 0;

      & > * {
        display: flex;
        flex-direction: row;
        align-items: center;

        &.input:first-child{
          width: 100%;
          border-radius: 0;
          border: none;
          border-bottom: solid 1px var(--md-sys-color-outline);
        }
      }
    }
  }
}

.tag {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: .5em;

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