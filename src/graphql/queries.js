import gql from 'graphql-tag';

export const FETCH_CURRENT_USER = gql`
  query {
    currentUser {
      login
      email
      name
    }
  }
`