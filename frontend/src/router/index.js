import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import Group from '../components/user/Group.vue'
import Groups from '../components/user/Groups.vue'
import Payments from '../components/user/Payments.vue'
import Rules from '../components/user/Rules.vue'
import User from '../components/User.vue'
import UserOverview from '../components/user/UserOverview.vue'
import Users from '../components/Users.vue'

Vue.use(VueRouter)

const mode = 'history'
const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', name: 'Users', component: Users },
  {
    path: '/users/:id',
    component: User,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('users/fetchUser', to.params.id)
      await store.dispatch('groups/fetchGroups')
      next()
    },
    children: [
      { path: '', name: 'User', component: UserOverview },
      { path: 'groups', name: 'Groups', component: Groups },
      {
        path: 'groups/:groupId',
        name: 'Group',
        component: Group,
        beforeEnter: async ({ params: { groupId } }, from, next) => {
          await store.dispatch('groups/fetchGroup', groupId)
          await store.dispatch('rules/fetchRules', groupId)
          next()
        },
      },
      { path: 'payments', name: 'Payments', component: Payments },
      { path: 'rules', name: 'Rules', component: Rules },
    ],
  },
]

export default new VueRouter({
  mode,
  routes,
})
