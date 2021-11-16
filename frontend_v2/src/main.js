import { createApp } from 'vue';
import { createI18n } from 'vue-i18n/index';
import { sync } from 'vuex-router-sync';

import App from './App.vue';
import messages from './i18n';
import router from './router';
import store from './store';
import upgradeElement from './mixins/upgradeElement';
import './assets/main.css';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App);

app.mixin(upgradeElement);

app.use(i18n);
app.use(router);
app.use(store);

sync(store, router);

app.mount('#app');
