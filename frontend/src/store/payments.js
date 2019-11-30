import { fetchEntities } from '../api'
import { convertArrayToObject } from '../utils'

const ENTITY_TYPE = 'payments'

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    filter: {
      date: new Date().toISOString().substr(0, 7),
      groupId: null,
    },
  },

  mutations: {
    setPayments(state, payments) {
      state.ids = payments.map(user => user.id)
      state.entities = { ...state.entities, ...convertArrayToObject(payments) }
    },

    setFilter(state, filter) {
      state.filter = { ...state.filter, ...filter }
    },
  },

  actions: {
    updateFilter({ commit, dispatch }, filter) {
      commit('setFilter', filter)
      dispatch('fetchPayments')
    },

    async fetchPayments({ commit, getters: { formattedFilter } }) {
      const { items } = await fetchEntities(ENTITY_TYPE, formattedFilter)
      if (!items) return

      commit('setPayments', items)
    },
  },

  getters: {
    payments: ({ ids, entities }) => ids.map(id => entities[id]),
    debit: ({ ids, entities }) =>
      ids.map(id => entities[id].debit).reduce((a, b) => a + b, 0),
    credit: ({ ids, entities }) =>
      ids.map(id => entities[id].credit).reduce((a, b) => a + b, 0),
    total: ({ ids }) => ids.length,
    filter: ({ filter }) => filter,
    formattedFilter: ({ filter }) => {
      const date = filter.date && `${filter.date}-01`
      return { ...filter, date }
    },
  },
}
