import axios from 'axios';
import router from '../router';
import formatErrors from '../utils/formatErrors';
import normalize from '../utils/normalize';

const UNMATCHED = {
  color: 'blue-grey',
  unmatched: true,
};

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    errors: {},
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, items) {
      const { ids, entities } = normalize(items);

      state.entities = entities;
      state.ids = ids;
    },

    setSingle(state, item) {
      state.entities = { ...state.entities, [item.id]: item };
    },

    setErrors(state, errors = {}) {
      const formatted = formatErrors(errors);

      state.errors = formatted;
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    async fetchList({ commit, dispatch }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/groups/fetch_list');

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        dispatch('showMessage', { error: error.message }, { root: true });
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchSingle({ commit, dispatch }, id) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/groups/fetch_single', { id });

        commit('setSingle', data);
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async createSingle({ commit, dispatch, getters: { list } }, group) {
      commit('setLoading', true);
      commit('setErrors', {});

      try {
        const { data } = await axios.post('/api/v2/groups/create_single', { group });

        commit('setList', [...list, data]);

        dispatch('users/closeUserModal', {}, { root: true });
        dispatch('showMessage', { t: 'success' }, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async updateSingle({ commit, dispatch }, group) {
      commit('setLoading', true);
      commit('setErrors', {});

      try {
        const { data } = await axios.post('/api/v2/groups/update_single', group);

        commit('setSingle', data);

        dispatch('users/closeUserModal', {}, { root: true });
        dispatch('showMessage', { t: 'success' }, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async deleteSingle({ commit, dispatch, getters }) {
      commit('setLoading', true);

      try {
        const { id } = getters.selected;
        await axios.post('/api/v2/groups/delete_single', { id });

        dispatch('fetchList');
        dispatch('payments/filterList', { groupId: null }, { root: true });
        dispatch('users/closeUserModal', {}, { root: true });
        dispatch('showMessage', { t: 'success' }, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    handleError({ commit, dispatch }, { response = {}, message }) {
      const { status, data } = response;
      switch (status) {
        case 422:
          commit('setErrors', data);
          break;
        default:
          dispatch('showMessage', { error: message }, { root: true });
          break;
      }
    },

    openEditRules(state, groupId) {
      router.push({ name: 'EditRules', params: { groupId } });
    },
  },

  getters: {
    list({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    listWithUnmatched(state, { list }, rootState, rootGetters) {
      const id = rootGetters['settings/unmatchedGroupId'];
      return [...list, { ...UNMATCHED, id }];
    },

    loading({ loading }) {
      return loading;
    },

    errors({ errors }) {
      return errors;
    },

    selected({ entities }, getters, rootState) {
      const { groupId } = rootState.route.params;
      return entities[groupId];
    },
  },
};
