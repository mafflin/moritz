import { fetchEntities, fetchEntity } from '../api'
import { convertArrayToObject } from '../utils'

const ENTITY_TYPE = 'users'

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    selectedId: null,
  },

  mutations: {
    setUsers(state, users) {
      state.ids = users.map(user => user.id)
      state.entities = { ...state.entities, ...convertArrayToObject(users) }
    },

    setSelectedUser(state, user) {
      state.selectedId = user.id
      state.entities = { ...state.entities, [user.id]: user }
    },

    clearSelectedUser(state) {
      state.selectedId = null
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      commit('clearSelectedUser')

      const { items } = await fetchEntities(ENTITY_TYPE)
      commit('setUsers', items)
    },

    async fetchUser({ commit }, id) {
      const { item } = await fetchEntity(ENTITY_TYPE, id)
      commit('setSelectedUser', item)
    },
  },

  getters: {
    users({ ids, entities }) {
      return ids.map(id => entities[id])
    },

    selected({ selectedId, entities }) {
      return entities[selectedId]
    },

    selectedId({ selectedId }) {
      return selectedId
    },
  },
}
