import Vue from 'vue';
import VueRouter from 'vue-router';

import Payments from '../components/Payments.vue';
import User from '../components/User.vue';
import UserOverview from '../components/UserOverview.vue';
import Users from '../components/Users.vue';

Vue.use(VueRouter);

const mode = 'history';
const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', name: 'Users', component: Users },
  {
    path: '/users/:id',
    component: User,
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
