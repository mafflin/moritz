/* eslint-disable no-param-reassign */

export default {
  namespaced: true,

  state: {
    error: null,
    loading: false,
  },

  mutations: {
    setError(state, error) {
      state.error = error
    },

    setLoading(state, loading) {
      state.loading = loading
    },
  },

  actions: {
    raiseError({ commit, dispatch }, error) {
      commit('setError', error)
      dispatch('ui/clearMessage', null, { root: true })
    },

    clearErrors({ commit }) {
      commit('setError', null)
    },

    startFetching({ commit }) {
      commit('setLoading', true)
    },

    finishFetching({ commit }) {
      commit('setLoading', false)
    },
  },

  getters: {
    error: ({ error }) => error,
    loading: ({ loading }) => loading,
  },
}
