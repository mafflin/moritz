import axios from 'axios';

const MESSAGE_TIMEOUT_MS = 5000;

export default {
  namespaced: true,

  state: {
    current: {},
    panelReduced: false,
    loading: false,
    message: {},
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCurrent(state, settings) {
      state.current = settings;
    },

    setPanelReduced(state, value) {
      state.panelReduced = value;
    },

    setLoading(state, value) {
      state.loading = value;
    },

    setMessage(state, value) {
      state.message = value;
    },

    reset(state) {
      state.current = {};
      state.panelReduced = false;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchCurrent({ commit, dispatch }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/settings/fetch_current');
        const panelReduced = !!localStorage.getItem('panelReduced');

        commit('setCurrent', data);
        commit('setPanelReduced', panelReduced);
      } catch (error) {
        commit('setCurrent', {});

        dispatch('showMessage', { error: error.message });
      } finally {
        commit('setLoading', false);
      }
    },

    togglePanelReduced({ commit, getters: { panelReduced } }) {
      const newValue = !panelReduced;

      commit('setPanelReduced', newValue);

      localStorage.setItem('panelReduced', newValue ? 1 : '');
    },

    async showMessage({ commit }, { t, error }) {
      commit('setMessage', { t, error });

      await new Promise((resolve) => setTimeout(resolve, MESSAGE_TIMEOUT_MS));

      commit('setMessage', {});
    },
  },

  getters: {
    groupColors({ current }) {
      return current.groupColors || [];
    },

    unmatchedGroupId({ current }) {
      return current.unmatchedId;
    },

    panelReduced({ panelReduced }) {
      return panelReduced;
    },

    loading({ loading }) {
      return loading;
    },

    message({ message }) {
      return message;
    },

    hasMessage(state, { message }) {
      return !!Object.keys(message).length;
    },
  },
};
