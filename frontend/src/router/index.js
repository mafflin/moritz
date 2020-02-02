import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import GroupShow from '../pages/user/pages/group/GroupShow.vue';
import GroupDelete from '../pages/user/pages/group/GroupDelete.vue';
import Notes from '../pages/user/pages/payments/Notes.vue';
import NotFound from '../pages/NotFound.vue';
import Overview from '../pages/user/pages/overview';
import User from '../pages/user';
import Users from '../pages/users';

Vue.use(VueRouter);

const mode = 'history';
const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: (to, from, next) => {
      store.dispatch('users/fetchUsers');
      next();
    },
  },
  {
    path: '/users/:id',
    component: User,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('users/fetchUser', to.params.id);
      store.dispatch('groups/fetchGroups');
      next();
    },
    children: [
      {
        path: '',
        name: 'User',
        component: Overview,
        children: [
          {
            path: 'payments/:paymentId/notes',
            name: 'Notes',
            component: Notes,
            beforeEnter: async ({ params: { paymentId } }, from, next) => {
              await store.dispatch('payments/fetchPayment', paymentId);
              next();
            },
          },
          {
            path: 'groups/:groupId',
            name: 'Group',
            component: GroupShow,
            beforeEnter: async ({ params: { groupId } }, from, next) => {
              await store.dispatch('groups/fetchGroup', groupId);
              store.dispatch('rules/fetchRules', groupId);
              next();
            },
          },
          {
            path: 'groups/:groupId/delete',
            name: 'GroupDelete',
            component: GroupDelete,
            beforeEnter: async ({ params: { groupId } }, from, next) => {
              await store.dispatch('groups/fetchGroup', groupId);
              store.dispatch('rules/fetchRules', groupId);
              next();
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

export default new VueRouter({
  mode,
  routes,
});
