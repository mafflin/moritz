import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import GroupShow from '../pages/user/pages/group/GroupShow.vue';
import GroupDelete from '../pages/user/pages/group/GroupDelete.vue';
import Notes from '../pages/user/pages/payments/Notes.vue';
import NotFound from '../pages/NotFound.vue';
import TheMap from '../pages/TheMap.vue';
import Overview from '../pages/user/pages/overview';
import ProfileUpdate from '../pages/user/pages/ProfileUpdate.vue';
import Summaries from '../pages/user/pages/payments/Summaries';
import User from '../pages/user';
import Users from '../pages/users';
import Withdrawals from '../pages/user/pages/payments/Withdrawals.vue';

import { parseUrlQueryParams } from '../utils';

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
    path: '/users/:userId',
    component: User,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('users/fetchUser', to.params.userId);
      const filter = parseUrlQueryParams(to.query, ['date', 'groupId']);
      store.dispatch('groups/fetchGroups');
      store.dispatch('payments/updateFilter', filter);
      next();
    },
    children: [
      {
        path: '',
        name: 'User',
        component: Overview,
        props: ({ query: { q, groupId } }) => ({ query: { q, groupId } }),
        children: [
          {
            path: 'profile/update',
            name: 'ProfileUpdate',
            component: ProfileUpdate,
          },
          {
            path: 'summaries',
            name: 'Summaries',
            component: Summaries,
            beforeEnter: (to, from, next) => {
              store.dispatch('summaries/fetchSummaries');
              next();
            },
          },
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
            path: 'payments/:paymentId/withdrawals',
            name: 'Withdrawals',
            component: Withdrawals,
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
          {
            path: 'map',
            name: 'TheMap',
            component: TheMap,
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

const router = new VueRouter({
  mode,
  routes,
});

export default router;
