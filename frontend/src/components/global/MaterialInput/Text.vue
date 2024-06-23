<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  avalablePaste: boolean;
  placeholder?: string;
  name?: string;
  list?: string;
  isError?: boolean;
} & ({
  type: 'password';
} | {
  type:'text' | 'email' | 'url' | 'number'
})>();

const inputText = defineModel<string | undefined | number>({
  required: true,
});

const pasteClipBoard = async () => { 
  try {
    inputText.value = await navigator.clipboard.readText();
  } catch {}
}

const showText = ref<boolean>(false);
</script>

<template>
  <fieldset :class="[$style.root, {[$style.error]: isError }]">
    <legend>
      <slot></slot>
    </legend>

    <input
      :class="$style.form"
      :placeholder="placeholder ?? (type == 'email' ? 'example@domain.tld' : void 0)"
      :list="list"
      :type="type == 'password' && showText ? 'text' : type"
      :name="name"
      v-model="inputText"/>

    <M-Button v-if="avalablePaste" :class="$style.button" type="text" @click="pasteClipBoard()">
      <M-Icon name="content_paste"/>
    </M-Button>
    <M-Button v-if="type == 'password'" :class="$style.button" type="text" @click="showText = !showText">
      <M-Icon v-if="showText" name="visibility_off"/>
      <M-Icon v-else name="visibility"/>
    </M-Button>
    <M-Button :class="$style.button" type="text" @click="inputText = ''">
      <M-Icon name="close"/>
    </M-Button>
  </fieldset>
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  flex-direction: row;

  border-radius: var(--border-radius);
  border: solid 1px var(--md-sys-color-outline);

  padding: .25em .5em;

  *, .button > * {
    color: var(--md-sys-color-on-background);
  }

  & > input {
    font-size: 1em;
    width: 100%;

    &::placeholder, &:focus::placeholder {
      font-size: 1em;
      color: color-mix(in srgb, var(--md-sys-color-on-background) 60%, rgba(0, 0, 0, 0));
    }
  }

  &:focus {
    border: solid 1px var(--md-sys-color-primary);
  }

  &.error {
    border: solid 1px var(--md-sys-color-error);
    *, .button > * {
      color: var(--md-sys-color-error);
    }
  }
}
</style>
