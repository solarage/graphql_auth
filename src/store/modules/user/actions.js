import store from "@/store/store";
import { apolloClient } from '@/lib/apollo-client';

import { getter as G, getExceptions } from '@/lib/utils';

import { FETCH_CURRENT_USER } from '@/graphql/queries';
import { UPDATE_CURRENT_USER } from '@/graphql/mutations';
import * as types from './mutation-types';

const getGraphQLErrorMessage = G('graphQLErrors.0.message');

export default {
  init,
  updateUser
};

export async function init({ commit }) {
  await store.dispatch('ui/startLoading');

  try {
    const { data } = await apolloClient.query({ query: FETCH_CURRENT_USER });

    await commit('SET_USER', data.currentUser);
    await store.dispatch('ui/stopLoading');
  } catch (errors) {
    const message = getExceptions(errors, getGraphQLErrorMessage);

    await store.dispatch('auth/setErrors', message);
    await store.dispatch('ui/stopLoading');
  }
}

export async function updateUser({ commit }, { name, email }) {
  await store.dispatch('ui/startLoading');

  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_CURRENT_USER, variables: { input: { name, email } }
    })

    await commit(types.UPDATE_USER, data.updateCurrentUser);
    await store.dispatch('ui/stopLoading');
  } catch (errors) {
    const message = getExceptions(errors, getGraphQLErrorMessage);
    
    await store.dispatch('auth/setErrors', message);
    await store.dispatch('ui/stopLoading');
  }
}


