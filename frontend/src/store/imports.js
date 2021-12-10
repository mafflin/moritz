import axios from 'axios';
import fileEncoder from '../utils/fileEncoder';
import normalize from '../utils/normalize';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, items) {
      const { ids, entities } = normalize(items);

      state.ids = ids;
      state.entities = entities;
    },

    setSingle(state, item) {
      state.entities[item.id] = item;
    },

    setLoading(state, value) {
      state.loading = value;
    },

    reset(state) {
      state.ids = [];
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async createSingle({
      commit, dispatch, getters: { list }, rootGetters,
    }, file) {
      commit('setLoading', true);

      try {
        const { target: { result } } = await fileEncoder(file);
        const encoded = window.btoa(unescape(encodeURIComponent(result)));
        const { data } = await axios
          .post('/api/v2/imports/create_single', { csv: { encoded } });
        const importHistorySize = rootGetters['settings/importHistorySize'];
        const existing = list.length === importHistorySize
          ? list.slice(1, importHistorySize)
          : list;

        commit('setList', [...existing, data]);

        dispatch('showMessage', { t: 'imports.started' }, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchList({ commit, dispatch }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/imports/fetch_list');

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        dispatch('showMessage', { error: error.message }, { root: true });
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

    handleImportFinish({ commit, dispatch }, item) {
      const { paymentsTotal, paymentsCreated } = item;

      commit('setSingle', item);

      dispatch('payments/fetchList', {}, { root: true });
      dispatch(
        'showMessage',
        { tt: ['imports.finished', { paymentsTotal, paymentsCreated }] },
        { root: true },
      );
    },

    subscribeToUpdates({ dispatch, rootGetters }) {
      const cable = rootGetters['cable/cable'];
      if (!cable) return;

      cable.subscriptions.create(
        { channel: 'ImportsChannel' },
        { received: (data) => dispatch('handleImportFinish', JSON.parse(data)) },
      );
    },
  },

  getters: {
    list({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    listSorted(state, { list }) {
      return list.reverse();
    },

    hasImports(state, { list }) {
      return list.length;
    },

    hasPending(state, { list }) {
      return list.some(({ status }) => status === 'pending');
    },

    loading({ loading }) {
      return loading;
    },
  },
};
