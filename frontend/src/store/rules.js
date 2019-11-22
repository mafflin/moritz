import { createEntity, deleteEntity } from "../api";
import { convertArrayToObject } from "../utils";

const ENTITY_TYPE = "rules";

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
  },

  mutations: {
    setRules(state, rules) {
      state.ids = rules.map(user => user.id);
      state.entities = { ...state.entities, ...convertArrayToObject(rules) };
    },

    createRule(state, rule) {
      state.ids = [...state.ids, rule.id];
      state.entities = { ...state.entities, [rule.id]: rule };
    },
  },

  actions: {
    async createRule({ commit }, rule) {
      const { item } = await createEntity(ENTITY_TYPE, { rule });
      if (!item) return;

      commit("createRule", item);
    },

    deleteRule({ commit }, id) {
      commit("deleteRule", id);

      deleteEntity(ENTITY_TYPE, id);
    }
  },

  getters: {
    rules: ({ ids, entities }) => ids.map(id => entities[id]),
  }
};
