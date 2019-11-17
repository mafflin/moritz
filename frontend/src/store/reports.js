import { createEntity } from "../api";

const ENTITY_TYPE = "reports";

export default {
  namespaced: true,

  actions: {
    async uploadReport(_, report) {
      await createEntity(ENTITY_TYPE, { report });
    }
  }
};
