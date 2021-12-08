import { createStore } from 'vuex';
import { MESSAGE_TIMEOUT_MS } from '../utils/globals';

import cable from './cable';
import groups from './groups';
import payments from './payments';
import imports from './imports';
import rules from './rules';
import search from './search';
import sessions from './sessions';
import settings from './settings';
import users from './users';

export default createStore({
  modules: {
    cable,
    groups,
    payments,
    imports,
    rules,
    search,
    sessions,
    settings,
    users,
  },

  state: {
    loading: false,
    message: {},
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },

    setMessage(state, value) {
      state.message = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async showMessage({ commit }, { t, tt, error }) {
      commit('setMessage', { t, tt, error });

      if (error) return;

      await new Promise((resolve) => setTimeout(resolve, MESSAGE_TIMEOUT_MS));

      commit('setMessage', {});
    },
  },

  getters: {
    message({ message }) {
      return message;
    },

    hasMessage(state, { message }) {
      return !!Object.keys(message).length;
    },

    loading({ loading }, getters) {
      return loading
        || getters['groups/loading']
        || getters['payments/loading']
        || getters['imports/loading']
        || getters['rules/loading']
        || getters['search/loading']
        || getters['sessions/loading']
        || getters['settings/loading']
        || getters['users/loading'];
    },
  },
});
