/*
 * Vuex Store
 */

import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import user from './modules/user';
import ui from './modules/ui';

Vue.use(Vuex);

const modules = {
  auth,
  user,
  ui
};

const store = new Vuex.Store({
  modules
});

export default store;