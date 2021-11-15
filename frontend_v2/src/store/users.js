import axios from 'axios';
import normalize from '../utils/normalize';

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
      const { ids, entities } = normalize(items);

      state.ids = ids;
      state.entities = entities;
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
      dispatch('sessions/deleteCurrent', {}, { root: true });
    },

    async initShowPage({ dispatch }, id) {
      await dispatch('sessions/createCurrent', id, { root: true });
      await dispatch('fetchCurrent');

      dispatch('settings/fetchCurrent', {}, { root: true });
      dispatch('payments/fetchList', {}, { root: true });
      dispatch('groups/fetchList', {}, { root: true });
    },

    async fetchList({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/users/fetch_list');

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
        const { data } = await axios.post('/api/v2/users/fetch_current');

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
