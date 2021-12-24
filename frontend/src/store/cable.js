import { createConsumer } from '@rails/actioncable';

export default {
  namespaced: true,

  state: {
    ref: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setConsumerRef(state, ref) {
      state.ref = ref;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    connect({ commit, dispatch }) {
      const ref = `cable-${Date.now()}`;
      const consumer = createConsumer('/cable');

      window[ref] = consumer;

      commit('setConsumerRef', ref);
      dispatch('initSubscriptions');
    },

    disconnect({ commit, state: { ref }, getters: { consumer } }) {
      if (!consumer) return;

      consumer.subscriptions.consumer.disconnect();
      window[ref] = null;

      commit('setConsumerRef', null);
    },

    initSubscriptions({ dispatch }) {
      dispatch('imports/subscribeToUpdates', {}, { root: true });
    },
  },

  getters: {
    consumer({ ref }) {
      return window[ref];
    },
  },
};
