import axios from 'axios';

export default {
  namespaced: true,

  state: {
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async createCurrent({ commit, dispatch }, userId) {
      commit('setLoading', true);

      try {
        await axios.post('/api/v2/sessions/create_current', { userId });

        dispatch('cable/connect', {}, { root: true });
      } catch (error) {
        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    async deleteCurrent({ commit }) {
      commit('setLoading', true);

      try {
        await axios.post('/api/v2/sessions/delete_current');

        commit('users/reset', {}, { root: true });
        commit('settings/reset', {}, { root: true });
        commit('payments/reset', {}, { root: true });
        commit('search/reset', {}, { root: true });
      } catch (error) {
        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    loading({ loading }) {
      return loading;
    },
  },
};
