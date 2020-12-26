import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '../../router/index';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    user: {
      email: null,
      uid: null,
      displayName: null,
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      // router.replace('settings');
    },
    setSignUp(state, user) {
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
    },
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
        this.commit('auth/setUser', userData);
      }
    },
    updateDisplayName(context, displayName) {
      const user = firebase.auth().currentUser;
      user.updateProfile({ displayName })
        .then(() => this.dispatch('auth/getUser'))
        .catch((err) => console.log('error: ', err));
    },
    createUser(context, newUser) {
      const { email, password } = newUser;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          const user = {
            email: result.email,
            uid: result.user.uid,
          };
          this.commit('auth/setSignUp', user);
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
              this.commit('auth/setUser', userData);
            })
            .catch((err) => console.log('err ', err));
        });
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.commit('auth/clearUserData');
          router.replace('welcome');
        })
        .catch((err) => console.log('error: ', err));
    },
    verifyEmail() {
      const user = firebase.auth().currentUser;
      if (user && !user.emailVerified) {
        user.sendEmailVerification()
          .then((res) => console.log('res ', res))
          .catch((err) => console.log('err ', err));
      }
    },
    sendRecoverPasswordEmail(context, email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => console.log('sent'))
        .catch((err) => console.log('error: ', err));
    },
    deleteAccount() {
      const user = firebase.auth().currentUser;
      user.delete()
        .then(() => console.log('deleted'))
        .catch((err) => console.log('error: ', err));
    },
  },
});
