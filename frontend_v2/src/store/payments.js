import axios from 'axios';
import router from '../router';
import normalize from '../utils/normalize';
import parseUrlParams, { parseDate, parseString } from '../utils/parseUrlParams';

const QUERY_PARAMS = {
  groupId: parseString,
  date: parseDate,
};

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    loading: false,
    filter: {
      sort: null,
      asc: true,
      groupId: null,
      date: null,
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

    setFilter(state, filter) {
      state.filter = { ...state.filter, ...filter };
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    updateFilter({ commit }, query) {
      const filter = parseUrlParams(query, QUERY_PARAMS);
      const date = filter.date || parseDate(new Date());

      commit('setFilter', { ...filter, date });
    },

    async fetchList({ commit, getters: { query } }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/payments/fetch_list', query);

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        console.log(error.message);
      } finally {
        router.push({ query }).catch(() => {});

        commit('setLoading', false);
      }
    },

    async filterList({ commit, dispatch }, filter) {
      commit('setFilter', filter);

      dispatch('fetchList');
    },
  },

  getters: {
    list({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    total({ ids }) {
      return ids.length;
    },

    debit(state, { list }) {
      return list.map(({ debit }) => debit).reduce((a, b) => a + b, 0);
    },

    credit(state, { list }) {
      return list.map(({ credit }) => credit).reduce((a, b) => a + b, 0);
    },

    delta(state, { debit, credit }) {
      return debit + credit;
    },

    withdrawal(state, { list }) {
      return list.map(({ withdrawal }) => withdrawal).reduce((a, b) => a + b, 0);
    },

    loading({ loading }) {
      return loading;
    },

    filter({ filter }) {
      return filter;
    },

    query({ filter }) {
      return filter;
    },
  },
};
