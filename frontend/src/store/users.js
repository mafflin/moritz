import axios from 'axios';
import router from '../router';
import fileEncoder from '../utils/fileEncoder';
import formatErrors from '../utils/formatErrors';

export default {
  namespaced: true,

  state: {
    errors: {},
    current: null,
    loading: false,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
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

  },
  /* eslint-enable no-param-reassign */

  actions: {
    async initShowPage({ dispatch, getters }, { query }) {
      await dispatch('fetchCurrent');

      if (!getters.current) return;

      await dispatch('cable/connect', {}, { root: true });
      await dispatch('settings/fetchCurrent', {}, { root: true });
      await dispatch('groups/fetchList', {}, { root: true });

      dispatch('imports/fetchList', {}, { root: true });
      dispatch('payments/updateFilter', query, { root: true });
    },

    async fetchCurrent({ commit, dispatch }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.post('/api/v2/users/fetch_current');

        commit('setCurrent', data);
      } catch (error) {
        commit('setCurrent', null);

        dispatch('handleError', error);
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
        const { message, response } = error;
        dispatch('showMessage', { error: response?.data?.message || message }, { root: true });
      } finally {
        commit('setLoading', false);
      }
    },

    async createSingle({ commit, dispatch }, user) {
      commit('setLoading', true);
      commit('setErrors', {});

      try {
        await axios.post('/api/v2/users/create_single', { user });

        dispatch('showMessage', { t: 'success' }, { root: true });

        router.push({ name: 'Signin' });
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
        case 401:
          router.replace({ name: 'Signin' });
          break;
        default:
          dispatch('showMessage', { error: message }, { root: true });
          break;
      }
    },

    closeUserModal({ rootGetters }) {
      const query = rootGetters['payments/query'];

      router.push({ name: 'User', query })
        .catch(() => {});
    },

    closeIndexModal() {
      router.push({ name: 'Signin' });
    },
  },

  getters: {
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
