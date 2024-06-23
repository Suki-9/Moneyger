<script setup lang="ts">
import BottomSheet from '@/components/BottomSheet.vue';
import { inject, ref, Ref, watch } from 'vue';
import { IndexedDB, TagRecord } from '@/scripts/indexedDB';

const show = defineModel<boolean>('show', {
  required: true
});

const id = defineModel<number>('id', {
  required: false
});

const db = new IndexedDB();

const updateDB = inject<Ref<number>>('updateDB');

const value = ref<number>();
const summary = ref<string>();
const date = ref<string>(new Date().toLocaleDateString('sv-SE'));
const toggle = ref<boolean>(false);
const tags = ref<{
  id: number,
  name: string,
  isSelected: boolean
}[]>([]);

const getTags = async () => { 
  const t = id.value ? (await db.bind.where('logId').equals(id.value).toArray()).map(v => v.tagId) : [];

  tags.value = (await db.tags.toArray() as Required<TagRecord>[])
    .map(v => Object.assign(v, { isSelected: t.includes(v.id) }));
}

const action = async () => {
  if (id?.value) await db.bind.where('logId').equals(id.value).delete();

  try {
    value.value && db[id?.value ? 'update' : 'insert']('log', Object.assign(
      id?.value ? { id: id.value } : {},
      {
        date: new Date(date.value).getTime(),
        value: value.value * (toggle.value ? 1 : -1),
        summary: summary.value,
        tags: tags.value.filter(v => v.isSelected).map(v => v.id),
      }
    )).then(_ => {
      if (id.value) {
        id.value = undefined;
        show.value = false;
      }

      date.value = new Date().toLocaleDateString('sv-SE');
      value.value = undefined;
      summary.value = undefined;
      toggle.value = false;
      tags.value.map(v => v.isSelected = false);

      updateDB && ++updateDB.value;
    });

  } catch {}
}

getTags();

watch(id, () => {
  if (id.value) db.log.where('id').equals(id.value).first().then(v => {
    if (v) {
      value.value = Math.abs(v.value);
      summary.value = v.summary;
      date.value = new Date(v.date).toLocaleDateString('sv-SE');
      toggle.value = 0 <= v.value;
    }

    getTags();
  });
})
</script>

<template>
  <BottomSheet v-model="show" :class="$style.root">
    <M-Input type="date" v-model="date">日付</M-Input>

    <div :class="$style.toggle">
      <M-Button type="text" :class="[{ [$style.active]:  toggle}, $style.button]" @click="toggle = true" >収入</M-Button>
      <M-Button type="text" :class="[{ [$style.active]: !toggle}, $style.button]" @click="toggle = false">支出</M-Button>
    </div>

    <M-Input type="number" :avalable-paste="false" v-model="value">金額</M-Input>

    <M-Input type="text" :avalable-paste="false" v-model="summary">概要</M-Input>

    <div :class="$style.tags">
      <M-Button v-for="tag of tags" @click="tag.isSelected = !tag.isSelected" :type="tag.isSelected ? 'filled' : 'tonal'">{{ tag.name }}</M-Button>
    </div>

    <M-Button @click="action" typr="outlined" :class="$style.bButton">
      {{ id ? '更新' : '記録' }}<M-Icon name="edit"/>
    </M-Button>

  </BottomSheet>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-bottom: 5rem;

  & > :not(:last-child) {
    margin: .5rem 0;
    width: 100%;
  }

  & > .toggle {
    display: flex;
    border-radius: var(--border-radius);

    overflow: hidden;
    box-sizing: border-box;

    & > * {
      border-radius: 0;

      justify-content: center;
      width: 100%;

      &.active {
        background-color: color-mix(in srgb, rgb(29, 48, 73) 70%, rgba(0, 0, 0, 0));
        transition-duration: .2s;
        transition-property: background-color;
        transition-timing-function: ease-in;
        
        transform: scale(1);
      }
    }
  }

  & > .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
    & > * {
      margin-right: .5rem;
      
    }
  }

  & > :last-child {
    padding: .5em;
  }
}
</style>