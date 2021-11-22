import axios from 'axios';
import fileEncoder from '../utils/fileEncoder';

export default {
  namespaced: true,

  state: {
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async createSingle({ commit, dispatch }, file) {
      commit('setLoading', true);

      try {
        const { target: { result } } = await fileEncoder(file);
        const encoded = window.btoa(unescape(encodeURIComponent(result)));
        await axios.post('/api/v2/reports/create_single', { report: { encoded } });

        dispatch('payments/fetchList', {}, { root: true });
        dispatch('settings/showMessage', { t: 'reports.uploadSuccess' }, { root: true });
      } catch (error) {
        dispatch(
          'settings/showMessage',
          { error: error.message },
          { root: true },
        );
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    loading({ loading }) {
      return loading;
    },
  },
};
