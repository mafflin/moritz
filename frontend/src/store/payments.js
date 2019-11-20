import { fetchEntities } from '../api'
import { convertArrayToObject } from '../utils'

const ENTITY_TYPE = 'payments'

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
  },

  mutations: {
    setPayments(state, payments) {
      state.ids = payments.map(user => user.id)
      state.entities = { ...state.entities, ...convertArrayToObject(payments) }
    },
  },

  actions: {
    async fetchPayments({ commit }) {
      const { items } = await fetchEntities(ENTITY_TYPE)
      if (!items) return

      commit('setPayments', items)
    },
  },

  getters: {
    payments: ({ ids, entities }) => ids.map(id => entities[id]),
  },
}
