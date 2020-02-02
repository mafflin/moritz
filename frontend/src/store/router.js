import router from '../router';
import { transformObject } from '../utils';

export default {
  namespaced: true,

  actions: {
    changeRoute(_, to) {
      const query = transformObject(
        to.query,
        param => param,
        (params, key) => params[key],
      );
      const route = to.query ? { ...to, query } : to;
      router.push(route);
    },

    goToHomePage({ dispatch, rootGetters }, params) {
      const userId = rootGetters['users/selectedId'];
      const filter = rootGetters['payments/filter'];
      const query = { ...filter, ...params };

      dispatch('changeRoute', { name: 'User', params: { userId }, query });
    },
  },
};
