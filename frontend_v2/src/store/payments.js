import axios from 'axios';
import normalize from '../utils/normalize';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    loading: false,
    filter: {
      q: null,
      date: '2021-09-01',
    },
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, items) {
      const { ids, entities } = normalize(items);

      state.ids = ids;
      state.entities = entities;
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchList({ commit, getters: { query } }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/payments/list', query);

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    list: ({ ids, entities }) => ids.map((id) => entities[id]),
    loading: ({ loading }) => loading,
    filter: ({ filter }) => filter,
    query: ({ filter }, rootState, getters, rootGetters) => {
      const groupId = rootGetters['groups/selected']?.id;
      return { ...filter, groupId };
    },
  },
};
