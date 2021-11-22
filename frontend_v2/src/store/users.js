import axios from 'axios';
import fileEncoder from '../utils/fileEncoder';
import normalize from '../utils/normalize';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    current: null,
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setList(state, items) {
      const { ids, entities } = normalize(items);

      state.ids = ids;
      state.entities = entities;
    },

    setCurrent(state, user) {
      state.current = user;
    },

    setLoading(state, value) {
      state.loading = value;
    },

    reset(state) {
      state.current = null;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    initIndexPage({ dispatch }) {
      dispatch('fetchList');
      dispatch('sessions/deleteCurrent', {}, { root: true });
    },

    async initShowPage({ dispatch }, { id, query }) {
      await dispatch('sessions/createCurrent', id, { root: true });
      await dispatch('fetchCurrent');
      await dispatch('settings/fetchCurrent', {}, { root: true });
      await dispatch('groups/fetchList', {}, { root: true });

      dispatch('payments/updateFilter', query, { root: true });
    },

    async fetchList({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/users/fetch_list');

        commit('setList', data);
      } catch (error) {
        commit('setList', []);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchCurrent({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/users/fetch_current');

        commit('setCurrent', data);
      } catch (error) {
        commit('setCurrent', null);

        console.log(error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    async updateCurrent({ commit, dispatch }, { image }) {
      commit('setLoading', true);

      try {
        const { target: { result: avatarBase64 } } = await fileEncoder(image, false);
        const { data } = await axios
          .post('/api/v2/users/update_current', { user: { avatarBase64 } });

        commit('setCurrent', data);
        dispatch('settings/showMessage', { t: 'users.updateSuccess' }, { root: true });
      } catch (error) {
        dispatch('settings/showMessage', { error: error.message }, { root: true });
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
    list({ ids, entities }) {
      return ids.map((id) => entities[id]);
    },

    current({ current }) {
      return current;
    },

    loading({ loading }) {
      return loading;
    },
  },
};
