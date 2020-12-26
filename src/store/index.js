import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '../router/index';
import dummyEndpoint from '../../userSettings.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: null,
      uid: null,
      username: null,
    },
    location: {
      address: null,
      lat: null,
      lng: null,
    },
    favoriteSites: [],
    todo: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      router.replace('settings');
    },
    setLocation(state, payload) {
      state.user.location = payload;
    },
    setFavoriteSites(state, payload) {
      state.favoriteSites = payload;
    },
    setSignUp(state, user) {
      console.log('setSignUp');
      state.user.email = user.email;
      state.user.uid = user.uid;
      router.replace('settings');
    },
    setTodos() {},
  },
  actions: {
    getUser() {},
    updateLocation(context, location) {
      this.commit('setLocation', location);
    },
    updateUsername(context, username) {
      const user = firebase.auth().currentUser;
      user.updateProfile({ displayName: username })
        .then((res) => console.log('success ', res))
        .catch((err) => console.log('error ', err));
    },
    getFavoriteSites() {
      this.commit('setFavoriteSites', dummyEndpoint.favoriteSites);
    },
    updateFavoriteSites(context, sites) {
      this.commit('setFavoriteSites', sites);
    },
    createUser(context, newUser) {
      const { email, password } = newUser;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          const user = {
            email: result.email,
            uid: result.user.uid,
          };
          this.commit('setSignUp', user);
        })
        .catch((error) => {
          console.log('error ', error);
        });
    },
    login(context, user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          console.log('result ', result);
          const userData = {
            email: result.user.email,
            uid: result.user.uid,
            displayName: result.user.displayName,
          };
          this.commit('setUser', userData);
        })
        .catch((err) => console.log('err ', err));
    },
    getTodos() {},
  },
  modules: {
  },
});
