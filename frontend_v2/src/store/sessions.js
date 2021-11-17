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
    async createCurrent({ commit }, userId) {
      commit('setLoading', true);

      try {
        await axios.post('/api/v2/sessions/create_current', { userId });
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

        commit('users/setCurrent', null, { root: true });
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
