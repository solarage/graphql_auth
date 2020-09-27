/* eslint-disable no-undef */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const httpEndpoint = VUE_APP_GRAPHQL_API_URL;
const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('apollo_token'));

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const httpLink = createHttpLink({
  uri: httpEndpoint
});

export const apolloClient = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  addTypename: true
});
