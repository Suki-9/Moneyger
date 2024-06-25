import '@/styles/style.scss';
import '@/styles/theme.scss';

import { createApp } from 'vue';
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
import { installPlugins } from './plugins';
installPlugins(app);

app.mount('#app');
