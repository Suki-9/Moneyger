<script setup lang="ts">
const switchTheme = (
  theme: 'dark' | 'dark-high-contrast' | 'dark-medium-contrast' | 'light' | 'light-medium-contrast' | 'light-high-contrast'
) => {
  localStorage.setItem('theme', theme);
  document.body.setAttribute('theme', theme);
};
</script>

<template>
  <div :class="$style.root">
    <h2>
      <M-Button type="text" @click="$router.push('/config')"><M-Icon name="arrow_back"/></M-Button>
      <M-Icon name="format_paint"/>Theme
    </h2>

    <M-Divider />

    <div>
      <p><M-Icon name="dark_mode"/>Dark Theme</p>
      <M-Button type="text" @click="switchTheme('dark')">Dark</M-Button>
      <M-Button type="text" @click="switchTheme('dark-medium-contrast')">Dark (medium contrast)</M-Button>
      <M-Button type="text" @click="switchTheme('dark-high-contrast')">Dark (high-contrast)</M-Button>
    </div>

    <div>
      <p><M-Icon name="light_mode"/>Light Theme</p>
      <M-Button type="text" @click="switchTheme('light')">Light</M-Button>
      <M-Button type="text" @click="switchTheme('light-medium-contrast')">Light (medium contrast)</M-Button>
      <M-Button type="text" @click="switchTheme('light-high-contrast')">Light (high-contrast)</M-Button>
    </div>

  </div>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.root {
  @extend .configPage;

  & > div {
    font-size: 1.5em;
  }
}
</style>