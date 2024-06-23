<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

withDefaults(defineProps<{
  type?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
}>(), {
  type: 'filled'
});

const elem = ref<HTMLButtonElement>();

onMounted(() => {
  elem.value?.addEventListener('click', e => {
    // Eventが発行される -> elemは必ず存在なので型推論が馬鹿。
    if (elem.value) {
      const effElem = document.createElement("span");

      effElem.setAttribute('class', 'ripple');
      effElem.setAttribute('style', `top: ${e.offsetY - 75}px; left: ${e.offsetX - 75}px;`);

      elem.value.appendChild(effElem);

      setTimeout(() => effElem && elem.value?.removeChild(effElem), 800);
    }
  });
});

onUnmounted(() => document.removeEventListener('click', () => { }));
</script>

<template>
  <button ref="elem" type="button" :class="`button ${type}`">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.button {
  &.elevated {
    --text-color: var(--md-sys-color-on-surface);

    * {
      color: var(--text-color)
    }

    background-color: var(--md-sys-color-surface);
    box-shadow: var(--shadow);
    border: none;

    &:disabled {
      * {
        color: color-mix(in srgb, var(--text-color) 70%, rgba(0, 0, 0, 0));
      }

      color: color-mix(in srgb, var(--text-color) 70%, rgba(0, 0, 0, 0));
    }

    & > span.ripple {
      background-color: color-mix(in srgb, var(--text-color) 20%, rgba(0, 0, 0, 0));
    }
  }

  &.filled {
    --text-color: var(--md-sys-color-on-primary);

    * {
      color: var(--text-color);
    }

    background-color: var(--md-sys-color-primary);
    box-shadow: var(--shadow);
    border: none;

    color: var(--text-color);

    &:disabled {
      * {
        color: color-mix(in srgb, var(--text-color) 70%, rgba(0, 0, 0, 0));
      }

      background-color: color-mix(in srgb, var(--md-sys-color-primary) 70%, rgba(0, 0, 0, 0));

      color: color-mix(in srgb, var(--text-color) 70%, rgba(0, 0, 0, 0));
    }

    & > span.ripple {
      background-color: color-mix(in srgb, var(--text-color) 20%, rgba(0, 0, 0, 0));
    }
  }

  &.tonal {
    --text-color: var(--md-sys-color-on-secondary-container);

    * {
      color: var(--text-color);
    }

    background-color: var(--md-sys-color-secondary-container);
    border: none;

    color: var(--text-color);

    &:disabled {
      * {
        color: color-mix(in srgb, var(--text-color) 70%, rgba(0, 0, 0, 0));
      }

      color: color-mix(in srgb, var(--text-color) 70%, rgba(0, 0, 0, 0));
    }

    & > span.ripple {
      background-color: color-mix(in srgb, var(--text-color) 20%, rgba(0, 0, 0, 0));
    }
  }

  &.outlined {
    --text-color: var(--md-sys-color-primary);
    * {
      color: var(--text-color);
    }

    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    border: solid 1px var(--md-sys-color-outline);

    color: var(--text-color);

    &:disabled {
      * {
        color: color-mix(in srgb, var(--text-color) 50%, rgba(0, 0, 0, 0));
      }

      color: color-mix(in srgb, var(--text-color) 50%, rgba(0, 0, 0, 0));
    }

    & > span.ripple {
      background-color: color-mix(in srgb, var(--text-color) 20%, rgba(0, 0, 0, 0));
    }
  }

  &.text {
    --text-color: var(--md-sys-color-primary);
    * {
      color: var(--text-color);
    }

    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    border: none;

    color: var(--text-color);

    &:disabled {
      * {
        color: color-mix(in srgb, var(--text-color) 50%, rgba(0, 0, 0, 0));
      }

      color: color-mix(in srgb, var(--text-color) 50%, rgba(0, 0, 0, 0));
    }

    & > span.ripple {
      background-color: color-mix(in srgb, var(--text-color) 20%, rgba(0, 0, 0, 0));
    }
  }

  position: relative;
  align-items: center;

  display: flex;

  font-family: "Zen Maru Gothic", sans-serif;
  font-size: 1em;
  padding: .3em .4em;

  width: fit-content;

  box-sizing: border-box;
  user-select: none;
  overflow: hidden;

  border-radius: var(--border-radius);

  & > span.ripple {
    color: aquamarine;
    width: 150px;
    height: 150px;

    position: absolute;

    border-radius: 100%;

    pointer-events: none;

    transform: scale(0);
    opacity: 0;
    animation: ripple .7s ease-out;
  }
}

@keyframes ripple {
  from {
    opacity: 1;
  }

  to {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
