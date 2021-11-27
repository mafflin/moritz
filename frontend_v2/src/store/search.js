import axios from 'axios';
import normalize from '../utils/normalize';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    loading: false,
    q: null,
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

    setQ(state, q) {
      state.q = q;
    },

    reset(state) {
      state.q = null;
      state.ids = [];
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchResults({ commit }, q) {
      commit('setLoading', true);
      commit('setQ', q);

      try {
        const { data } = await axios.post('/api/v2/payments/fetch_search_results', { q });

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    async filterPaymentsList({ commit, dispatch }, { id, bookedAt }) {
      commit('setQ', null);

      await dispatch('payments/filterList', { date: bookedAt, groupId: null }, { root: true });

      commit('payments/setHighlighted', id, { root: true });
    },
  },

  getters: {
    list({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    loading({ loading }) {
      return loading;
    },

    q({ q }) {
      return q;
    },
  },
};