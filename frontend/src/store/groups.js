import { fetchEntities, createEntity, deleteEntity, fetchEntity } from "../api";
import { convertArrayToObject } from "../utils";

const ENTITY_TYPE = "groups";

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    selectedId: null
  },

  mutations: {
    setGroups(state, groups) {
      state.ids = groups.map(user => user.id);
      state.entities = { ...state.entities, ...convertArrayToObject(groups) };
    },

    setSelectedGroup(state, group) {
      state.selectedId = group.id;
      state.entities = { ...state.entities, [group.id]: group };
    },

    createGroup(state, group) {
      state.ids = [...state.ids, group.id];
      state.entities = { ...state.entities, [group.id]: group };
    },

    deleteGroup(state, groupId) {
      state.ids = state.ids.filter(id => id !== groupId);
      state.selectedId = null;
    }
  },

  actions: {
    async fetchGroups({ commit }) {
      const { items } = await fetchEntities(ENTITY_TYPE);

      commit("setGroups", items);
    },

    async fetchGroup({ commit }, id) {
      const { item } = await fetchEntity(ENTITY_TYPE, id);

      commit("setSelectedGroup", item);
    },

    async createGroup({ commit }, group) {
      const { item } = await createEntity(ENTITY_TYPE, { group });
      if (!item) return;

      commit("createGroup", item);
    },

    deleteGroup({ commit }, id) {
      commit("deleteGroup", id);

      deleteEntity(ENTITY_TYPE, id);
    }
  },

  getters: {
    groups: ({ ids, entities }) => ids.map(id => entities[id]),
    selected: ({ selectedId, entities }) => entities[selectedId]
  }
};
