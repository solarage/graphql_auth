import {
  SET_USER,
  UPDATE_USER
} from './mutation-types';

export default {
  [SET_USER](state, user) {
    const { id, name, login, email, password } = user;

    state.id = id;
    state.name = name;
    state.login = login;
    state.email = email;
    state.password = password;
  },

  [UPDATE_USER](state, user) {
    const { id, name, login, email } = user;

    state.id = id;
    state.name = name;
    state.login = login;
    state.email = email;
  }
};