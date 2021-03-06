import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { sync } from 'vuex-router-sync';

import moment from 'moment';
import App from './App.vue';
import messages from './i18n';
import router from './router';
import store from './store';
import upgradeElement from './mixins/upgradeElement';

import './assets/main.css';
import './assets/margins.css';
import './assets/paddings.css';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App);

moment.locale(navigator.language);

app.mixin(upgradeElement);

app.use(i18n);
app.use(router);
app.use(store);

sync(store, router);

app.mount('#app');
