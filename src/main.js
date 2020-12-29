import Vue from 'vue';
import * as firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog, faSpinner, faSignOutAlt, faTrash, faPlus, faEdit, faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

library.add(faCog, faSpinner, faSignOutAlt, faTrash, faPlus, faEdit, faSave);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGEINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID,
};

firebase.default.initializeApp(firebaseConfig);
firebase.default.database();
firebase.default.auth().onAuthStateChanged((result) => {
  if (result) {
    const userData = {
      email: result.email,
      uid: result.uid,
      displayName: result.displayName,
    };
    store.commit('auth/setUser', userData);
    store.dispatch('db/getUserData');
  }
});

window.checkAndAttachMapScript = (callback) => {
  if (window.google) {
    callback();
    return true;
  }

  const key = process.env.VUE_APP_GOOGLE_KEY;
  const script = document.createElement('script');
  window.mapApiInitialized = callback;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,geometry&callback=mapApiInitialized`;
  document.body.appendChild(script);
  return null;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
