import router from '@admin/routes';
import { transformObject } from "../utils";

export default {
  namespaced: true,

  actions: {
    changeRoute(_, to) {
      const query = transformObject(to.query, param => param, (params, key) => params[key]);
      const params = to.query ? { ...to, query } : to;
      router.push(params);
    },
  },
}
