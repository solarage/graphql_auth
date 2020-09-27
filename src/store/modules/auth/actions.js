import store from '@/store/store';
import { router } from '@/plugins/vue-router';
import { apolloClient } from '@/lib/apollo-client';

import { getter as G, getExceptions } from '@/lib/utils';

import { LOGIN_USER } from '@/graphql/mutations';
import * as types from './mutation-types';

const getGraphQLErrorMessage = G('graphQLErrors.0.message');

export default {
  login,
  logout,
  check,
  setErrors
};

export async function login({ commit }, { login, password }) {
  await store.dispatch('ui/startLoading');

  try {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_USER, variables: { input: { login, password } }
    })
    const token = JSON.stringify(data.auth);

    await commit('LOGIN', token);
    await apolloClient.resetStore();
    await store.dispatch('user/init');
    await store.dispatch('ui/stopLoading');
  
    router.push({ name: 'profile.index' });
  } catch (errors) {
    const message = getExceptions(errors, getGraphQLErrorMessage);
  
    await commit('SET_ERRORS', message);
    await store.dispatch('ui/stopLoading');
  }
}

export async function logout({ commit }) {
  await commit(types.LOGOUT);
  await apolloClient.resetStore();

  router.push({ name: 'auth.index' });
}

export async function check({ commit }) {
  const token = localStorage.getItem('apollo_token');
  const authorized = !!token;

  await commit(types.UPDATE_STATUS, authorized);

  return authorized;
}

export async function setErrors({ commit }, errors) {
  await commit('SET_ERRORS', errors);
}

