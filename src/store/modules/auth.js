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
    savingDisplayName: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setSignUp(state, user) {
      state.user.email = user.email;
      state.user.uid = user.uid;
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
    setSignupAlert(state, message) {
      state.signupErrorMessage = message;
    },
    setSavingDisplayName(state, bool) {
      state.savingDisplayName = bool;
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
      this.commit('auth/setSavingDisplayName', true);
      const user = firebase.auth().currentUser;
      return user.updateProfile({ displayName })
        .then(() => this.dispatch('auth/getUser'))
        .catch((err) => console.log('error: ', err))
        .finally(() => this.commit('auth/setSavingDisplayName', false));
    },
    createUser(context, newUser) {
      const { email, password } = newUser;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.dispatch('auth/verifyEmail', result);
          this.commit('auth/newUserConfirmationEmailSent', true);
        })
        .catch((err) => this.commit('auth/setSignupAlert', err.message));
    },
    login(context, user) {
      this.commit('auth/setLoginAlert', null);
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
