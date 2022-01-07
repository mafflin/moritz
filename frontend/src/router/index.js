import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '../pages/users/NotFound.vue';
import SignIn from '../pages/users/SignIn.vue';
import SignUp from '../pages/users/SignUp.vue';
import UserShow from '../pages/users/Show.vue';

import SummaryChartDialog from '../pages/users/modals/SummaryChartDialog.vue';
import GlobalNavigation from '../components/GlobalNavigation.vue';
import GroupAddDialog from '../pages/users/modals/GroupAddDialog.vue';
import GroupDeleteDialog from '../pages/users/modals/GroupDeleteDialog.vue';
import GroupEditDialog from '../pages/users/modals/GroupEditDialog.vue';
import ImportHistoryDialog from '../pages/users/modals/ImportHistoryDialog.vue';
import Panel from '../pages/users/containers/Panel.vue';
import PaymentEditDialog from '../pages/users/modals/PaymentEditDialog.vue';
import RulesEditDialog from '../pages/users/modals/RulesEditDialog.vue';
import UserNavigation from '../pages/users/containers/UserNavigation.vue';

import store from '../store';

const routes = [
  { path: '/', redirect: '/user' },
  {
    path: '/signin',
    name: 'Signin',
    components: {
      default: SignIn,
      navigation: GlobalNavigation,
    },
    beforeEnter: () => store.commit('users/setErrors', {}),
  },

  {
    path: '/signup',
    name: 'Signup',
    components: {
      default: SignUp,
      navigation: GlobalNavigation,
    },
    beforeEnter: () => store.commit('users/setErrors', {}),
  },

  {
    name: 'User',
    path: '/user',
    components: {
      default: UserShow,
      navigation: UserNavigation,
      panel: Panel,
    },
    beforeEnter: ({ query }) => store.dispatch('users/initShowPage', { query }),
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
        component: RulesEditDialog,
        beforeEnter: ({ params: { groupId } }) => store.dispatch('rules/initModal', groupId),
      },
      {
        path: 'edit_payment/:paymentId',
        name: 'EditPayment',
        component: PaymentEditDialog,
        beforeEnter: ({ params: { paymentId } }) => store.dispatch(
          'payments/fetchSingle',
          paymentId,
        ),
      },
      {
        path: 'import_history',
        name: 'ImportHistory',
        component: ImportHistoryDialog,
      },
      {
        path: 'summary_chart',
        name: 'SummaryChart',
        component: SummaryChartDialog,
        beforeEnter: () => store.dispatch('summaries/fetchList'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true);

  next();
});

router.beforeEach(() => {
  store.commit('setLoading', false);
});

export default router;
