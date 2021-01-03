import router from '../router/index';
import store from '../store/index';

const routeHelper = {
  navigateForAuthChange: (user) => {
    let userData = {};

    if (user) {
      userData = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
      };
    }

    // if user && email is verified
    // route to 'dashboard'
    if (user && !user.emailVerified) {
      console.log('user && user.emailVerified ', user);
      store.commit('auth/setUser', userData);
      store.dispatch('db/getUserData');
      if (router.currentRoute.name !== 'regester') {
        router.replace('regester');
      }
    // if user logged in BUT email is not verified
    // route to 'regester'
    } else if (user) {
      store.commit('auth/setUser', userData);
      if (router.currentRoute.name !== 'dashboard') {
        router.replace('dashboard');
      }
    // if user is not logged in and email is not verified
    // route to 'welcome'
    // check for 'currentRoute' to avoid routing redudency
    } else if (router.currentRoute.name !== 'welcome') {
      router.replace('welcome');
    }
  },
  navigateForPageRefresh: () => {},
};

export default routeHelper;
