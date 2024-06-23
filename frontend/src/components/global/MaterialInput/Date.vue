<script setup lang="ts">
defineProps<{
  placeholder?: string;
  name?: string;
  avalablePaste?: boolean;
}>();

const v= defineModel<string | undefined | number>({
  required: true,
});

</script>

<template>
  <fieldset :class="$style.root">
    <legend>
      <slot></slot>
    </legend>
    <input :placeholder="placeholder" type="date" v-model="v" />
    <M-Button type="text" @click="v = new Date().toLocaleDateString('sv-SE')">
      <M-Icon name="close"/>
    </M-Button>
  </fieldset>
</template>

<style module lang="scss">
.root { 
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;

  padding: .25em .5em;

  border-radius: var(--border-radius);
  border: solid 1px var(--md-sys-color-outline);

  & > input {
    font-size: 1em;
    width: 100%;

    &::placeholder, &:focus::placeholder {
      font-size: 1em;
      color: color-mix(in srgb, var(--md-sys-color-on-background) 60%, rgba(0, 0, 0, 0));
    }

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      opacity: 0;
      width: 100%;
    }
  }
}
</style>