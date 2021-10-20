import { createRouter, createWebHistory } from 'vue-router';

import UserIndex from '../pages/users/Index.vue';
import UserShow from '../pages/users/Show.vue';

import PaymentsTable from '../pages/users/containers/PaymentsTable.vue';
import UserOverview from '../pages/users/containers/UserOverview.vue';

import store from '../store';

const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/users',
    name: 'users',
    component: UserIndex,
    beforeEnter: () => store.dispatch('users/initIndexPage'),
  },
  {
    path: '/users/:id',
    component: UserShow,
    beforeEnter: ({ params: { id } }) => store.dispatch('users/initShowPage', id),
    children: [
      {
        path: '',
        name: 'user',
        meta: { text: 'Overview' },
        component: UserOverview,
      },
      {
        path: 'payments',
        name: 'payments',
        meta: { text: 'Payments' },
        component: PaymentsTable,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
