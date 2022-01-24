import axios from 'axios';
import router from '../router';
import formatErrors from '../utils/formatErrors';

export default {
  namespaced: true,

  state: {
    loading: false,
    errors: {},
  },

  /* eslint-disable no-param-reassign */
  mutations: {
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
    async createCurrent({ commit, dispatch }, session) {
      commit('setMessage', {}, { root: true });
      commit('setLoading', true);
      commit('setErrors', {});

      try {
        await axios.post('/api/v2/sessions/create_current', session);

        router.replace({ name: 'User' });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async deleteCurrent({ commit, dispatch }) {
      commit('setLoading', true);
      commit('setErrors', {});

      try {
        await axios.post('/api/v2/sessions/delete_current');
        await router.replace({ name: 'Signin' });

        dispatch('cable/disconnect', {}, { root: true });
      } catch (error) {
        dispatch('handleError', error);
      } finally {
        commit('setLoading', false);

        await router.go();
      }
    },

    handleError({ commit, dispatch }, { response = {}, message }) {
      const { status, data } = response;
      const error = data.message || message;
      switch (status) {
        case 422:
          commit('setErrors', data);
          break;
        default:
          dispatch('showMessage', { error }, { root: true });
          break;
      }
    },
  },

  getters: {
    loading({ loading }) {
      return loading;
    },

    errors({ errors }) {
      return errors;
    },
  },
};
