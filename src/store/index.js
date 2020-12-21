import Vue from 'vue';
import Vuex from 'vuex';
import dummyEndpoint from '../../userSettings.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      location: {
        address: null,
        lat: null,
        lng: null,
      },
    },
    favoriteSites: [],
    todo: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLocation(state, payload) {
      state.user.location = payload;
    },
    setFavoriteSites(state, payload) {
      state.favoriteSites = payload;
    },
    setTodos() {},
  },
  actions: {
    getUser() {
      this.commit('setUser', dummyEndpoint.user);
    },
    updateLocation(context, location) {
      this.commit('setLocation', location);
    },
    getFavoriteSites() {
      this.commit('setFavoriteSites', dummyEndpoint.favoriteSites);
    },
    updateFavoriteSites(context, sites) {
      this.commit('setFavoriteSites', sites);
    },
    getTodos() {},
  },
  modules: {
  },
});
