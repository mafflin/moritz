import axios from 'axios';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    current: null,
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, items) {
      state.ids = items.map((item) => item.id);
      state.entities = items
        .map((item) => ({ [item.id]: item }))
        .reduce((acc, current) => ({ ...acc, ...current }), {});
    },

    setCurrent(state, user) {
      state.current = user;
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    initIndexPage({ dispatch }) {
      dispatch('fetchList');
      dispatch('sessions/delete', {}, { root: true });
    },

    async initShowPage({ dispatch }, id) {
      await dispatch('sessions/start', id, { root: true });
      await dispatch('fetchCurrent');
    },

    async fetchList({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/users/list');

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchCurrent({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/users/show_current');

        commit('setCurrent', data);
      } catch (error) {
        commit('setCurrent', null);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    list: ({ ids, entities }) => ids.map((id) => entities[id]),

    current: ({ current }) => current,

    loading: ({ loading }) => loading,
  },
};
