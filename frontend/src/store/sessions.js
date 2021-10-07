import ActionCable from 'actioncable';
import { createEntity, deleteEntity } from '../api';

const { VUE_APP_ACTION_CABLE_URL } = process.env;
const ENTITY_TYPE = 'sessions';

export default {
  namespaced: true,

  state: {
    session: false,
    cable: null,
  },

  mutations: {
    setSession(state, session) {
      state.session = session;
    },

    setCable(state, cable) {
      state.cable = cable;
    },
  },

  actions: {
    async createSession({ commit, dispatch }, userId) {
      try {
        await createEntity(ENTITY_TYPE, { userId });

        commit('setSession', true);

        dispatch('createWebsocketConnection');
        dispatch('subscribeToUserChannel');
      } catch (error) {
        commit('setSession', false);
      }
    },

    async deleteSession({ getters: { cable }, commit }) {
      await deleteEntity(ENTITY_TYPE);

      cable?.subscriptions?.consumer?.disconnect();

      commit('setSession', false);
      commit('setCable', null);
    },

    createWebsocketConnection({ commit }) {
      const cable = ActionCable.createConsumer(VUE_APP_ACTION_CABLE_URL);

      commit('setCable', cable);
    },

    subscribeToUserChannel({ getters: { cable }, dispatch }) {
      cable.subscriptions.create(
        { channel: 'UserChannel' },
        { received: (message) => dispatch('ui/showMessage', message, { root: true }) },
      );
    },
  },

  getters: {
    session: ({ session }) => session,
    cable: ({ cable }) => cable,
  },
};
