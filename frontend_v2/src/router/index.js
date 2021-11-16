import { createRouter, createWebHistory } from 'vue-router';

import UserIndex from '../pages/users/Index.vue';
import UserShow from '../pages/users/Show.vue';

import GroupAddDialog from '../pages/users/containers/GroupAddDialog.vue';
import GroupDeleteDialog from '../pages/users/containers/GroupDeleteDialog.vue';
import GroupEditDialog from '../pages/users/containers/GroupEditDialog.vue';
import RulesEditDialog from '../pages/users/containers/RulesEditDialog.vue';

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
    name: 'User',
    beforeEnter: ({ params: { id } }) => store.dispatch('users/initShowPage', id),
    children: [
      {
        path: 'add_group',
        name: 'AddGroup',
        component: GroupAddDialog,
        beforeEnter: () => store.commit('groups/setErrors'),
      },
      {
        path: 'edit_group/:groupId',
        name: 'EditGroup',
        component: GroupEditDialog,
        beforeEnter: () => store.commit('groups/setErrors'),
      },
      {
        path: 'delete_group/:groupId',
        name: 'DeleteGroup',
        component: GroupDeleteDialog,
      },
      {
        path: 'edit_rules/:groupId',
        name: 'EditRules',
        components: RulesEditDialog,
        beforeEnter: ({ params: { groupId } }) => store.dispatch('rules/initModal', groupId),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
