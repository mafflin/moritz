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
        await axios
          .post('/api/v2/imports/create_single', { csv: { encoded } });

        dispatch('payments/fetchList', {}, { root: true });
        dispatch('showMessage', { t: 'imports.started' }, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    handleError({ dispatch }, { response = {}, message }) {
      const { status, data } = response;
      switch (status) {
        case 422:
          dispatch('showMessage', { error: data.csv }, { root: true });
          break;
        default:
          dispatch('showMessage', { error: message }, { root: true });
          break;
      }
    },

    subscribeToUpdates({ dispatch, rootGetters }) {
      const cable = rootGetters['cable/cable'];
      if (!cable) return;

      cable.subscriptions.create(
        { channel: 'ImportsChannel' },
        {
          received: (data) => {
            const { paymentsTotal, paymentsCreated } = JSON.parse(data);
            dispatch(
              'showMessage',
              { tt: ['imports.finished', { paymentsTotal, paymentsCreated }] },
              { root: true },
            );
          },
        },
      );
    },
  },

  getters: {
    loading({ loading }) {
      return loading;
    },
  },
};
