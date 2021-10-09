import ActionCable from 'actioncable';
import { createEntity, deleteEntity } from '../api';

const { VUE_APP_ACTION_CABLE_URL } = process.env;
const ENTITY_TYPE = 'sessions';

export default {
  namespaced: true,

  state: {
    session: false,
    cableRef: null,
  },

  mutations: {
    setSession(state, session) {
      state.session = session;
    },

    setCableRef(state, cableRef) {
      state.cableRef = cableRef;
    },
  },

  actions: {
    async createSession({ commit, dispatch }, userId) {
      try {
        await createEntity(ENTITY_TYPE, { userId });

        commit('setSession', true);

        dispatch('createWebsocketConnection');
        dispatch('subscribeToUserUpdates');
        dispatch('payments/subscribeToUpdates', {}, { root: true });
      } catch (error) {
        commit('setSession', false);
      }
    },

    async deleteSession({ getters: { cable }, commit }) {
      await deleteEntity(ENTITY_TYPE);

      cable?.subscriptions?.consumer?.disconnect();

      commit('setSession', false);
      commit('setCableRef', null);
    },

    createWebsocketConnection({ commit }) {
      const cableRef = `cable-${Date.now()}`;
      const cable = ActionCable.createConsumer(VUE_APP_ACTION_CABLE_URL);

      window[cableRef] = cable;

      commit('setCableRef', cableRef);
    },

    subscribeToUserUpdates({ dispatch, getters: { cable } }) {
      cable.subscriptions.create(
        { channel: 'UserUpdatesChannel' },
        { received: (message) => dispatch('ui/showMessage', message, { root: true }) },
      );
    },
  },

  getters: {
    session: ({ session }) => session,
    cable: ({ cableRef }) => window[cableRef],
  },
};
