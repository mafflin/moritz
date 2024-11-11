import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const NotFound = () => import('../pages/users/NotFound.vue');
const SignIn = () => import('../pages/users/SignIn.vue');
const SignUp = () => import('../pages/users/SignUp.vue');
const UserShow = () => import('../pages/users/UserShow.vue');

const SummaryChartDialog = () => import('../pages/users/modals/SummaryChartDialog.vue');
const GlobalNavigation = () => import('../components/GlobalNavigation.vue');
const GroupAddDialog = () => import('../pages/users/modals/GroupAddDialog.vue');
const GroupDeleteDialog = () => import('../pages/users/modals/GroupDeleteDialog.vue');
const GroupEditDialog = () => import('../pages/users/modals/GroupEditDialog.vue');
const ImportHistoryDialog = () => import('../pages/users/modals/ImportHistoryDialog.vue');
const MainPanel = () => import('../pages/users/containers/MainPanel.vue');
const PaymentEditDialog = () => import('../pages/users/modals/PaymentEditDialog.vue');
const PaymentDeleteDialog = () => import('../pages/users/modals/PaymentDeleteDialog.vue');
const PaymentInfoDialog = () => import('../pages/users/modals/PaymentInfoDialog.vue');
const RulesEditDialog = () => import('../pages/users/modals/RulesEditDialog.vue');
const UserNavigation = () => import('../pages/users/containers/UserNavigation.vue');

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
      panel: MainPanel,
    },
    beforeEnter: async ({ query }) => store.dispatch('users/initShowPage', { query }),
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
        beforeEnter: async ({ params: { groupId } }) => store.dispatch('rules/initModal', groupId),
      },
      {
        path: 'edit_payment/:paymentId',
        name: 'EditPayment',
        component: PaymentEditDialog,
        beforeEnter: async ({ params: { paymentId } }) => store.dispatch(
          'payments/fetchSingle',
          paymentId,
        ),
      },
      {
        path: 'delete_payment/:paymentId',
        name: 'DeletePayment',
        component: PaymentDeleteDialog,
        beforeEnter: async ({ params: { paymentId } }) => store.dispatch(
          'payments/fetchSingle',
          paymentId,
        ),
      },
      {
        path: 'info/:paymentId',
        name: 'InfoPayment',
        component: PaymentInfoDialog,
        beforeEnter: async ({ params: { paymentId } }) => store.dispatch(
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
        beforeEnter: async () => store.dispatch('summaries/fetchList'),
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
