import axios from 'axios';
import normalize from '../utils/normalize';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    loading: false,
    selectedId: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, items) {
      const { ids, entities } = normalize(items);

      state.ids = ids;
      state.entities = entities;
    },

    setSelectedId(state, id) {
      state.selectedId = id;
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchList({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/groups/list');

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    list: ({ ids, entities }) => ids.map((id) => entities[id]),
    selected: ({ selectedId, entities }) => entities[selectedId],
    loading: ({ loading }) => loading,
  },
};
