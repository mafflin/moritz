import { fetchEntities, createEntity, deleteEntity } from '../api';
import { convertArrayToObject } from '../utils';

const ENTITY_TYPE = 'rules';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
  },

  mutations: {
    setRules(state, rules) {
      state.ids = rules.map(rule => rule.id);
      state.entities = { ...state.entities, ...convertArrayToObject(rules) };
    },

    createRule(state, rule) {
      state.ids = [...state.ids, rule.id];
      state.entities = { ...state.entities, [rule.id]: rule };
    },

    deleteRule(state, ruleId) {
      state.ids = state.ids.filter(id => id !== ruleId);
    },
  },

  actions: {
    async fetchRules({ commit }, groupId) {
      const { items } = await fetchEntities(ENTITY_TYPE, { groupId });
      if (!items) return;

      commit('setRules', items);
    },

    async createRule({ commit, dispatch }, rule) {
      try {
        const { item } = await createEntity(ENTITY_TYPE, { rule });
        if (!item) return;

        commit('createRule', item);
        dispatch('ui/showMessage', 'Rule created!', { root: true });
        dispatch('payments/fetchPayments', {}, { root: true });
      } catch (error) {
        dispatch('client/raiseError', 'Rule exists!', { root: true });
      }
    },

    deleteRule({ commit, dispatch }, id) {
      commit('deleteRule', id);

      deleteEntity(ENTITY_TYPE, id);

      dispatch('payments/fetchPayments', {}, { root: true });
    },
  },

  getters: {
    rules: ({ ids, entities }) => ids.map(id => entities[id]),
  },
};
