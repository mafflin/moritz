import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import User from '../pages/user'
import Users from '../pages/users'
import NotFound from '../pages/NotFound.vue'

Vue.use(VueRouter)

const mode = 'history'
const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: (to, from, next) => {
      store.dispatch('users/fetchUsers')
      next()
    },
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('users/fetchUser', to.params.id)
      store.dispatch('groups/fetchGroups')
      next()
    },
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default new VueRouter({
  mode,
  routes,
})
