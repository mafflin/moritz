import { createRouter, createWebHistory } from 'vue-router';

import UserIndex from '../pages/users/Index.vue';
import UserShow from '../pages/users/Show.vue';

import GroupAddDialog from '../pages/users/containers/GroupAddDialog.vue';
import GroupDeleteDialog from '../pages/users/containers/GroupDeleteDialog.vue';
import GroupEditDialog from '../pages/users/containers/GroupEditDialog.vue';
import PaymentsList from '../pages/users/containers/PaymentsList.vue';
import RulesEditDialog from '../pages/users/containers/RulesEditDialog.vue';
import UserOverview from '../pages/users/containers/UserOverview.vue';

import store from '../store';

const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/users',
    name: 'Users',
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
        name: 'User',
        component: UserOverview,
      },
      {
        path: 'add_group',
        name: 'AddGroup',
        components: {
          default: UserOverview,
          modals: GroupAddDialog,
        },
        beforeEnter: () => store.commit('groups/setErrors'),
      },
      {
        path: 'edit_group/:groupId',
        name: 'EditGroup',
        components: {
          default: UserOverview,
          modals: GroupEditDialog,
        },
        beforeEnter: () => store.commit('groups/setErrors'),
      },
      {
        path: 'delete_group/:groupId',
        name: 'DeleteGroup',
        components: {
          default: UserOverview,
          modals: GroupDeleteDialog,
        },
      },
      {
        path: 'edit_rules/:groupId',
        name: 'EditRules',
        components: {
          default: UserOverview,
          modals: RulesEditDialog,
        },
        beforeEnter: ({ params: { groupId } }) => store.dispatch('rules/initModal', groupId),
      },
      {
        path: 'payments',
        name: 'Payments',
        component: PaymentsList,
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
