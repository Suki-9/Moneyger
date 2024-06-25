import VueMaterialComponent from 'v-m3'
import VITE_env from './vite_env'
import router from './router'

import { App, ref } from 'vue';

const updateDB = ref<number>(0);

export function installPlugins(app: App) {
  app.use(VueMaterialComponent);
  app.use(VITE_env);
  app.use(router);

  app.provide('updateDB', updateDB);
}
