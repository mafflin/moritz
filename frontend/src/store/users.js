import { fetchEntities, fetchEntity, updateEntity } from '../api';
import { convertArrayToObject, fileEncoder, parseUrlQueryParams } from '../utils';

const ENTITY_TYPE = 'users';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    selectedId: null,
  },

  mutations: {
    setUsers(state, users) {
      state.ids = users.map((user) => user.id);
      state.entities = { ...state.entities, ...convertArrayToObject(users) };
    },

    setSelectedUser(state, user) {
      state.selectedId = user.id;
      state.entities = { ...state.entities, [user.id]: user };
    },

    resetSelectedUser(state) {
      state.selectedId = null;
    },
  },

  actions: {
    async fetchUsers({ commit, dispatch }) {
      commit('resetSelectedUser');
      dispatch('payments/resetFilter', {}, { root: true });

      const { items } = await fetchEntities(ENTITY_TYPE);
      commit('setUsers', items);
    },

    async fetchUser({ commit }, id) {
      const { item } = await fetchEntity(ENTITY_TYPE, id);
      commit('setSelectedUser', item);
    },

    async updateUser({ commit, dispatch, getters: { selectedId } }, { file }) {
      const {
        target: { result: avatarBase64 },
      } = await fileEncoder(file, false);
      const { item } = await updateEntity(ENTITY_TYPE, selectedId, { user: { avatarBase64 } });
      commit('setSelectedUser', item);
      dispatch('router/goToHomePage', {}, { root: true });
    },

    async loadUserPage({ dispatch }, { userId, query }) {
      await dispatch('fetchUser', userId);
      const filter = parseUrlQueryParams(query, ['date', 'groupId']);
      dispatch('groups/fetchGroups', {}, { root: true });
      dispatch('payments/updateFilter', filter, { root: true });
    },
  },

  getters: {
    users({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    selected({ selectedId, entities }) {
      return entities[selectedId];
    },

    selectedId({ selectedId }) {
      return selectedId;
    },
  },
};
