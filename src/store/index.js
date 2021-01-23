import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import db from './modules/db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    location: {
      address: null,
      lat: null,
      lng: null,
    },
    favoriteSites: [],
    todo: [],
  },
  mutations: {
    setLocation(state, payload) {
      state.user.location = payload;
    },
    setFavoriteSites(state, payload) {
      state.favoriteSites = payload;
    },
    setTodos() {},
  },
  actions: {
    updateLocation(context, location) {
      this.commit('setLocation', location);
    },
    updateFavoriteSites(context, sites) {
      this.commit('setFavoriteSites', sites);
    },
    getTodos() {},
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
