import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Group from '../pages/user/components/group'
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
    children: [
      {
        path: 'groups/:groupId',
        name: 'Group',
        component: Group,
        beforeEnter: async ({ params: { groupId } }, from, next) => {
          await store.dispatch('groups/fetchGroup', groupId)
          store.dispatch('rules/fetchRules', groupId)
          next()
        },
      },
    ],
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
