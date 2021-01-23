import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import db from './modules/db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    refreshData() {
      this.dispatch('auth/getUser');
      this.dispatch('db/getUserData');
    },
  },
  modules: {
    auth,
    db,
  },
});
