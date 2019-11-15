import { fetchEntities, createEntity } from "../api";
import { convertArrayToObject } from "../utils";

const ENTITY_TYPE = "groups";

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {}
  },

  mutations: {
    setGroups(state, groups) {
      state.ids = groups.map(user => user.id);
      state.entities = { ...state.entities, ...convertArrayToObject(groups) };
    },

    addGroup(state, group) {
      state.ids = [...state.ids, group.id];
      state.entities = { ...state.entities, [group.id]: group };
    }
  },

  actions: {
    async fetchGroups({ commit }) {
      const { items } = await fetchEntities(ENTITY_TYPE);
      if (!items) return;

      commit("setGroups", items);
    },

    async createGroup({ commit }, group) {
      const { item } = await createEntity(ENTITY_TYPE, { group });
      if (!item) return;

      commit("addGroup", item);
    }
  },

  getters: {
    groups({ ids, entities }) {
      return ids.map(id => entities[id]);
    }
  }
};
