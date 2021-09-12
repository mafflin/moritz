import {
  fetchEntities, createEntity, deleteEntity, fetchEntity,
} from '../api';
import { convertArrayToObject } from '../utils';

const ENTITY_TYPE = 'groups';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    selectedId: null,
    newGroup: {
      name: null,
    },
  },

  mutations: {
    setGroups(state, groups) {
      state.ids = groups.map((group) => group.id);
      state.entities = { ...state.entities, ...convertArrayToObject(groups) };
    },

    setSelectedGroup(state, group) {
      const item = state.entities[group.id];
      state.selectedId = group.id;
      state.entities = { ...state.entities, [group.id]: { ...item, ...group } };
    },

    createGroup(state, group) {
      state.ids = [...state.ids, group.id];
      state.entities = { ...state.entities, [group.id]: group };
    },

    deleteGroup(state, groupId) {
      state.ids = state.ids.filter((id) => id !== groupId);
      state.selectedId = null;
    },

    setNewGroup(state, name) {
      state.newGroup = { name };
    },
  },

  actions: {
    async fetchGroups({ commit }) {
      const { items } = await fetchEntities(ENTITY_TYPE);

      commit('setGroups', items);
    },

    async fetchGroup({ commit }, id) {
      const { item } = await fetchEntity(ENTITY_TYPE, id);

      commit('setSelectedGroup', item);
    },

    async createGroup({ commit, dispatch, getters: { newGroup } }) {
      const { item } = await createEntity(ENTITY_TYPE, { group: newGroup });
      if (!item) return;

      commit('createGroup', item);
      commit('setNewGroup', null);

      dispatch('ui/showMessage', 'Group created!', { root: true });
    },

    async deleteGroup({
      commit, dispatch, rootGetters, getters: { selected },
    }) {
      const { id } = selected;
      const { groupId } = rootGetters['payments/filter'];

      await deleteEntity(ENTITY_TYPE, id);

      commit('deleteGroup', id);
      dispatch('router/goToHomePage', {}, { root: true });

      if (id !== groupId) return;

      dispatch('payments/updateFilter', { groupId: null }, { root: true });
    },
  },

  getters: {
    groups: ({ ids, entities }) => ids.map((id) => entities[id]),
    selected: ({ selectedId, entities }) => entities[selectedId],
    newGroup: ({ newGroup }) => newGroup,
  },
};
