import axios from 'axios';
import router from '../router';
import normalize from '../utils/normalize';
import { parseSortable } from '../utils/globals';
import parseUrlParams, { parseBoolean, parseDate, parseString } from '../utils/parseUrlParams';
import formatErrors from '../utils/formatErrors';

const QUERY_PARAMS = {
  groupId: parseString,
  date: parseDate,
  sort: parseSortable,
  asc: parseBoolean,
};

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    errors: {},
    loading: false,
    highlightedId: null,
    filter: {
      sort: null,
      asc: null,
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

    setHighlighted(state, id) {
      state.highlightedId = id;
    },

    setSingle(state, item) {
      state.entities = { ...state.entities, [item.id]: item };
    },

    setFilter(state, filter) {
      state.filter = { ...state.filter, ...filter };
    },

    setErrors(state, errors = {}) {
      const formatted = formatErrors(errors);

      state.errors = formatted;
    },

    reset(state) {
      state.ids = [];
      state.filter = Object.keys(state.filter)
        .reduce((acc, key) => ({ ...acc, [key]: null }), {});
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
      commit('setHighlighted', null);

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

    async fetchSingle({ commit, dispatch }, id) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/payments/fetch_single', { id });

        commit('setSingle', data);
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async updateSingle({ commit, dispatch, getters }, payment) {
      const { id, note } = payment;
      const withdrawal = payment.withdrawal || 0;

      commit('setLoading', true);
      commit('setErrors', {});

      try {
        await axios.post('/api/v2/payments/update_single', { id, note, withdrawal });

        commit('setSingle', { ...getters.selected, note, withdrawal });

        dispatch('users/closeModal', {}, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async filterList({ commit, dispatch }, filter) {
      commit('setFilter', filter);

      await dispatch('fetchList');
    },

    handleError({ commit }, { response = {}, message }) {
      const { status, data } = response;
      switch (status) {
        case 422:
          commit('setErrors', data);
          break;
        default:
          console.log(message);
          break;
      }
    },
  },

  getters: {
    list({ ids, entities, highlightedId }) {
      return ids.map((id) => {
        const highlighted = id === highlightedId;
        return highlighted ? { ...entities[id], highlighted } : entities[id];
      });
    },

    sortedList(state, { list, filter: { sort, asc } }) {
      if (!sort) return list;

      const sorted = list.sort((a, b) => {
        if (a[sort] < b[sort]) { return -1; }
        if (a[sort] > b[sort]) { return 1; }
        return 0;
      });
      return asc ? sorted : sorted.reverse();
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

    errors({ errors }) {
      return errors;
    },

    selected({ entities }, getters, rootState) {
      const { paymentId } = rootState.route.params;
      return entities[paymentId];
    },
  },
};
