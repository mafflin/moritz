import { fetchEntities } from "../api";
import { convertArrayToObject } from "../utils";

const ENTITY_TYPE = "payments";

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {}
  },

  mutations: {
    setPayments(state, payments) {
      state.ids = payments.map(user => user.id);
      state.entities = { ...state.entities, ...convertArrayToObject(payments) };
    }
  },

  actions: {
    async fetchPayments({ commit }, query) {
      const { items } = await fetchEntities(ENTITY_TYPE, { query });
      if (!items) return;

      commit("setPayments", items);
    }
  },

  getters: {
    payments: ({ ids, entities }) => ids.map(id => entities[id]),
    debit: ({ ids, entities }) =>
      ids.map(id => entities[id].debit).reduce((a, b) => a + b, 0),
    credit: ({ ids, entities }) =>
      ids.map(id => entities[id].credit).reduce((a, b) => a + b, 0),
    total: ({ ids }) => ids.length
  }
};
