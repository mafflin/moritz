import axios from 'axios';

export default {
  namespaced: true,

  state: {
    current: {},
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCurrent(state, settings) {
      state.current = settings;
    },

    setLoading(state, value) {
      state.loading = value;
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
  },

  getters: {
    groupColors: ({ current }) => current.groupColors || [],
    loading: ({ loading }) => loading,
  },
};
