import axios from 'axios';

export default {
  namespaced: true,

  state: {
    current: {},
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCurrent(state, settings) {
      state.current = settings;
    },

    setLoading(state, value) {
      state.loading = value;
    },

    reset(state) {
      state.current = {};
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchCurrent({ commit, dispatch }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/settings/fetch_current');

        commit('setCurrent', data);
      } catch (error) {
        commit('setCurrent', {});

        dispatch('showMessage', { error: error.message }, { root: true });
      } finally {
        commit('setLoading', false);
      }
    },

    async togglePanel({ commit, dispatch, state: { current } }) {
      const panelExpanded = !current.panelExpanded;

      commit('setLoading', true);
      commit('setCurrent', { ...current, panelExpanded });

      try {
        await axios.post('/api/v2/settings/update_current', { setting: { panelExpanded } });
      } catch (error) {
        commit('setCurrent', {});

        dispatch('showMessage', { error: error.message }, { root: true });
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    groupColors({ current }) {
      return current.groupColors || [];
    },

    unmatchedGroupId({ current }) {
      return current.unmatchedGroupId;
    },

    panelExpanded({ current }) {
      return current.panelExpanded;
    },

    loading({ loading }) {
      return loading;
    },
  },
};
