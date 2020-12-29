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
    newUserConfirmationEmailSent: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
    clearUserData(state) {
      state.user = {
        email: null,
        uid: null,
        displayName: null,
      };
    },
    newUserConfirmationEmailSent(state, bool) {
      state.newUserConfirmationEmailSent = bool;
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
      user.updateProfile({ displayName })
        .then(() => this.dispatch('auth/getUser'))
        .catch((err) => console.log('error: ', err));
    },
    createUser(context, newUser) {
      const { email, password } = newUser;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          // const user = {
          // email: result.email,
          // uid: result.user.uid,
          // };
          // this.commit('auth/setSignUp', user);
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

              // console.log('result ', result);
              // if (result?.user?.emailVerified) {
              //   console.log('if');
              //   this.commit('auth/newUserConfirmationEmailSent', true);
              // } else {
              //   console.log('else');
              //   const userData = {
              //     email: result.user.email,
              //     uid: result.user.uid,
              //     displayName: result.user.displayName,
              //   };
              //   this.commit('auth/setUser', userData);
              //   const { currentUser } = firebase.auth();
              //   console.log('currentUser ', currentUser);
              //   if (!currentUser?.displayName) {
              //     router.replace('settings');
              //   } else {
              //     router.replace('dashboard');
              //   }
              // }
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
    verifyEmail(user) {
      console.log('user ', user);
      // const user = firebase.auth().currentUser;
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
