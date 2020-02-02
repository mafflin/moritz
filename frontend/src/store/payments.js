import { fetchEntities, fetchEntity, updateEntity } from '../api';
import { convertArrayToObject } from '../utils';

const ENTITY_TYPE = 'payments';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    selectedId: null,
    filter: {
      date: new Date().toISOString().substr(0, 7),
      groupId: null,
    },
  },

  mutations: {
    setPayments(state, payments) {
      state.ids = payments.map(user => user.id);
      state.entities = { ...state.entities, ...convertArrayToObject(payments) };
    },

    setPayment(state, payment) {
      state.entities = { ...state.entities, [payment.id]: payment };
    },

    setSelectedPayment(state, id) {
      state.selectedId = id;
    },

    setFilter(state, filter) {
      state.filter = { ...state.filter, ...filter };
    },
  },

  actions: {
    updateFilter({ commit, dispatch }, filter) {
      commit('setFilter', filter);
      dispatch('fetchPayments');
    },

    async fetchPayments({ commit, dispatch, getters: { filter, formattedFilter } }) {
      const { items } = await fetchEntities(ENTITY_TYPE, formattedFilter);
      if (!items) return;

      commit('setPayments', items);
      dispatch('router/goToHomePage', filter, { root: true });
    },

    async fetchPayment({ commit }, id) {
      const { item } = await fetchEntity(ENTITY_TYPE, id);

      commit('setSelectedPayment', id);
      commit('setPayment', item);
    },

    async updatePayment({ commit, dispatch }, payment) {
      const { item } = await updateEntity(ENTITY_TYPE, payment.id, payment);

      commit('setPayment', item);
      dispatch('router/goToHomePage', {}, { root: true });
    },
  },

  getters: {
    payments: ({ ids, entities }) => ids.map(id => entities[id]),
    selected: ({ selectedId, entities }) => entities[selectedId],
    debit: ({ ids, entities }) => ids.map(id => entities[id].debit).reduce((a, b) => a + b, 0),
    credit: ({ ids, entities }) => ids.map(id => entities[id].credit).reduce((a, b) => a + b, 0),
    total: ({ ids }) => ids.length,
    filter: ({ filter }) => filter,
    formattedFilter: ({ filter }) => {
      const date = filter.date && `${filter.date}-01`;
      return { ...filter, date };
    },
  },
};
