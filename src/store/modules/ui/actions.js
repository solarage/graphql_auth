import * as types from './mutation-types';

export const startLoading = ({ commit }) => {
  commit(types.START_LOADING);
}

export const stopLoading = ({ commit }) => {
  commit(types.STOP_LOADING);
}

export default {
  startLoading,
  stopLoading
};
