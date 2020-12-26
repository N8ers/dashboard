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
      displayName: null,
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
      // router.replace('settings');
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
    clearUserData(state) {
      state.user = {
        email: null,
        uid: null,
        displayName: null,
      };
      state.location = {
        address: null,
        lat: null,
        lng: null,
      };
      state.favoriteSites = [];
      state.todo = [];
    },
    setTodos() {},
  },
  actions: {
    getUser() {
      const user = firebase.auth().currentUser;
      if (user) {
        const userData = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        };
        this.commit('setUser', userData);
      }
    },
    updateLocation(context, location) {
      this.commit('setLocation', location);
    },
    updateDisplayName(context, displayName) {
      const user = firebase.auth().currentUser;
      user.updateProfile({ displayName })
        .then(() => this.dispatch('getUser'))
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
        .catch((err) => console.log('error ', err));
    },
    login(context, user) {
      // set firebase auth to persist
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          // actually login user
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
              const userData = {
                email: result.user.email,
                uid: result.user.uid,
                displayName: result.user.displayName,
              };
              this.commit('setUser', userData);
            })
            .catch((err) => console.log('err ', err));
        });
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.commit('clearUserData');
          router.replace('welcome');
        })
        .catch((err) => console.log('error: ', err));
    },
    verifyEmail() {
      const user = firebase.auth().currentUser;
      console.log('user ', user);
      if (user && !user.emailVerified) {
        user.sendEmailVerification()
          .then((res) => console.log('res ', res))
          .catch((err) => console.log('err ', err));
      }
    },
    getTodos() {},
  },
  modules: {
  },
});
