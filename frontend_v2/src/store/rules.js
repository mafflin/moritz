import axios from 'axios';
import normalize from '../utils/normalize';
import formatErrors from '../utils/formatErrors';

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

      state.ids = ids;
      state.entities = entities;
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
    async initModal({ commit, dispatch }, groupId) {
      commit('setErrors');

      await dispatch('fetchList', groupId);
    },

    async fetchList({ commit }, groupId) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/rules/fetch_list', { groupId });

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    async createSingle({
      commit, dispatch, getters: { list }, rootGetters,
    }, match) {
      commit('setLoading', true);
      commit('setErrors', {});

      try {
        const { id: groupId } = rootGetters['groups/selected'];
        const rule = { match, groupId };
        const { data } = await axios.post('/api/v2/rules/create_single', { rule });

        commit('setList', [...list, data]);

        dispatch('payments/fetchList', {}, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async deleteSingle({ commit, dispatch, rootGetters }, id) {
      commit('setLoading', true);

      try {
        const { id: groupId } = rootGetters['groups/selected'];
        await axios.post('/api/v2/rules/delete_single', { id });

        dispatch('fetchList', groupId);
        dispatch('payments/fetchList', {}, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    handleError({ commit }, { response = {}, message }) {
      const { status, data } = response;
      switch (status) {
        case 422:
          commit('setErrors', data);
          break;
        default:
          console.log(message);
          break;
      }
    },
  },

  getters: {
    list({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    loading({ loading }) {
      return loading;
    },

    errors({ errors }) {
      return errors;
    },
  },
};
