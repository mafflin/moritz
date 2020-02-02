import router from '../router'
import { transformObject } from '../utils'

export default {
  namespaced: true,

  actions: {
    changeRoute(_, to) {
      const query = transformObject(
        to.query,
        param => param,
        (params, key) => params[key],
      )
      const params = to.query ? { ...to, query } : to
      router.push(params)
    },

    goToHomePage({ dispatch, rootGetters: { 'users/selectedId': id } }) {
      dispatch('changeRoute', { name: 'User', params: { id } })
    },
  },
}
