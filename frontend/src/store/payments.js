import { fetchEntities, fetchEntity, updateEntity } from '../api';
import { convertArrayToObject } from '../utils';

const ENTITY_TYPE = 'payments';
const initialFilter = {
  date: new Date().toISOString().substr(0, 7),
  groupId: null,
};

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    selectedId: null,
    filter: { ...initialFilter },
  },

  mutations: {
    setPayments(state, payments) {
      state.ids = payments.map((payment) => payment.id);
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
      dispatch('router/changeRoute', { query: filter }, { root: true });
      dispatch('map/drawLocations', {}, { root: true });
    },

    async fetchPayment({ commit }, id) {
      const { item } = await fetchEntity(ENTITY_TYPE, id);

      commit('setSelectedPayment', id);
      commit('setPayment', item);
    },

    async updatePayment({ commit, dispatch }, payment) {
      const { item } = await updateEntity(ENTITY_TYPE, payment.id, payment);

      commit('setPayment', item);
      dispatch('fetchPayments');
      dispatch('router/goToHomePage', {}, { root: true });
    },

    resetFilter({ commit }) {
      commit('setFilter', initialFilter);
    },
  },

  getters: {
    selected: ({ selectedId, entities }) => entities[selectedId],

    payments: ({ ids, entities }) => ids.map((id) => entities[id]),

    debit: (state, { payments }) => payments
      .map(({ debit }) => debit).reduce((a, b) => a + b, 0),

    credit: (state, { payments }) => payments
      .map(({ credit }) => credit).reduce((a, b) => a + b, 0),

    withdrawal: (state, { payments }) => payments
      .map(({ withdrawal }) => withdrawal).reduce((a, b) => a + b, 0),

    total: ({ ids }) => ids.length,

    filter: ({ filter }) => filter,

    formattedFilter: ({ filter }) => {
      const date = filter.date && `${filter.date}-01`;
      return { ...filter, date };
    },
  },
};
