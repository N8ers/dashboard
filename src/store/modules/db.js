import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
// import router from '../../router/index';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    location: {
      address: null,
      lat: null,
      lng: null,
    },
    todos: [],
    quickLinks: [],
  },
  mutations: {
    setUserData(state, { location, todos, quickLinks }) {
      state.location = location;
      state.todos = todos;
      state.quickLinks = quickLinks;
    },
  },
  actions: {
    setDummyData() {
      const user = firebase.auth().currentUser;

      const todos = [
        { name: 'walk cat', completed: false },
        { name: 'throw rock', completed: true },
      ];

      const quickLinks = [
        { name: 'npr', url: 'https://www.npr.org/' },
        { name: 'reddit', url: 'https://www.reddit.com/' },
        { name: 'github', url: 'https://github.com/N8ers' },
        { name: 'trello', url: 'https://trello.com/b/8eP70Sbi/todo' },
      ];

      const location = {
        address: 'Seattle, WA, USA',
        lat: '47.6062095',
        lng: '47.6062095',
      };

      firebase.database().ref(`users/${user.uid}`).set({
        todo: todos,
        location,
        quickLinks,
      });
    },
    setNewLocation(context, location) {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).child('location').set(location);
      this.dispatch('db/getUserData');
    },
    updateQuickLinks(context, quickLinks) {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).child('quickLinks').set(quickLinks);
      this.dispatch('db/getUserData');
    },
    updateTodos(context, todos) {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).child('todos').set(todos);
      this.dispatch('db/getUserData');
    },
    getUserData() {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).once('value')
        .then((snapshot) => {
          const { location, todos, quickLinks } = snapshot.val();
          this.commit('db/setUserData', { location, todos, quickLinks });
        })
        .then((err) => console.log('err getUserData ', err));
    },
  },
});
