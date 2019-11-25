const SLEEP_MS = 5000

export default {
  namespaced: true,

  state: {
    message: null,
  },

  mutations: {
    setMessage(state, message) {
      state.message = message
    },

    setDialog(state, name, value) {
      state.dialogs = { ...state.dialogs, [name]: value }
    },
  },

  actions: {
    async showMessage({ commit }, message) {
      commit('setMessage', message)
      await new Promise(resolve => setTimeout(resolve, SLEEP_MS))
      commit('setMessage', null)
    },
  },

  getters: {
    message: ({ message }) => message,
  },
}
