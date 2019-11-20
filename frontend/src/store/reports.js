import { createEntity } from "../api";

const ENTITY_TYPE = "reports";

export default {
  namespaced: true,

  state: {
    file: null
  },

  actions: {
    async uploadReport({ commit }, report) {
      const {
        item: { payments }
      } = await createEntity(ENTITY_TYPE, { report });
      commit("payments/setPayments", payments, { root: true });
    }
  }
};
