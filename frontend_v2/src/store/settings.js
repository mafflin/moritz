import axios from 'axios';

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
  },
};
