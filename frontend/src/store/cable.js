import ActionCable from 'actioncable';

export default {
  namespaced: true,

  state: {
    cableRef: null,
  },

  /* eslint-disable no-param-reassign */
  mutations: {
    setCableRef(state, cableRef) {
      state.cableRef = cableRef;
    },
  },
  /* eslint-enable no-param-reassign */

  actions: {
    connect({ commit, dispatch }) {
      const cableRef = `cable-${Date.now()}`;
      const cable = ActionCable.createConsumer('/cable');

      window[cableRef] = cable;

      commit('setCableRef', cableRef);

      dispatch('initSubscriptions');
    },

    disconnect({ commit, getters: { cable, cableRef } }) {
      if (cable) {
        cable.subscriptions.consumer.disconnect();
      }

      window[cableRef] = null;

      commit('setCableRef', null);
    },

    initSubscriptions({ dispatch }) {
      dispatch('imports/subscribeToUpdates', {}, { root: true });
    },
  },

  getters: {
    cable({ cableRef }) {
      return window[cableRef];
    },
  },
};
