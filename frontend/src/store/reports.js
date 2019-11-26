import { createEntity } from '../api'
import { fileEncoder } from '../utils'

const ENTITY_TYPE = 'reports'

export default {
  namespaced: true,

  state: {
    file: null,
  },

  mutations: {
    setFile(state, file) {
      state.file = file
    },
  },

  actions: {
    async uploadReport({ commit, dispatch, getters: { file } }) {
      try {
        const {
          target: { result },
        } = await fileEncoder(file)
        const encoded = window.btoa(unescape(encodeURIComponent(result)))
        const {
          item: { payments },
        } = await createEntity(ENTITY_TYPE, { report: { encoded } })

        dispatch('ui/showMessage', 'File uploaded!', { root: true })
        commit('payments/setPayments', payments, { root: true })
      } catch (error) {
        dispatch('client/raiseError', 'Unsupported file format!', { root: true })
      }

      commit('setFile', null)
    },
  },

  getters: {
    file: ({ file }) => file,
  },
}
