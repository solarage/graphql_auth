import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation auth($input: AuthInput!) {
    auth(input: $input)
  }
`
export const UPDATE_CURRENT_USER = gql`
  mutation updateCurrentUser($input: UpdateCurrentUserInput!) {
    updateCurrentUser(input: $input) {
      name
      login
      email
    }
  }
`