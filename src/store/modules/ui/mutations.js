import {
  START_LOADING,
  STOP_LOADING
} from './mutation-types';

export default {
  [START_LOADING](state) {
    state.loading = true;
  },

  [STOP_LOADING](state) {
    state.loading = false;
  }
};