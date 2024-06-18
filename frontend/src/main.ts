// Style sheets -------------------------------------------
import '@/styles/main.scss';
import '@/styles/reset.scss';
import '@/styles/theme.scss';

// TS modules ---------------------------------------------
import { createApp, ref } from 'vue';

// Vue plugins --------------------------------------------
import VITE_env from './plugins/vite_env';
import router from './plugins/router';

// Vue Components -----------------------------------------
import App from './App.vue';

document.body.setAttribute('theme', localStorage.getItem('theme') ?? 'light');

if ('serviceWorker' in navigator) {
  console.log('service worker is active');
  navigator.serviceWorker.register('/sw.js').then(function (registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}

const updateDB = ref<number>(0);

const app = createApp(App);

app.use(router).use(VITE_env);

app.provide('updateDB', updateDB);

app.mount('#app');
