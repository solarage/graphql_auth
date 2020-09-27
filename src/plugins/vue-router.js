import Vue from 'vue';
import VueRouter from 'vue-router';

import { getter as G } from '@/lib/utils'; 
import routes from '@/routes';
import store from '@/store/store';

Vue.use(VueRouter);

const getAuthenticated = G('getters.auth/isAuthenticated');

export const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeResolve((to, from, next) => {
  const { meta } = to;
  const isAuthenticated = getAuthenticated(store);

  if (isAuthenticated || meta.guest)
    return next();

  next('/');
});