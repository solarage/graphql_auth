import Vue from 'vue';
import VueApollo from 'vue-apollo';

import { apolloClient } from '../lib/apollo-client';

Vue.use(VueApollo);

export function createProvider () {
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error.message)
    }
  });

  return apolloProvider;
}