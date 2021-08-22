import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import RouteProxy from '../components/RouteProxy.vue';
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
      const { query, params: { userId } } = to;
      await store.dispatch('users/loadUserPage', { userId, query });
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
            path: 'payments/:paymentId',
            component: RouteProxy,
            beforeEnter: async ({ params: { paymentId } }, from, next) => {
              await store.dispatch('payments/fetchPayment', paymentId);
              next();
            },
            children: [
              {
                path: '',
                redirect: 'notes',
              },
              {
                path: 'notes',
                name: 'Notes',
                component: Notes,
              },
              {
                path: 'withdrawals',
                name: 'Withdrawals',
                component: Withdrawals,
              },
            ],
          },
          {
            path: 'groups/:groupId',
            component: RouteProxy,
            beforeEnter: async ({ params: { groupId } }, from, next) => {
              await store.dispatch('groups/fetchGroup', groupId);
              store.dispatch('rules/fetchRules', groupId);
              next();
            },
            children: [
              {
                path: '',
                name: 'Group',
                component: GroupShow,
              },
              {
                path: 'delete',
                name: 'GroupDelete',
                component: GroupDelete,
              },
            ],
          },
          {
            path: 'map',
            name: 'TheMap',
            component: TheMap,
            beforeEnter: (to, from, next) => {
              if (!store.getters['map/geoServiceEnabled']) return;
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

const router = new VueRouter({
  mode,
  routes,
});

export default router;
