<script setup lang="ts">
import Registration from './Registration.vue';
import { IndexedDB, LogRecord, TagRecord } from '@/scripts/indexedDB';
import { ref, Ref, inject, watch} from 'vue';

const db = new IndexedDB();
const updateDB = inject<Ref<number>>('updateDB');
const records = ref<Record<string, (LogRecord & { tags?: TagRecord[] })[]>>({});
const showBottomSheet = ref<boolean>(false);
const selectedId = ref<number>();

const getRecords = async () =>
  records.value = (await Promise.all(
    db.sort(await db.log.limit(50).toArray(), 'date', 'upper')
      .map(async v =>
        Object.assign(v, {
          tags: v.id && await db.tags
            .where('id')
            .anyOf(
              (
                await db.bind
                  .where('logId')
                  .equals(v.id)
                  .toArray()
              )
                .map(v => v.tagId)
            )
            .toArray()
        })
    ))
  )
    .reduce<Record<string, LogRecord[]>>((a, r) => {
      const d = new Date(r.date).toLocaleDateString('sv-SE');
      if (!(d in a)) a[d] = [];
      a[d].push(r);
      return a;
    }, {});

const remove = async (id: number) => {
  db.drop('log', id).then(
    _ => getRecords()
  )
}

getRecords();

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

    <M-Divider />

    <div v-for="record in records">
      <div>
        <p>¥{{ record.value }}</p>
        <p v-show="record.summary">{{ record.summary }}</p>
        <p :class="$style.tags" v-show="record.tags?.length">
          <span v-for="tag of record.tags">{{ tag.name }}</span>
        </p>
      </div>

      <div>
        <M-Button type="text" @click="record.id && (selectedId = record.id, showBottomSheet = true)">
          <M-Icon name="edit"/>
        </M-Button>
        <M-Button type="text" @click="record.id && remove(record.id)">
          <M-Icon name="delete"/>
        </M-Button>
      </div>

    </div>

  </div>

  <Registration v-model="showBottomSheet" v-model:id="selectedId" />
</template>

<style module lang="scss">
.group {
  margin: .5rem;
  padding: .5rem;

  border-radius: var(--border-radius);
  box-shadow: var(--shadow);

  & > p {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: .25rem .5rem;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: .5em 0;

    &:not(:last-child) {
      border-bottom: solid 1px var(--md-sys-color-outline-variant);
    }

    & > * {
      display: flex;
      flex-direction: row;
      align-items: center;

      &:first-child{
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        & > :last-child {
          display: flex;

          & > span {
            border-radius: var(--border-radius);
            border: solid 1px;

            padding: 0 .3em .2em .3em;
            margin-right: .5rem;
          }
        }
      }
    }
  }
}
</style>
