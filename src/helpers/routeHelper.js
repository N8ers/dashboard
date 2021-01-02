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
    if (user && user.emailVerified) {
      store.commit('auth/setUser', userData);
      store.dispatch('db/getUserData');
      router.replace('regester');
    // if user logged in BUT email is not verified
    // route to 'regester'
    } else if (user) {
      store.commit('auth/setUser', userData);
      router.replace('regester');
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