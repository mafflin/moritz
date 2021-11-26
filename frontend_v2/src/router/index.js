import { createRouter, createWebHistory } from 'vue-router';

import UserIndex from '../pages/users/Index.vue';
import UserShow from '../pages/users/Show.vue';

import CardPanelReduced from '../pages/users/containers/CardPanelReduced.vue';
import GroupAddDialog from '../pages/users/containers/GroupAddDialog.vue';
import GroupDeleteDialog from '../pages/users/containers/GroupDeleteDialog.vue';
import GroupEditDialog from '../pages/users/containers/GroupEditDialog.vue';
import PaymentEditDialog from '../pages/users/containers/PaymentEditDialog.vue';
import RulesEditDialog from '../pages/users/containers/RulesEditDialog.vue';

import store from '../store';

const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/users',
    name: 'Users',
    component: UserIndex,
    beforeEnter: () => store
      .dispatch('users/initIndexPage'),
  },
  {
    path: '/users/:id',
    components: {
      default: UserShow,
      header: CardPanelReduced,
    },
    name: 'User',
    beforeEnter: ({ params: { id }, query }) => store
      .dispatch('users/initShowPage', { id, query }),
    children: [
      {
        path: 'add_group',
        name: 'AddGroup',
        component: GroupAddDialog,
        beforeEnter: () => store
          .commit('groups/setErrors'),
      },
      {
        path: 'edit_group/:groupId',
        name: 'EditGroup',
        component: GroupEditDialog,
        beforeEnter: () => store
          .commit('groups/setErrors'),
      },
      {
        path: 'delete_group/:groupId',
        name: 'DeleteGroup',
        component: GroupDeleteDialog,
      },
      {
        path: 'edit_rules/:groupId',
        name: 'EditRules',
        component: RulesEditDialog,
        beforeEnter: ({ params: { groupId } }) => store
          .dispatch('rules/initModal', groupId),
      },
      {
        path: 'edit_payment/:paymentId',
        name: 'EditPayment',
        component: PaymentEditDialog,
        beforeEnter: ({ params: { paymentId } }) => store
          .dispatch('payments/fetchSingle', paymentId),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
