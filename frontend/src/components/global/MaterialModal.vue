<script setup lang="ts">
import { onMounted, ref } from 'vue';

const show = defineModel<boolean>('show', {
  required: true
});

const p = withDefaults(defineProps<{
  name?: string;
  x?: number;
  y?: number;
  class?: string;
}>(), {
});

const root = ref<HTMLElement>();

onMounted(() => {
  if (root.value) {
    root.value.style.top  = p.y ? `${p.y}px` : '50%';
    root.value.style.left = p.x ? `${p.x}px` : '50%';
  }
})
</script>

<template>
  <div v-if="show" ref="root" :class="[$style.root, p.class]">
    <slot>
    </slot>
  </div>
  <div v-if="show" @click="show = !show" :class="$style.bg"></div>
</template>

<style module lang="scss">
.root {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2000;
  transform: translate(-50%, -50%);

  padding: .5rem;

  box-shadow: var(--shadow);
  border-radius: var(--border-radius);

  background-color: var(--md-sys-color-surface-container-low);

  * { color: var(--md-sys-color-on-surface); }
  color: var(--md-sys-color-on-surface);
}

.bg {
  position: fixed;
  z-index: 1800;

  width: 100%;
  height: 100%;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}
</style>
