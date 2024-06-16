<script setup lang="ts">
import Button from '@/components/Button.vue';

const v = defineModel<string | undefined>('value', {
  required: true
});

withDefaults(defineProps<{
  placeholder?: string;
  name?: string;
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
    <input :placeholder="placeholder" type="date" v-model="v" />
    <Button :class="$style.button">
      <p><span class="material-symbols-outlined" @click="v = new Date().toLocaleDateString('sv-SE')">close</span></p>
    </Button>
  </fieldset>
</template>

<style module lang="scss">
@import '@/styles/common.scss';
.root { 
  @extend .input;
}
</style>
