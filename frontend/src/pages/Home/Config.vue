<template>
  <div v-if="$route.path == '/config'" :class="$style.root">
    <h2>Configure</h2>

    <M-Divider />

    <div>
      <M-Button type="text" @click="$router.push('/config/tag')"><M-Icon name="label"/>Tag</M-Button>
      <M-Button type="text" @click="$router.push('/config/theme')"><M-Icon name="format_paint"/>Theme</M-Button>
      <M-Button type="text" @click="$router.push('/config/database')"><M-Icon name="database"/>DataBase</M-Button>
    </div>
  </div>
  <RouterView v-else/>
</template>

<style module lang="scss">
@import '@/styles/common.scss';

.root {
  @extend .configPage;

  & > * {
    font-size: 1.5rem;
  }
}
</style>