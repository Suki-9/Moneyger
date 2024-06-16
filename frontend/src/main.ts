// Style sheets -------------------------------------------
import '@/styles/main.scss';
import '@/styles/reset.scss';
import '@/styles/variables.scss';

// TS modules ---------------------------------------------
import { createApp, ref } from 'vue';

// Vue plugins --------------------------------------------
import VITE_env from './plugins/vite_env';
import router from './plugins/router';

// Vue Components -----------------------------------------
import App from './App.vue';

const app = createApp(App);

app.use(router).use(VITE_env);

app.mount('#app');
