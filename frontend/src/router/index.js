import Vue from 'vue';
import VueRouter from 'vue-router';

import User from '../components/User.vue';
import Users from '../components/Users.vue';

Vue.use(VueRouter);

const mode = 'history';
const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', name: 'Users', component: Users },
  { path: '/users/:id', name: 'User', component: User },
];

export default new VueRouter({
  mode,
  routes,
});
