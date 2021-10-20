import axios from 'axios';

export default {
  namespaced: true,

  state: () => ({
    loading: false,
  }),

  /* eslint-disable no-param-reassign */
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async start({ commit }, userId) {
      commit('setLoading', true);

      try {
        await axios.post('/api/v2/sessions/start', { userId });
      } catch (error) {
        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    async delete({ commit }) {
      commit('setLoading', true);

      try {
        await axios.post('/api/v2/sessions/delete');

        commit('users/setCurrent', null, { root: true });
      } catch (error) {
        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    loading: ({ loading }) => loading,
  },
};
