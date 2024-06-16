<script setup lang="ts">
import Button from '@/components/Button.vue';

const pasteClipBoard = async () => navigator.clipboard.readText().then(_v => v.value = _v).catch(_ => _);

const v = defineModel<string | number | undefined>('value', {
  required: true
});

withDefaults(defineProps<{
  placeholder?: string;
  name?: string;
  type?: 'number' | 'password' | 'tel' | 'text' | 'url' | 'date';
  avalablePaste?: boolean;
}>(), {
  avalablePaste: true,
  type: 'text',
});
</script>

<template>
  <fieldset :class="$style.root">
    <legend>
      <slot></slot>
    </legend>
    <input :placeholder="placeholder" :type="type" v-model="v" />
    <Button v-if="avalablePaste" :class="$style.button">
      <p><span class="material-symbols-outlined" @click="pasteClipBoard()">content_paste</span></p>
    </Button>
    <Button :class="$style.button">
      <p><span class="material-symbols-outlined" @click="v = undefined">close</span></p>
    </Button>
  </fieldset>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.root { 
  @extend .input;
}
</style>