import Vue from 'vue';
import VueRouter from 'vue-router';

import store from "../store";

import Payments from '../components/user/Payments.vue';
import User from '../components/User.vue';
import UserOverview from '../components/user/UserOverview.vue';
import Users from '../components/Users.vue';

Vue.use(VueRouter);

const mode = 'history';
const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', name: 'Users', component: Users },
  {
    path: '/users/:id',
    component: User,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('users/fetchUser', to.params.id)
      next()
    },
    children: [
      { path: '', name: 'User', component: UserOverview },
      { path: 'payments', name: 'Payments', component: Payments },
    ]
  },
];

export default new VueRouter({
  mode,
  routes,
});
