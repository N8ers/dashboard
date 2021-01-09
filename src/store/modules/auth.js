import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    newUserConfirmationEmailSent: null,
    loginErrorMessage: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      // router.replace('dashboard');

      // router.replace('settings');
      // const { currentUser } = firebase.auth();
      // console.log('currentUser ', currentUser);
      // if (!currentUser?.displayName) {
      // router.replace('settings');
      // } else {
      // router.replace('dashboard');
      // }
    },
    setSignUp(state, user) {
      state.user.email = user.email;
      state.user.uid = user.uid;
      // router.replace('settings');
    },
    clearUserState(state) {
      state.user = {
        email: null,
        uid: null,
        displayName: null,
      };
      state.newUserConfirmationEmailSent = null;
    },
    newUserConfirmationEmailSent(state, bool) {
      state.newUserConfirmationEmailSent = bool;
    },
    setLoginAlert(state, message) {
      state.loginErrorMessage = message;
    },
  },
  actions: {
    getUser() {
      const user = firebase.auth().currentUser;
      if (user?.uid) {
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
      return user.updateProfile({ displayName })
        .then(() => this.dispatch('auth/getUser'))
        .catch((err) => console.log('error: ', err));
    },
    createUser(context, newUser) {
      const { email, password } = newUser;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.dispatch('auth/verifyEmail', result);
          this.commit('auth/newUserConfirmationEmailSent', true);
        })
        .catch((err) => console.log('error ', err));
    },
    login(context, user) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((result) => {
              const userData = {
                email: result.user.email,
                uid: result.user.uid,
                displayName: result.user.displayName,
              };
              this.commit('auth/setUser', userData);
              router.replace('/');
            })
            .catch((err) => this.commit('auth/setLoginAlert', err.message));
        });
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.commit('auth/clearUserState');
          this.commit('db/clearDataState');
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
    getEmailValidationStatus() {
      const user = firebase.auth().currentUser;
      return user.emailVerified;
    },
    async completeRegerestration(context, payload) {
      await this.dispatch('auth/updateDisplayName', payload.displayName);
      await this.dispatch('db/setNewLocation', payload.location);
      router.replace('/');
    },
  },
});
