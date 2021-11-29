import axios from 'axios';
import router from '../router';
import fileEncoder from '../utils/fileEncoder';
import formatErrors from '../utils/formatErrors';
import normalize from '../utils/normalize';

export default {
  namespaced: true,

  state: {
    ids: [],
    entities: {},
    errors: {},
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

    setErrors(state, errors = {}) {
      const formatted = formatErrors(errors);

      state.errors = formatted;
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
        dispatch('showMessage', { t: 'users.updateSuccess' }, { root: true });
      } catch (error) {
        dispatch('showMessage', { error: error.message }, { root: true });
      } finally {
        commit('setLoading', false);
      }
    },

    async createSingle({ commit, dispatch, getters: { list } }, { name }) {
      commit('setLoading', true);
      commit('setErrors', {});

      try {
        const { data } = await axios
          .post('/api/v2/users/create_single', { user: { name } });
        commit('setList', [...list, data]);

        dispatch('closeIndexModal');
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

    closeUserModal({ getters, rootGetters }) {
      const { id } = getters.current;
      const query = rootGetters['payments/query'];

      router.push({ name: 'User', params: { id }, query })
        .catch(() => {});
    },

    closeIndexModal() {
      router.push({ name: 'Users' });
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

    errors({ errors }) {
      return errors;
    },
  },
};
