<script setup lang="ts">
import TextInput from '@/components/TextInput.vue';
import DateInput from '@/components/DateInput.vue';
import Button from '@/components/Button.vue';
import { inject, ref, Ref } from 'vue';
import { IndexedDB, TagRecord } from '@/scripts/indexedDB';

const { id } = defineProps<{
  id?: number;
}>();

const value = ref<number>();
const summary = ref<string>();
const date = ref<string>(new Date().toLocaleDateString('sv-SE'));
const toggle = ref<boolean>(false);

const db = new IndexedDB();
const updateDB = inject<Ref<number>>('updateDB');
const tags = ref<{
  id: number,
  name: string,
  isSelected: boolean
}[]>([]);

if (id) {
  db.log.where('id').equals(id).first().then(v => {
    if (v) {
      value.value = Math.abs(v.value);
      summary.value = v.summary;
      date.value = new Date(v.date).toLocaleDateString('sv-SE');
      toggle.value = 0 <= v.value;
    }
  });
}

const getTags = async () => tags.value = (await db.tags.limit(30).toArray() as Required<TagRecord>[]).map(v => Object.assign( v, { isSelected: false}));
const action = async () => {
  if (value.value && date.value) {
    db[
      id ? 'update' : 'insert'
    ](Object.assign(id ? { id } : {}, {
      date: new Date(date.value).getTime(),
      value: value.value * (toggle.value ? 1 : -1),
      summary: summary.value,
    })).then(async r => {
      if (r) {
        if (!id) for (const tag of tags.value.filter(v => v.isSelected)) {
          await db.bind.add({ tagId: tag.id, logId: r });
          tag.isSelected = false;
        };

        date.value = new Date().toLocaleDateString('sv-SE');
        value.value = undefined;
        summary.value = undefined;
        toggle.value = false;
        updateDB && ++updateDB.value;
      }
    })
  }
}

getTags();
</script>

<template>
  <DateInput v-model:value="date">日付</DateInput>
  <div :class="$style.toggle">
    <Button :class="[{ [$style.active]:  toggle}, $style.button]" @click="toggle = true" >収入</Button>
    <Button :class="[{ [$style.active]: !toggle}, $style.button]" @click="toggle = false">支出</Button>
  </div>
  <TextInput type="number" :avalable-paste="false" v-model:value="value">金額</TextInput>
  <TextInput type="text" :avalable-paste="false" v-model:value="summary">概要</TextInput>
  <div :class="$style.tags">
    <Button v-for="tag of tags" @click="tag.isSelected = !tag.isSelected" :type="tag.isSelected ? 'outlined' : 'text'">{{ tag.name }}</Button>
  </div>
  <div :class="$style.l">
    <Button :action="action" typr="outlined" :class="$style.button">
      <p>
        {{ id ? '更新' : '記録' }}
        <span class="material-symbols-outlined">edit</span>
      </p>
    </Button>
  </div>
</template>

<style module lang="scss">
.toggle {
  display: flex;
  margin: 0;

  overflow: hidden;
  box-sizing: border-box;

  border: solid 2px;
  border-radius: var(--radius);

  & > .button {
    width: 100%;

    border-radius: 0;

    text-align: center;
    color: var(--primary-foreground);

    &.active {
      background-color: var(--primary);
      transition-duration: .2s;
      transition-property: background-color;
      transition-timing-function: ease-in;
      
      transform: scale(1);
    }

    & > p {
      display: flex;  
    }
  }
}

.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > * {
    margin-right: .5rem;

    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }
}

.l {
  display: flex;
  flex-direction: row-reverse;

  .button > p {
    display: flex;
  }
}
</style>