import Vue from 'vue';

import { router } from './plugins/vue-router';
import { createProvider } from './plugins/vue-apollo';

import store from './store/store';
import App from './App';

import './assets/scss/app.scss';

/* eslint-disable no-new */
const main = new Vue({
  router,
  store,
  apolloProvider: createProvider(),

  render: h => h(App)
});

main.$mount('#app');