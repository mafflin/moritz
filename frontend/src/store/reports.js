import { createEntity } from '../api';
import { fileEncoder } from '../utils';

const ENTITY_TYPE = 'reports';

export default {
  namespaced: true,

  state: {
    file: null,
  },

  mutations: {
    setFile(state, file) {
      state.file = file;
    },
  },

  actions: {
    async uploadReport({ commit, dispatch, getters: { file } }) {
      const {
        target: { result },
      } = await fileEncoder(file);
      const encoded = window.btoa(unescape(encodeURIComponent(result)));
      await createEntity(ENTITY_TYPE, { report: { encoded } });

      dispatch('ui/showMessage', 'File uploaded!', { root: true });
      dispatch('payments/fetchPayments', {}, { root: true });

      commit('setFile', null);
    },
  },

  getters: {
    file: ({ file }) => file,
  },
};
