import '@/styles/style.scss';
import '@/styles/theme.scss';

import { createApp, ref } from 'vue';
import App from './App.vue';


const app = createApp(App);

// Init ServiceWorker -------------------------------------
if ('serviceWorker' in navigator) {
  console.log('service worker is active');
  navigator.serviceWorker.register('/sw.js').then(function (registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}

// Set theme ----------------------------------------------
document.body.setAttribute('theme', localStorage.getItem('theme') ?? 'light');

// Vue plugins --------------------------------------------
import VITE_env from './plugins/vite_env';
import router from './plugins/router';
import VueMaterialComponent from 'v-m3';

app.use(VueMaterialComponent);
app.use(VITE_env);
app.use(router);

// Provide Grobal refval ----------------------------------
const updateDB = ref<number>(0);

app.provide('updateDB', updateDB);

app.mount('#app');
