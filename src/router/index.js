import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../components/Dashboard.vue';
import Settings from '../components/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'sashboard',
    component: Dashboard,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
