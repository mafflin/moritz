import axios from 'axios';

const MESSAGE_TIMEOUT_MS = 5000;

export default {
  namespaced: true,

  state: {
    current: {},
    collapsed: false,
    loading: false,
    message: {},
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCurrent(state, settings) {
      state.current = settings;
    },

    setCollapsed(state, value) {
      state.collapsed = value;
    },

    setLoading(state, value) {
      state.loading = value;
    },

    setMessage(state, value) {
      state.message = value;
    },

    reset(state) {
      state.current = {};
      state.collapsed = false;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchCurrent({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/settings/fetch_current');

        commit('setCurrent', data);
      } catch (error) {
        commit('setCurrent', {});

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    toggleCollapsed({ commit, getters: { collapsed } }) {
      commit('setCollapsed', !collapsed);
    },

    async showMessage({ commit }, { t, error }) {
      commit('setMessage', { t, error });

      await new Promise((resolve) => setTimeout(resolve, MESSAGE_TIMEOUT_MS));

      commit('setMessage', {});
    },
  },

  getters: {
    groupColors({ current }) {
      return current.groupColors || [];
    },

    unmatchedGroupId({ current }) {
      return current.unmatchedId;
    },

    collapsed({ collapsed }) {
      return collapsed;
    },

    loading({ loading }) {
      return loading;
    },

    message({ message }) {
      return message;
    },

    hasMessage(state, { message }) {
      return !!Object.keys(message).length;
    },
  },
};
