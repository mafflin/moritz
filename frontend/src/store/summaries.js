import axios from 'axios';
import normalize from '../utils/normalize';

export const RANGE_OPTIONS = [12, 24, 36, 48, 60];
const [DEFAULT_RANGE] = RANGE_OPTIONS;

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    loading: false,
    filter: {
      range: DEFAULT_RANGE,
    },
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, items) {
      const { ids, entities } = normalize(items, 'groupId');

      state.ids = ids;
      state.entities = entities;
    },

    setFilter(state, filter = { range: DEFAULT_RANGE }) {
      state.filter = filter;
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async filterList({ commit, dispatch }, filter) {
      commit('setFilter', filter);

      await dispatch('fetchList');
    },

    async fetchList({ commit, dispatch, getters: { filter } }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/summaries/fetch_list', filter);

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        dispatch('showMessage', { error: error.message }, { root: true });
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    list({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    filter({ filter }) {
      return filter;
    },

    loading({ loading }) {
      return loading;
    },
  },
};
