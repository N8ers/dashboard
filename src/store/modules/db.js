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
  },
  mutations: {
    setUserData(state, { location, todos }) {
      console.log('setUserData mutation ', location, todos);
      state.location = location;
      state.todos = todos;
    },
  },
  actions: {
    setDummyData() {
      const user = firebase.auth().currentUser;

      const todos = [
        { name: 'walk cat', completed: false },
        { name: 'throw rock', completed: true },
      ];

      const location = {
        address: '81237',
        lat: '23.876',
        lng: '65.876',
      };

      firebase.database().ref(`users/${user.uid}`).set({
        todo: todos,
        location,
      });
    },
    setNewLocation(context, location) {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).child('location').set(location);
      this.dispatch('db/getUserData');
    },
    getUserData() {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).once('value')
        .then((snapshot) => {
          const { location, todo } = snapshot.val();
          console.log('getUserData action ', location, todo);
          this.commit('db/setUserData', { location, todo });
        })
        .then((err) => console.log('err ', err));
    },
  },
});
