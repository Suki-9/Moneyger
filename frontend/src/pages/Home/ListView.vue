<script setup lang="ts">
import Button from '@/components/Button.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import Registration from './Registration.vue';
import { IndexedDB, LogRecord } from '@/scripts/indexedDB';
import { ref, Ref, inject, watch} from 'vue';

const db = new IndexedDB();
const updateDB = inject<Ref<number>>('updateDB');

const getRecords = async () => (await db.select(50, {
  key: 'date',
  type: 'upper',
})).reduce<Record<string, LogRecord[]>>((a, r) => {
  const d = new Date(r.date).toLocaleDateString('sv-SE');
  if (!(d in a)) a[d] = [];
  a[d].push(r);
  return a;
}, {});

const remove = async (id: number) => {
  db.log.delete(id);
  records.value = await getRecords();
}

const records = ref<Record<string, LogRecord[]>>(await getRecords());
const showBottomSheet = ref<boolean>(false);
const selectedId = ref<number>()
 
if (updateDB) watch(updateDB, async () => {
  records.value = await getRecords();
});
</script>

<template>
  <div v-for="[date, records] in Object.entries(records)" :class="$style.group">
    <p>
      <span>{{ date }}</span>
      <span>¥{{ records.reduce<number>((a, r) => a+=r.value, 0) }}</span>
    </p>
    <div v-for="record in records">
      <div>
        <p>¥{{ record.value }}</p>
        <p v-show="record.summary">{{ record.summary }}</p>
      </div>
      <div>
        <Button :action="() => record.id && (selectedId = record.id, showBottomSheet = true)">
          <p><span class="material-symbols-outlined">edit</span></p>
        </Button>
        <Button :action="() => record.id && remove(record.id)">
          <p><span class="material-symbols-outlined">delete</span></p>
        </Button>
      </div>
    </div>
  </div>
  <BottomSheet v-model="showBottomSheet" :class="$style.bottomSheet">
    <Registration :id="selectedId" />
  </BottomSheet>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.group { 
  @extend .group;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: .25rem .5rem;
  }
}

.bottomSheet {
  padding-bottom: 4rem;

  margin: 0;

  & > * {
    margin: .4em .2em;
  }
}
</style>
