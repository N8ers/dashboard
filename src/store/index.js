import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import db from './modules/db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    db,
  },
});
