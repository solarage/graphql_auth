import {
  LOGIN,
  LOGOUT,
  UPDATE_STATUS,
  SET_ERRORS
} from './mutation-types';

export default {
  [LOGIN](state, token) {
    state.isAuthenticated = true;
    state.errors = null;
    localStorage.setItem('apollo_token', token);
  },

  [LOGOUT](state) {
    state.isAuthenticated = false;
    localStorage.removeItem('apollo_token');
  },

  [UPDATE_STATUS](state, authorized) {
    state.isAuthenticated = authorized;
  },

  [SET_ERRORS](state, errors) {
    state.errors = errors;
  }
};