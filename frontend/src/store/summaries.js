import { fetchEntities } from '../api';
import { convertArrayToObject } from '../utils';

const ENTITY_TYPE = 'summaries';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
  },

  mutations: {
    setSummaries(state, summaries) {
      const ids = summaries.map(summary => summary.groupId);
      const entities = convertArrayToObject(summaries, 'groupId');

      state.ids = ids;
      state.entities = { ...state.entities, ...entities };
    },
  },

  actions: {
    async fetchSummaries({ commit, rootGetters }) {
      const params = rootGetters['payments/formattedFilter'];
      const { items } = await fetchEntities(ENTITY_TYPE, params);

      commit('setSummaries', items);
    },
  },

  getters: {
    summaries: ({ ids, entities }) => ids.map(id => entities[id]),
  },
};
